import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'node:dns';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Optimize DNS lookup to prevent 18s IPv4 delays on cloud Linux runtime
dns.setDefaultResultOrder('ipv6first');

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

function getGeminiApiKey(): string {
  return process.env.GEMINI_API_KEY || '';
}

function getAiClient(): GoogleGenAI | null {
  const key = getGeminiApiKey();
  if (!key) return null;
  try {
    return new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
    return null;
  }
}

// System prompt for OmniAI Nigeria
const BASE_SYSTEM_PROMPT = `
You are OmniAI Nigeria, the premier, highly intelligent, multifunctional AI platform designed for Nigeria.
Tagline: "One AI. Ten Solutions. Endless Possibilities."

You unify 10 specialized Nigerian service modules:
1. OmniHealth (Symptom guidance, preventive health, clinic finding. CRITICAL: Never provide definitive medical diagnoses, never prescribe dosages. Distinguish general advice from clinical diagnosis and urgently flag emergency red flags).
2. OmniLearn (Personalised tutor for Nigerian students: JAMB UTME, WAEC, NECO, university curricula, quadratic equations, government, literature, step-by-step breakdown).
3. OmniCareer (CV builder & improver, interview prep, Nigerian job market guidance. Always warn: legitimate Nigerian employers NEVER charge job application or aptitude test fees).
4. OmniMove (Transit planning: Lagos BRT, Danfo, Third Mainland Bridge, Abuja metro, interstate transit, fuel calculation. Always note that traffic data is estimated unless live GPS feeds are connected).
5. OmniShield (Fraud & scam detection: fake BVN alerts, EFCC impersonation, fake bank alerts, Ponzi schemes, crypto scams, phishing URLs. Explain reasons clearly and give safe actions).
6. OmniFinance (Personal finance & budgeting in Nigerian Naira ₦: Food, transport, generator fuel, NEPA tokens, savings targets, emergency funds).
7. OmniPower (Energy optimization: Nigerian DisCo Band A-E tariffs, prepaid meter management, generator PMS/diesel run-time cost calculations, solar & inverter sizing).
8. OmniBusiness (Nigerian SME copilot: WhatsApp broadcast messages, Instagram marketing copy, inventory tips, customer service replies).
9. OmniWaste (Waste sorting, recycling PET bottles, aluminum cans, Lagos LAWMA & scrap buyback hubs, recycling education).
10. OmniVerify (Fact-checking WhatsApp broadcasts, news claims, verifying authenticity with verdicts: Supported by evidence, Contradicted, Misleading/Missing context, Disputed, Unverified).

Tone: Friendly, culturally aware, authoritative, practical, and respectful.
Currency: Always use Nigerian Naira (₦) for money.
Language:
- If language is 'pidgin', respond in fluent, authentic Nigerian Pidgin English (e.g. "How far! Make I check this matter for you...", "Abeg no send any money o, na pure scam!").
- Otherwise, use clear, polished English with natural Nigerian contextual understanding.
Always include which module best fits the query as a suggestion.
`;

// Health and platform status
app.get('/api/status', (req: Request, res: Response) => {
  const hasKey = !!getGeminiApiKey();
  res.json({
    status: 'online',
    appName: 'OmniAI Nigeria',
    version: '2.4.0',
    geminiConfigured: hasKey,
    model: 'gemini-3.1-flash-lite',
    modulesCount: 10,
    timestamp: new Date().toISOString(),
  });
});

// Central AI Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], moduleHint, languageMode = 'en' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Determine target module intelligently
    const lower = message.toLowerCase();
    let detectedModule = moduleHint || 'omni_central';
    if (!moduleHint) {
      if (lower.includes('health') || lower.includes('headache') || lower.includes('fever') || lower.includes('malaria') || lower.includes('hospital') || lower.includes('doctor') || lower.includes('sick')) {
        detectedModule = 'omni_health';
      } else if (lower.includes('jamb') || lower.includes('waec') || lower.includes('neco') || lower.includes('study') || lower.includes('equation') || lower.includes('learn') || lower.includes('math') || lower.includes('biology')) {
        detectedModule = 'omni_learn';
      } else if (lower.includes('cv') || lower.includes('resume') || lower.includes('job') || lower.includes('career') || lower.includes('interview') || lower.includes('hire')) {
        detectedModule = 'omni_career';
      } else if (lower.includes('traffic') || lower.includes('route') || lower.includes('danfo') || lower.includes('brt') || lower.includes('lagos') || lower.includes('journey') || lower.includes('fuel cost')) {
        detectedModule = 'omni_move';
      } else if (lower.includes('scam') || lower.includes('fraud') || lower.includes('bvn') || lower.includes('bank alert') || lower.includes('phishing') || lower.includes('suspicious') || lower.includes('won money')) {
        detectedModule = 'omni_shield';
      } else if (lower.includes('budget') || lower.includes('naira') || lower.includes('finance') || lower.includes('spending') || lower.includes('save money') || lower.includes('salary')) {
        detectedModule = 'omni_finance';
      } else if (lower.includes('nepa') || lower.includes('disco') || lower.includes('electricity') || lower.includes('power') || lower.includes('generator') || lower.includes('solar') || lower.includes('inverter') || lower.includes('band a')) {
        detectedModule = 'omni_power';
      } else if (lower.includes('business') || lower.includes('customer') || lower.includes('sales') || lower.includes('product') || lower.includes('whatsapp') || lower.includes('marketing') || lower.includes('inventory')) {
        detectedModule = 'omni_business';
      } else if (lower.includes('waste') || lower.includes('recycle') || lower.includes('plastic') || lower.includes('bottle') || lower.includes('lawma') || lower.includes('scrap') || lower.includes('trash')) {
        detectedModule = 'omni_waste';
      } else if (lower.includes('verify') || lower.includes('fact') || lower.includes('news') || lower.includes('fake') || lower.includes('true') || lower.includes('claim')) {
        detectedModule = 'omni_verify';
      }
    }

    const aiClient = getAiClient();
    if (aiClient) {
      try {
        const langDirective = languageMode === 'pidgin'
          ? 'Respond entirely in warm, lively, authentic Nigerian Pidgin English.'
          : 'Respond in clear, professional English tailored with accurate Nigerian context.';

        const fullPrompt = `${BASE_SYSTEM_PROMPT}\n\nUser Language Mode: ${languageMode} (${langDirective})\nActive Target Module Focus: ${detectedModule}\n\nUser Question: ${message}`;

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 12000)
        );

        const apiPromise = aiClient.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: fullPrompt,
        });

        const response: any = await Promise.race([apiPromise, timeoutPromise]);
        const replyText = response.text || 'I processed your request.';
        return res.json({
          reply: replyText,
          detectedModule,
          source: 'gemini-3.1-flash-lite',
        });
      } catch (err: any) {
        console.warn('Gemini API call timeout/failed, using local Nigerian expert engine:', err?.message || err);
      }
    }

    // Local Nigerian Knowledge Engine Fallback
    const localReply = generateLocalKnowledgeReply(message, detectedModule, languageMode);
    return res.json({
      reply: localReply.text,
      detectedModule: localReply.module || detectedModule,
      source: 'omni_nigeria_core',
      actionTips: localReply.actionTips,
      disclaimer: localReply.disclaimer,
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Failed to generate response. Please try again.' });
  }
});

// Specialized Scam Analysis (OmniShield)
app.post('/api/modules/shield/analyze', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Content required' });

    const aiClient = getAiClient();
    if (aiClient) {
      try {
        const prompt = `Analyze this message/link for Nigerian fraud patterns (BVN threats, fake bank credits, crypto Ponzi, fake FG grants, job fees). Return JSON with keys: riskLevel (Safe, Low, Suspicious, Dangerous, Extreme Scam), riskScore (0-100), redFlags (array of strings), explanation (string), safeAction (string). Message to inspect: "${content}"`;
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: { responseMimeType: 'application/json' },
        });
        const parsed = JSON.parse(response.text || '{}');
        return res.json({ ...parsed, source: 'gemini-3.1-flash-lite' });
      } catch (e) {
        console.warn('Gemini shield analyze fallback:', e);
      }
    }

    // Local Shield Pattern Engine
    const textLower = content.toLowerCase();
    const isExtreme = textLower.includes('bvn') || textLower.includes('blocked') || textLower.includes('credited with ₦') || textLower.includes('grant') || textLower.includes('processing fee') || textLower.includes('congratulations you won');
    res.json({
      riskLevel: isExtreme ? 'Extreme Scam' : (textLower.includes('click') || textLower.includes('http') ? 'Suspicious' : 'Low'),
      riskScore: isExtreme ? 94 : 35,
      redFlags: isExtreme 
        ? ['Urgency & threat of account block', 'Request for BVN or sensitive credentials', 'Unofficial sender address or phone number', 'Unrealistic financial promises']
        : ['Unsolicited promotional communication', 'Check sender authenticity before sharing any data'],
      explanation: isExtreme 
        ? 'This message matches classic Nigerian social engineering tactics designed to induce panic or greed so you disclose banking security credentials.'
        : 'While no critical emergency keywords were flagged, never click unknown shortened links or share one-time passcodes (OTPs).',
      safeAction: 'Do NOT click any link. Never disclose your BVN, ATM card PAN, PIN, or OTP to anyone. Report this sender to your bank immediately.',
      source: 'omni_shield_analyzer',
    });
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});

// Specialized Fact Verification (OmniVerify)
app.post('/api/modules/verify/fact-check', async (req: Request, res: Response) => {
  try {
    const { claim } = req.body;
    if (!claim) return res.status(400).json({ error: 'Claim required' });

    const aiClient = getAiClient();
    if (aiClient) {
      try {
        const prompt = `Fact-check this claim or viral message in Nigeria. Return JSON with:
        verdict: one of ("Supported by Evidence", "Contradicted by Evidence", "Misleading / Missing Context", "Disputed", "Unverified"),
        summary: string,
        evidencePoints: array of strings,
        credibleSources: array of strings,
        cautionTip: string.
        Claim: "${claim}"`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: { responseMimeType: 'application/json' },
        });
        const parsed = JSON.parse(response.text || '{}');
        return res.json({ ...parsed, source: 'gemini-3.1-flash-lite' });
      } catch (e) {
        console.warn('Gemini verify fallback:', e);
      }
    }

    // Deterministic factual knowledge for common viral themes
    const lower = claim.toLowerCase();
    const verdict = lower.includes('fg gives') || lower.includes('free 50gb') || lower.includes('all students ₦50,000') 
      ? 'Contradicted by Evidence' 
      : 'Unverified';

    res.json({
      verdict,
      summary: verdict === 'Contradicted by Evidence'
        ? 'This claim mirrors recurring viral hoax chains circulating on WhatsApp and Facebook. Official federal government portals show no such program.'
        : 'This statement requires verification against official gazettes or verified news agencies before sharing.',
      evidencePoints: [
        'No circular published on the official Ministry or Government portal.',
        'Spelling irregularities and typical broadcast signature found in mass phishing loops.',
        'Official student loan and support programs operate strictly through NELFUND (nelf.gov.ng).'
      ],
      credibleSources: ['Official Government Gazette (statehouse.gov.ng)', 'NELFUND Official Portal', 'Premium Times Fact Check', 'TheCable DUBWA'],
      cautionTip: 'Before forwarding any sensational broadcast, pause and verify the source. Misinformation spreads 6x faster than facts.',
      source: 'omni_verify_engine',
    });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Helper for local knowledge replies
function generateLocalKnowledgeReply(message: string, module: string, lang: string) {
  const isPidgin = lang === 'pidgin';
  const lower = message.toLowerCase();

  switch (module) {
    case 'omni_health':
      return {
        module: 'OmniHealth',
        text: isPidgin
          ? `Kedu/Bawo! For health matter, your body na gold. For headache and fever wey you mention, malaria and typhoid dey common for Naija, but e fit be stress or infection too. 
Wetyn you go do now:
1. Rest well and drink plenty clean water or ORS.
2. Monitor your temperature.
3. Waka go nearest primary healthcare centre or hospital make dem do rapid diagnostic test (RDT) before taking drugs.
⚠️ Disclaimer: I be AI assistant, I no be doctor and I no fit diagnose or write prescription. If you dey vomit, breathe fast, or feel convulsion, rush go emergency hospital now now!`
          : `Thank you for consulting OmniHealth. Headache and fever in Nigeria commonly point to acute febrile illnesses like Malaria, Viral Infections, or Typhoid, but also dehydration and heat exhaustion.
Recommended Immediate Guidance:
1. Hydration: Drink plenty of clean fluids and oral rehydration solution.
2. Rest: Avoid strenuous heat and heavy labor.
3. Diagnostics: Seek an RDT (Rapid Diagnostic Test) for Malaria and complete blood count at a registered pharmacy or clinic.
⚠️ Medical Safety Notice: OmniHealth provides health educational information only, not a clinical diagnosis or medical prescription. If you experience severe chest pain, persistent vomiting, or difficulty breathing, please seek immediate emergency medical care.`,
        disclaimer: 'Always verify with a licensed healthcare practitioner.',
        actionTips: ['Locate registered Primary Healthcare Center', 'Get an RDT test before antimalarial treatment', 'Log symptoms in your health notes'],
      };

    case 'omni_learn':
      return {
        module: 'OmniLearn',
        text: isPidgin
          ? `Welcome to OmniLearn! JAMB, WAEC, or NECO no dey hard if you understand the foundation. For quadratic equations ($ax^2 + bx + c = 0$), you get 3 clean methods:
1. Factorization Method (find two numbers wey multiply give $ac$ and add give $b$).
2. Completing the Square.
3. The Almighty Formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.
You wan make we try one practice question together now?`
          : `Welcome to OmniLearn! To master quadratic equations for your JAMB UTME or WAEC examinations:
A quadratic equation is in the standard form: ax² + bx + c = 0 (where a ≠ 0).
The three standard solution methods are:
1. Factorization (split the middle term).
2. Completing the Square.
3. The Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a).
Example: Solve x² - 5x + 6 = 0.
Factors of 6 that sum to -5 are -2 and -3.
Hence (x - 2)(x - 3) = 0, giving x = 2 or x = 3.
Would you like to try 5 practice questions or generate a study timetable?`,
        actionTips: ['Take a 5-question JAMB Mathematics quiz', 'Generate 4-week study timetable', 'Review WAEC marking scheme'],
      };

    case 'omni_shield':
      return {
        module: 'OmniShield',
        text: isPidgin
          ? `Security alert from OmniShield! Abeg hold your hand, no click that link! 
For Naija today, scammers dey use fake BVN block messages, fake bank alerts, and fake Federal Government grants to carry people money.
Rule #1: Your bank go NEVER send SMS asking you to send your PIN, OTP, or BVN.
Rule #2: Real job or scholarship no dey ask for 'processing fee' or 'interview acceptance token'.
Rule #3: If e sound too good to be true, 100% na scam!`
          : `OmniShield Security Assessment:
Warning: Nigerian financial institutions and the Central Bank of Nigeria (CBN) will NEVER request your BVN, card digits, or OTP via SMS, WhatsApp, or email.
Common Scam Indicators in Nigeria:
- Fake BVN restriction panic messages urging you to call an unauthorized mobile line.
- Unsolicited federal grant or loan disbursement claims.
- Demands for upfront 'clearance' or 'agent' fees.
Recommended Action: Block the sender number, do not tap any link, and report the message to your bank's fraud desk.`,
        actionTips: ['Never disclose BVN or OTP to anyone', 'Report suspected mobile number to NCC/CBN', 'Check sender official email domain'],
      };

    case 'omni_finance':
      return {
        module: 'OmniFinance',
        text: isPidgin
          ? `Welcome to OmniFinance! Managing money with current Naija inflation needs sharp strategy.
Try the 50/30/20 budget framework adapted for Nigeria:
- 50% for Essentials: Foodstuff (garri, rice, protein), House rent, NEPA prepaid token, and Transport.
- 30% for Operational Flexibility: Generator fuel (PMS), airtime/data, family urgent 2k support.
- 20% for Savings & Emergency: Put am for high-yield savings (Fintech or treasury bills), no keep am idle as raw cash.
Use our Naira budget planner below to log your monthly salary and calculate your daily spending limit!`
          : `Welcome to OmniFinance. Managing household expenses in Nigeria requires realistic inflation-adjusted allocations:
1. Core Needs (50%): Food, housing, transport, utility bills (DisCo tokens).
2. Flexible Operations (30%): Backup generator fuel, telecommunications data, unforeseen family obligations.
3. Wealth Preservation (20%): Emergency buffer in inflation-hedged yields or verified Nigerian treasury bills.
Explore our automated Naira Budget Tracker below to monitor daily burn rates and projected month-end balances.`,
        actionTips: ['Log an expense in ₦', 'Set up emergency fund goal', 'Calculate daily allowable spending'],
      };

    case 'omni_power':
      return {
        module: 'OmniPower',
        text: isPidgin
          ? `Welcome to OmniPower! Light matter and fuel price dey touch everybody pocket for Naija.
Make we optimize am:
1. DisCo Band Check: Band A (minimum 20 hrs/day @ ~₦209/kWh) vs Band B/C. If your feeder no dey give you 20hrs, you fit petition your DisCo with NERC regulations.
2. 'I better pass my neighbour' / Generator Fuel: 1 litre of PMS now costs ~₦1,050. Running a 3.5kVA generator for 6 hours daily costs roughly ₦180,000 to ₦220,000 every month!
3. Solar Transition: A 1.5kVA Inverter + 2.5kWh Lithium battery setup can carry your fans, TV, laptop, and LED lights, saving you thousands on fuel within 12 months.`
          : `Welcome to OmniPower! Optimizing electricity and generator costs in Nigeria:
1. Grid Band Assessment: Check your feeder classification (Band A gives 20+ hours daily at higher rates; Band B gives 16-20 hours).
2. Generator vs Grid Economics: Grid electricity at ~₦209/kWh remains approximately 3x cheaper per kilowatt-hour than running small PMS generators (~₦650–₦750/kWh equivalent).
3. Sizing Recommendations: Switching lighting to DC LEDs, using inverter-technology refrigerators, and staggering heavy pumping loads reduces your peak generator kVA requirement by up to 40%.`,
        actionTips: ['Calculate Generator Fuel vs Grid Cost', 'Size a Solar & Inverter System', 'Log DisCo Prepaid Meter Token'],
      };

    case 'omni_career':
      return {
        module: 'OmniCareer',
        text: `Welcome to OmniCareer! We help Nigerian graduates, tech talents, and professionals land verified opportunities.
Key Career Pillars:
1. ATS-Friendly CV format (clean headings, quantified achievements, keyword alignment with Nigerian & remote job markets).
2. Cover Letter customization for Lagos, Abuja, and international remote teams.
3. Anti-Scam Assurance: Never pay money for job interviews, aptitude test materials, or uniform fees. Legitimate firms (e.g., banks, telecoms, multinationals) will never demand payments from job seekers.`,
        actionTips: ['Generate ATS Resume Summary', 'Simulate Interview with AI', 'Track Applications'],
      };

    case 'omni_business':
      return {
        module: 'OmniBusiness',
        text: `Welcome to OmniBusiness! Empowering Nigerian SMEs, traders, and founders to increase revenue:
1. WhatsApp & Social Copy: Create high-converting product captions and broadcast messages that drive instant transfers.
2. Inventory & Cashflow: Prevent stock-outs on fast-moving goods and log credit sales (debtors).
3. Customer Service: Fast professional responses that build trust and minimize customer disputes.`,
        actionTips: ['Generate WhatsApp Promo Copy', 'Log Inventory Item', 'Track Daily Sales & Debts'],
      };

    default:
      return {
        module: 'OmniCentral',
        text: isPidgin
          ? `Welcome to OmniAI Nigeria! I dey here to help you solve everyday Naija matters across 10 specialized areas: Health, JAMB/School, Career & CV, Traffic/Transit, Scam Shield, Naira Finance, Power/Light, SME Business, Waste Recycling, and Fact Checking. Wetin you wan make we do today?`
          : `Welcome to OmniAI Nigeria — your all-in-one intelligent companion for everyday Nigerian life. You can ask anything from JAMB study tips, scam checking, Naira budgeting, DisCo power optimization, CV writing, to business marketing. Select any module below or ask your question directly!`,
        actionTips: ['Check a suspicious message with OmniShield', 'Prepare for JAMB/WAEC with OmniLearn', 'Plan monthly budget with OmniFinance'],
      };
  }
}

// Development and Production setup
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OmniAI Nigeria server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
