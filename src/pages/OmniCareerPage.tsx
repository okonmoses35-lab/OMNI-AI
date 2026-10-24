import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  FileText,
  UserCheck,
  Send,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
  TrendingUp,
  Award
} from 'lucide-react';

const SAMPLE_NIGERIAN_JOBS = [
  {
    id: 'job-1',
    title: 'Operations & Growth Associate',
    company: 'FinTech Logistics Hub (Lagos)',
    location: 'Yaba / Hybrid (Lagos)',
    salary: '₦250,000 - ₦350,000 / month',
    type: 'Full-time',
    verified: true,
    description: 'Manage merchant onboarding, daily reconciliation, and customer success workflows across south-west branches.',
  },
  {
    id: 'job-2',
    title: 'Frontend Developer (React / Next.js)',
    company: 'Pan-African HealthTech Solutions',
    location: 'Remote (Nigeria)',
    salary: '₦400,000 - ₦600,000 / month',
    type: 'Full-time',
    verified: true,
    description: 'Build responsive mobile-first patient interfaces and real-time clinic portals using modern TypeScript and Tailwind CSS.',
  },
  {
    id: 'job-3',
    title: 'Customer Experience & WhatsApp Lead',
    company: 'E-commerce FMCG Retailer',
    location: 'Ikeja, Lagos',
    salary: '₦180,000 - ₦240,000 / month',
    type: 'Full-time',
    verified: true,
    description: 'Coordinate customer enquiries, order confirmations, and delivery logistics via CRM and WhatsApp Business.',
  },
];

export const OmniCareerPage: React.FC = () => {
  const { sendChatMessage, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState<'cv' | 'interview' | 'jobs'>('cv');

  // CV Builder state
  const [cvSummary, setCvSummary] = useState(
    'Detail-oriented Economics graduate from University of Lagos with 2 years of experience in retail banking customer support and financial record reconciliation. Skilled in Excel, CRM tools, and communication.'
  );
  const [targetRole, setTargetRole] = useState('Operations Specialist at a Nigerian FinTech');
  const [optimizedCvResult, setOptimizedCvResult] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [copiedCv, setCopiedCv] = useState(false);

  // Mock Interview State
  const [interviewQuestionIndex, setInterviewQuestionIndex] = useState(0);
  const [interviewAnswer, setInterviewAnswer] = useState('');
  const [interviewFeedback, setInterviewFeedback] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const interviewQuestions = [
    'Tell me about a time you resolved a difficult customer dispute or transaction bottleneck in Nigeria.',
    'How do you prioritize urgent tasks when power outage or internet network downtime disrupts your workflow?',
    'Why do you want to join our company and how do your skills align with our business objectives?',
  ];

  const handleOptimizeCv = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setOptimizedCvResult(`### ATS-OPTIMIZED PROFESSIONAL SUMMARY
**Target Role:** ${targetRole}

**Professional Summary:**
Results-driven Operations Professional with a strong track record of optimizing customer engagement, resolving transactional bottlenecks, and reconciling high-volume financial data. Proven capability in driving merchant satisfaction, accelerating dispute turnaround times by 35%, and leveraging CRM tools to streamline operations in fast-paced Nigerian business environments.

**Key Technical & Soft Competencies:**
- Core Operations & Process Optimization
- Transaction Reconciliation & Audit Compliance
- Customer Retention & Escalation Resolution
- MS Excel (Pivot Tables, VLOOKUP, Financial Modeling)
- Agile Problem Solving in Infrastructure-Constrained Environments

**Impact-Driven Achievement Bullet Points (Add to Experience):**
- Spearheaded daily settlement audits across 250+ merchant accounts, eliminating reconciliation discrepancies within 24 hours.
- Reduced customer issue escalation rate by 28% through the implementation of structured WhatsApp automated response playbooks.`);
      setIsOptimizing(false);
    }, 600);
  };

  const handleEvaluateInterview = () => {
    if (!interviewAnswer.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setInterviewFeedback({
        score: '8.5 / 10',
        strengths: ['Clear structure using STAR method (Situation, Task, Action, Result)', 'Realistic Nigerian context demonstrating resilience during operational hurdles'],
        improvements: ['Quantify the final outcome with a clear percentage or monetary figure saved for the employer'],
        modelAnswer: 'A high-scoring answer clearly names the tools used, the team members coordinated, and the measurable business outcome delivered.'
      });
      setIsEvaluating(false);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-900 p-6 sm:p-8 border border-blue-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shadow-lg">
              <Briefcase className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-blue-400">MODULE 03</span>
                <span className="rounded-md bg-blue-950 px-2 py-0.5 text-[10px] font-semibold text-blue-300 border border-blue-800/40">
                  Career & Recruitment
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">OmniCareer Accelerator</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                ATS CV optimization, AI interview simulator & verified scam-free job listings.
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                sendChatMessage('Improve my CV for an Operations Associate role in Lagos with strong ATS keywords', 'omni_career');
                setCurrentPage('chat');
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Career AI</span>
            </button>
          </div>
        </div>

        {/* Anti-recruitment-fee warning */}
        <div className="mt-5 rounded-2xl bg-amber-950/40 border border-amber-800/50 p-3.5 flex items-start space-x-3 text-xs text-amber-200">
          <ShieldAlert className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Zero Recruitment Fees Guarantee:</strong> Legitimate Nigerian corporate employers, banks, and multinationals will <strong>NEVER</strong> demand money for job applications, interview registration, aptitude tests, or uniforms. Report any such requests immediately!
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex border-b border-slate-800 space-x-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('cv')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'cv' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>ATS CV Enhancer</span>
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'interview' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>Mock Interview Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'jobs' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Verified Job Explorer</span>
          </button>
        </div>
      </div>

      {/* Tab 1: CV Enhancer */}
      {activeTab === 'cv' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-3xl bg-slate-900 p-6 border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <span>Input Current Resume / Profile</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Desired Job Title</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Your Background & Experience</label>
                <textarea
                  value={cvSummary}
                  onChange={(e) => setCvSummary(e.target.value)}
                  rows={6}
                  className="w-full rounded-2xl bg-slate-950 p-3 text-white border border-slate-800 focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
                />
              </div>

              <button
                onClick={handleOptimizeCv}
                disabled={isOptimizing}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 text-xs transition-all shadow-md shadow-blue-950/40"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isOptimizing ? 'Analyzing ATS Keywords...' : 'Optimize CV for Nigerian & Global Recruiters'}</span>
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 flex flex-col justify-between">
            {optimizedCvResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Optimized ATS Output
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(optimizedCvResult);
                      setCopiedCv(true);
                      setTimeout(() => setCopiedCv(false), 2000);
                    }}
                    className="flex items-center space-x-1 text-xs text-emerald-400 font-semibold hover:underline"
                  >
                    {copiedCv ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedCv ? 'Copied' : 'Copy CV Text'}</span>
                  </button>
                </div>

                <div className="prose prose-invert prose-sm max-w-none text-slate-200 text-xs leading-relaxed whitespace-pre-line">
                  {optimizedCvResult}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                <Award className="h-12 w-12 text-slate-600" />
                <h4 className="font-bold text-white text-sm">ATS CV Booster Ready</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Fill in your target position to generate powerful metric-backed bullet points and keywords.
                </p>
                <button
                  onClick={handleOptimizeCv}
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs text-white font-semibold"
                >
                  Generate Sample Optimized Profile
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Mock Interview Simulator */}
      {activeTab === 'interview' && (
        <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase">
                Mock Interview Simulation
              </span>
              <p className="text-xs text-slate-400">Question {interviewQuestionIndex + 1} of {interviewQuestions.length}</p>
            </div>
            <span className="rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-300 font-mono">
              Target: {targetRole}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-bold text-white leading-relaxed">
            "{interviewQuestions[interviewQuestionIndex]}"
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Your Spoken or Written Response:</label>
            <textarea
              value={interviewAnswer}
              onChange={(e) => setInterviewAnswer(e.target.value)}
              placeholder="Answer clearly detailing your actions, resilience, and measurable results..."
              rows={4}
              className="w-full rounded-2xl bg-slate-950 p-3 text-xs text-white border border-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setInterviewQuestionIndex((prev) => (prev + 1) % interviewQuestions.length);
                setInterviewAnswer('');
                setInterviewFeedback(null);
              }}
              className="text-xs text-slate-400 hover:text-white"
            >
              Skip to Next Question →
            </button>

            <button
              onClick={handleEvaluateInterview}
              disabled={isEvaluating || !interviewAnswer.trim()}
              className="flex items-center space-x-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-5 py-2.5 text-xs transition-all shadow-md"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isEvaluating ? 'Evaluating Response...' : 'Evaluate Answer'}</span>
            </button>
          </div>

          {interviewFeedback && (
            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 text-xs space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400">Interviewer Assessment Score:</span>
                <span className="rounded bg-emerald-950 px-2 py-0.5 font-bold font-mono text-emerald-300 border border-emerald-800">
                  {interviewFeedback.score}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-300 block mb-1">Key Strengths:</span>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                  {interviewFeedback.strengths.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-amber-400 block mb-1">Growth Opportunity:</span>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                  {interviewFeedback.improvements.map((im: string, i: number) => (
                    <li key={i}>{im}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Verified Job Explorer */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Verified Nigerian Job Openings</h3>
            <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Verified Authenticity • Zero Fees</span>
            </span>
          </div>

          <div className="space-y-3">
            {SAMPLE_NIGERIAN_JOBS.map((job) => (
              <div key={job.id} className="rounded-2xl bg-slate-900 p-5 border border-slate-800 text-xs space-y-2 hover:border-blue-500/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <h4 className="font-bold text-white text-sm">{job.title}</h4>
                    <p className="text-slate-400">{job.company} • {job.location}</p>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">{job.salary}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{job.description}</p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="rounded bg-slate-950 px-2 py-0.5 text-[10px] text-slate-400">{job.type}</span>
                  <button
                    onClick={() => {
                      sendChatMessage(`Draft a tailored cover letter for this role: ${job.title} at ${job.company}`, 'omni_career');
                      setCurrentPage('chat');
                    }}
                    className="text-blue-400 hover:text-blue-300 font-semibold text-xs"
                  >
                    Draft Tailored Cover Letter →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
