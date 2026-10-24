import { ModuleId, ServiceDefinition } from '../types';

export const OMNI_SERVICES: ServiceDefinition[] = [
  {
    id: 'omni_health',
    name: 'OmniHealth',
    tagline: 'Healthcare Assistance & Clinic Guidance',
    iconName: 'HeartPulse',
    badge: 'Health & Wellness',
    accentColor: 'from-emerald-600 to-teal-500 text-emerald-400 border-emerald-500/30',
    description: 'Accessible, trustworthy health information, fever/malaria symptom checks, urgent emergency flags, and registered clinic directory across Nigerian states.',
    sampleQuestions: [
      'I have a headache, mild chills, and fever. What should I do?',
      'How do I manage high blood pressure with Nigerian diets?',
      'Find registered primary healthcare clinics in Ikeja, Lagos',
      'What are the warning signs of severe malaria in children?'
    ],
  },
  {
    id: 'omni_learn',
    name: 'OmniLearn',
    tagline: 'Personalised Tutoring & Exam Preparation',
    iconName: 'GraduationCap',
    badge: 'Education',
    accentColor: 'from-amber-500 to-yellow-600 text-amber-400 border-amber-500/30',
    description: 'Personalized learning for secondary & tertiary students. Master JAMB UTME, WAEC, NECO, and Post-UTME with step-by-step topic breakdowns and practice quizzes.',
    sampleQuestions: [
      'Teach me quadratic equations from the beginning with worked examples',
      'Give me 5 JAMB-standard questions on Photosynthesis and explain answers',
      'Explain the themes and characters in Government & Nigerian Federalism',
      'Generate a 30-day WAEC revision timetable for Science students'
    ],
  },
  {
    id: 'omni_career',
    name: 'OmniCareer',
    tagline: 'Career Development & Scam-Free Employment',
    iconName: 'Briefcase',
    badge: 'Careers',
    accentColor: 'from-blue-600 to-indigo-500 text-blue-400 border-blue-500/30',
    description: 'ATS CV optimization, cover letter generator, skills gap analysis, mock interview simulator, and verified job opportunity alerts with anti-recruitment-fee protection.',
    sampleQuestions: [
      'Improve my CV for a Data Analyst role in Lagos or remote',
      'Simulate an interview for an Operations Associate at a Nigerian FinTech',
      'Draft a cover letter for a Customer Success role',
      'How can I identify fake job listings demanding interview or medical fees?'
    ],
  },
  {
    id: 'omni_move',
    name: 'OmniMove',
    tagline: 'Transit, Route Planning & Travel Assistance',
    iconName: 'Compass',
    badge: 'Transport',
    accentColor: 'from-purple-600 to-pink-500 text-purple-400 border-purple-500/30',
    description: 'Commute and journey planning across Lagos (Danfo, BRT, Third Mainland Bridge, Blue Rail), Abuja, and interstate transit corridors with fuel cost estimations.',
    sampleQuestions: [
      'Best route and estimated time from Ikorodu to Victoria Island during peak hours',
      'How much fuel will a 1.8L sedan consume from Lagos to Ibadan?',
      'Abuja Metro Rail stations and connection routes to airport',
      'Delivery dispatch route optimizer for 5 stops across Ikeja & Surulere'
    ],
  },
  {
    id: 'omni_shield',
    name: 'OmniShield',
    tagline: 'Scam Detection & Fraud Awareness',
    iconName: 'ShieldAlert',
    badge: 'Cybersecurity',
    accentColor: 'from-rose-600 to-red-500 text-rose-400 border-rose-500/30',
    description: 'Inspect suspicious SMS, bank credit alert anomalies, WhatsApp forward links, fake BVN restrictions, and Ponzi schemes with instant risk ratings and safe actions.',
    sampleQuestions: [
      'Check this SMS: "Your BVN has been flagged for deactivation. Call 080... to reactivate"',
      'Is this WhatsApp message claiming FG is sharing ₦50,000 grant genuine?',
      'Someone sent me a proof of payment screenshot for clothes. How do I verify it?',
      'Inspect this suspicious link: bit.ly/cbn-relief-fund-2026'
    ],
  },
  {
    id: 'omni_finance',
    name: 'OmniFinance',
    tagline: 'Personal Finance & Naira Budget Management',
    iconName: 'Wallet',
    badge: 'Finance',
    accentColor: 'from-emerald-500 to-green-600 text-emerald-400 border-emerald-500/30',
    description: 'Manage personal money in Nigerian Naira (₦). Track daily expenses, allocate food and generator budgets, build emergency reserves, and hedge against inflation.',
    sampleQuestions: [
      'Help me create a monthly budget from a ₦250,000 salary in Lagos',
      'How much should I allocate for foodstuff vs fuel vs emergency savings?',
      'What are safe, regulated ways to earn returns on idle Naira in Nigeria?',
      'Calculate my daily spending limit for the rest of the month'
    ],
  },
  {
    id: 'omni_power',
    name: 'OmniPower',
    tagline: 'Electricity, Generator & Solar Optimisation',
    iconName: 'Zap',
    badge: 'Energy',
    accentColor: 'from-amber-400 to-orange-500 text-amber-400 border-amber-500/30',
    description: 'Understand DisCo Band tariffs (Band A vs B/C), calculate generator fuel consumption vs grid costs, and size solar inverter batteries for your home or shop.',
    sampleQuestions: [
      'Calculate the cost of running a 3.5kVA generator 6 hours daily vs Band A grid',
      'How many kWh of electricity will ₦10,000 buy on IKEDC Band A vs Band B?',
      'What solar inverter capacity and battery size do I need for TV, fans, and laptop?',
      'Tips to stop my prepaid meter units from exhausting too quickly'
    ],
  },
  {
    id: 'omni_business',
    name: 'OmniBusiness',
    tagline: 'SME Management & AI Sales Copilot',
    iconName: 'Store',
    badge: 'SME & Commerce',
    accentColor: 'from-cyan-500 to-blue-600 text-cyan-400 border-cyan-500/30',
    description: 'Automate WhatsApp marketing broadcasts, craft Instagram product captions, monitor inventory with low-stock warnings, and record cash sales and customer debts.',
    sampleQuestions: [
      'Write a WhatsApp broadcast message advertising my new Ankara arrivals with discounts',
      'Draft a polite reminder message to a customer owing ₦45,000 for 3 weeks',
      'Generate engaging Instagram captions and hashtags for hair extensions',
      'Calculate my gross profit margin if I buy at ₦8,000 and sell at ₦12,500'
    ],
  },
  {
    id: 'omni_waste',
    name: 'OmniWaste',
    tagline: 'Waste Sorting & Local Recycling Hubs',
    iconName: 'Recycle',
    badge: 'Environment',
    accentColor: 'from-lime-500 to-emerald-600 text-lime-400 border-lime-500/30',
    description: 'Guidance on sorting PET plastics, aluminum cans, carton scrap, and electronics. Discover verified Lagos LAWMA & scrap buyback recycling centers to earn from waste.',
    sampleQuestions: [
      'Can I sell clear plastic drink bottles (PET) for cash in Lagos? Where?',
      'How do I safely dispose of swollen phone lithium batteries and e-waste?',
      'Connect me with recycling buy-back hubs in Surulere or Ikeja',
      'How to start a community plastic collection scheme in my street'
    ],
  },
  {
    id: 'omni_verify',
    name: 'OmniVerify',
    tagline: 'Fact-Checking & Misinformation Debunker',
    iconName: 'CheckCircle2',
    badge: 'Media Literacy',
    accentColor: 'from-violet-500 to-purple-600 text-violet-400 border-violet-500/30',
    description: 'Investigate sensational viral claims, WhatsApp forwarded broadcasts, political quotes, and breaking news. Receive clear verdicts backed by verified Nigerian reporting.',
    sampleQuestions: [
      'Verify: "CBN has announced immediate withdrawal of old ₦500 and ₦1000 notes"',
      'Is it true that fuel price has been officially reduced to ₦450 per litre?',
      'Check the authenticity of this viral audio claiming a bridge closure in Lagos',
      'How do I spot manipulated screenshots and doctored bank receipts?'
    ],
  },
];
