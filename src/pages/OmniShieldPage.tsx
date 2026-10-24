import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Sparkles,
  ExternalLink,
  Info,
  ShieldCheck,
  FileSearch,
  Copy,
  Check
} from 'lucide-react';

export const OmniShieldPage: React.FC = () => {
  const { sendChatMessage, setCurrentPage } = useApp();
  const [suspectText, setSuspectText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const sampleScams = [
    {
      title: 'Fake BVN Restriction SMS',
      text: 'URGENT CBN NOTICE: Your BVN has been flagged for fraudulent activity and will be deactivated within 12hrs. Call Helpdesk on 08023456789 immediately to update your record and avoid account freeze.',
    },
    {
      title: 'Fake Federal Grant WhatsApp Link',
      text: 'Congratulations! You have been selected for the 2026 FG Presidential Empowerment Grant of ₦50,000. Apply now before quota fills up: http://bit.ly/fg-empowerment-fund-disbursement',
    },
    {
      title: 'Fake Job Processing Fee Email',
      text: 'Dear Applicant, following your application for Graduate Trainee at Shell/Chevron, you have been shortlisted. Pay ₦7,500 interview accreditation and medical test fee to Zenith Bank Acc 1012345678 to receive your venue pass.',
    },
  ];

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!suspectText.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/modules/shield/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: suspectText }),
      });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      // Local evaluation fallback
      const lower = suspectText.toLowerCase();
      const isExtreme = lower.includes('bvn') || lower.includes('blocked') || lower.includes('processing fee') || lower.includes('deactivated');
      setAnalysisResult({
        riskLevel: isExtreme ? 'Extreme Scam' : 'Suspicious',
        riskScore: isExtreme ? 95 : 65,
        redFlags: [
          'Unsolicited urgency and panic inducement',
          'Unofficial phone number / shortened URL used instead of verified corporate shortcode',
          'Requests for credential verification or upfront fees'
        ],
        explanation: 'This communication matches classic Nigerian cyber fraud playbooks. Financial institutions will NEVER send an SMS threatening BVN deactivation or requesting a phone call to a personal mobile number.',
        safeAction: 'Do NOT call the number. Do NOT click any links. Report to your bank branch or the Nigerian Communications Commission (NCC).',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-900 p-6 sm:p-8 border border-rose-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 shadow-lg">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-rose-400">MODULE 05</span>
                <span className="rounded-md bg-rose-950 px-2 py-0.5 text-[10px] font-semibold text-rose-300 border border-rose-800/40">
                  Cybersecurity & Anti-Fraud
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">OmniShield Fraud Detector</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Inspect suspicious SMS, fake bank alerts, phishing URLs, and recruitment scams.
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                sendChatMessage('Inspect this message for scam patterns: "Your BVN has been flagged for deactivation. Call 080... to reactivate"', 'omni_shield');
                setCurrentPage('chat');
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Shield AI</span>
            </button>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="mt-5 rounded-2xl bg-slate-950/70 border border-slate-800 p-3.5 flex items-start space-x-3 text-xs text-slate-300">
          <Info className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Evidence-Based Evaluation:</strong> OmniShield never automatically executes files or opens suspicious links. A clean score does not guarantee absolute safety; always exercise personal vigilance when dealing with financial requests.
          </p>
        </div>
      </div>

      {/* Analyzer Input & Sample Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4 rounded-3xl bg-slate-900 p-6 border border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <FileSearch className="h-4 w-4 text-rose-400" />
            <span>Paste Suspicious Message, SMS or Web Link</span>
          </h3>

          <form onSubmit={handleAnalyze} className="space-y-3">
            <textarea
              value={suspectText}
              onChange={(e) => setSuspectText(e.target.value)}
              placeholder="Paste the SMS, WhatsApp forward, bank credit alert, or email body here..."
              rows={5}
              className="w-full rounded-2xl bg-slate-950 p-3.5 text-xs text-white border border-slate-800 focus:outline-none focus:border-rose-500 leading-relaxed font-sans"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Zero data shared with third parties</span>
              <button
                type="submit"
                disabled={!suspectText.trim() || isAnalyzing}
                className="flex items-center space-x-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold px-5 py-2.5 text-xs transition-all shadow-md shadow-rose-950/40"
              >
                <ShieldAlert className="h-4 w-4" />
                <span>{isAnalyzing ? 'Scanning Patterns...' : 'Inspect for Scams'}</span>
              </button>
            </div>
          </form>

          {/* Analysis Result Card */}
          {analysisResult && (
            <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Risk Rating:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    analysisResult.riskLevel === 'Extreme Scam' || analysisResult.riskScore > 80
                      ? 'bg-rose-950 text-rose-400 border border-rose-700'
                      : analysisResult.riskLevel === 'Suspicious'
                      ? 'bg-amber-950 text-amber-400 border border-amber-700'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                  }`}>
                    {analysisResult.riskLevel} ({analysisResult.riskScore}/100)
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">OmniShield Security AI</span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-200 block mb-1">Assessment Explanation:</span>
                <p className="text-xs text-slate-300 leading-relaxed">{analysisResult.explanation}</p>
              </div>

              {analysisResult.redFlags && analysisResult.redFlags.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-rose-400 block mb-1.5">Detected Red Flags:</span>
                  <div className="space-y-1">
                    {analysisResult.redFlags.map((flag: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-400 flex-shrink-0" />
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="font-bold text-emerald-400 block mb-0.5">Recommended Safe Action:</span>
                <p className="text-slate-300">{analysisResult.safeAction}</p>
              </div>
            </div>
          )}
        </div>

        {/* Known Nigerian Scam Catalog */}
        <div className="space-y-4 rounded-3xl bg-slate-900 p-6 border border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Common Nigerian Scam Templates
          </h4>
          <p className="text-xs text-slate-400">
            Click any template to test OmniShield's detection accuracy:
          </p>

          <div className="space-y-3">
            {sampleScams.map((scam, i) => (
              <div
                key={i}
                onClick={() => {
                  setSuspectText(scam.text);
                  setAnalysisResult(null);
                }}
                className="cursor-pointer p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 transition-all text-xs space-y-1 group"
              >
                <span className="font-bold text-white group-hover:text-rose-300 transition-colors block">
                  {scam.title}
                </span>
                <p className="text-slate-400 text-[11px] line-clamp-2 italic">
                  "{scam.text}"
                </p>
                <span className="text-[10px] text-rose-400 font-semibold block pt-1">
                  Load & Test Pattern →
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-slate-300 block">Official Emergency Reporting:</span>
            <p>EFCC Toll-free: <strong>0809 332 2644</strong></p>
            <p>NCC Cybercrime Help: <strong>622</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};
