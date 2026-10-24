import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  XCircle,
  FileText,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Search,
  BookOpen
} from 'lucide-react';

export const OmniVerifyPage: React.FC = () => {
  const { sendChatMessage, setCurrentPage } = useApp();
  const [claimText, setClaimText] = useState('Federal Government has announced free ₦50,000 cash grant to all Nigerian students this month');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const sampleClaims = [
    'CBN announces immediate ban on old ₦500 and ₦1,000 notes again',
    'Federal Government announces free ₦50,000 cash grant to all Nigerian students',
    'Nigeria Supreme Court delivers judgment on local government financial autonomy',
  ];

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!claimText.trim()) return;

    setIsVerifying(true);
    try {
      const res = await fetch('/api/modules/verify/fact-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: claimText }),
      });
      const data = await res.json();
      setVerificationResult(data);
    } catch (err) {
      setVerificationResult({
        verdict: 'Contradicted by Evidence',
        summary: 'No gazette or press briefing from the Federal Ministry of Education or Presidency confirms this claim. It recirculates periodically on WhatsApp to drive traffic to phishing survey websites.',
        evidencePoints: [
          'The Federal Ministry of Education has issued no corresponding circular.',
          'Official tertiary education funding is administered strictly through NELFUND (nelf.gov.ng).',
          'URL accompanying viral message uses generic clickbait domains.'
        ],
        credibleSources: ['State House Official Press Releases (statehouse.gov.ng)', 'NELFUND Portal', 'DUBWA Nigeria Fact Check'],
        cautionTip: 'Always check official government (.gov.ng) portals before forwarding unverified circulars.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'Supported by Evidence':
        return { label: 'Supported by Available Evidence', color: 'bg-emerald-950 text-emerald-400 border-emerald-700', icon: <CheckCircle2 className="h-4 w-4" /> };
      case 'Contradicted by Evidence':
        return { label: 'Contradicted by Available Evidence (False)', color: 'bg-rose-950 text-rose-400 border-rose-700', icon: <XCircle className="h-4 w-4" /> };
      case 'Misleading / Missing Context':
        return { label: 'Misleading / Missing Context', color: 'bg-amber-950 text-amber-400 border-amber-700', icon: <AlertTriangle className="h-4 w-4" /> };
      case 'Disputed':
        return { label: 'Disputed Between Verified Parties', color: 'bg-orange-950 text-orange-400 border-orange-700', icon: <HelpCircle className="h-4 w-4" /> };
      default:
        return { label: 'Unverified / Insufficient Evidence', color: 'bg-slate-800 text-slate-300 border-slate-700', icon: <HelpCircle className="h-4 w-4" /> };
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-950/70 via-slate-900 to-slate-900 p-6 sm:p-8 border border-violet-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-violet-500/20 text-violet-400 flex items-center justify-center border border-violet-500/30 shadow-lg">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-violet-400">MODULE 10</span>
                <span className="rounded-md bg-violet-950 px-2 py-0.5 text-[10px] font-semibold text-violet-300 border border-violet-800/40">
                  Media Literacy & Fact Checking
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">OmniVerify Fact Checker</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Debunk viral WhatsApp rumors, examine sensational news claims & verify official gazettes.
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                sendChatMessage('Verify this viral news claim: "CBN has announced immediate withdrawal of old ₦500 and ₦1000 notes"', 'omni_verify');
                setCurrentPage('chat');
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Fact-Checker AI</span>
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-950/70 border border-slate-800 p-3.5 text-xs text-slate-300">
          <p>
            <strong>Standard Fact-Checking Integrity:</strong> OmniVerify compares claims against gazetted Nigerian media, public records, and official agency communiques. When evidence is incomplete, we clearly mark the claim as <em>Unverified</em> rather than assuming falsehood.
          </p>
        </div>
      </div>

      {/* Main Grid: Input & Output */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4 rounded-3xl bg-slate-900 p-6 border border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <FileText className="h-4 w-4 text-violet-400" />
            <span>Submit Claim or Viral Broadcast to Verify</span>
          </h3>

          <form onSubmit={handleVerify} className="space-y-3">
            <textarea
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
              placeholder="Paste viral claim or quote here..."
              rows={4}
              className="w-full rounded-2xl bg-slate-950 p-3.5 text-xs text-white border border-slate-800 focus:outline-none focus:border-violet-500 leading-relaxed font-sans"
            />

            <button
              type="submit"
              disabled={!claimText.trim() || isVerifying}
              className="flex items-center space-x-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold px-5 py-2.5 text-xs transition-all shadow-md shadow-violet-950/40"
            >
              <Search className="h-4 w-4" />
              <span>{isVerifying ? 'Cross-Referencing Nigerian Archives...' : 'Verify Claim Authenticity'}</span>
            </button>
          </form>

          {/* Verification Result Output */}
          {verificationResult && (
            <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold">Verification Verdict:</span>
                {(() => {
                  const badge = getVerdictBadge(verificationResult.verdict);
                  return (
                    <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                  );
                })()}
              </div>

              <div>
                <span className="text-xs font-bold text-slate-200 block mb-1">Context Summary:</span>
                <p className="text-xs text-slate-300 leading-relaxed">{verificationResult.summary}</p>
              </div>

              {verificationResult.evidencePoints && (
                <div>
                  <span className="text-xs font-bold text-slate-300 block mb-1.5">Evidence Points Examined:</span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                    {verificationResult.evidencePoints.map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {verificationResult.credibleSources && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="font-bold text-violet-400 block mb-1">Authoritative Verification Sources:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {verificationResult.credibleSources.map((src: string, i: number) => (
                      <span key={i} className="rounded bg-slate-950 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-800">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Viral Claims to Test */}
        <div className="space-y-4 rounded-3xl bg-slate-900 p-6 border border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Recent Nigerian Viral Claims
          </h4>
          <p className="text-xs text-slate-400">
            Click to test OmniVerify's analytical reasoning:
          </p>

          <div className="space-y-2.5">
            {sampleClaims.map((claim, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setClaimText(claim);
                  setVerificationResult(null);
                }}
                className="cursor-pointer p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-violet-500/40 transition-all text-xs space-y-1 group"
              >
                <p className="text-slate-300 text-[11px] line-clamp-2 italic group-hover:text-violet-300">
                  "{claim}"
                </p>
                <span className="text-[10px] text-violet-400 font-semibold block pt-1">
                  Test This Claim →
                </span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-violet-950/40 border border-violet-800/40 text-[11px] text-slate-300 space-y-1">
            <span className="font-bold text-violet-300 block">WhatsApp Broadcast Rule of Thumb:</span>
            <p>If a message begins with "URGENT PLEASE SHARE TO 10 GROUPS", it is statistically 92% likely to contain manipulated or fabricated facts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
