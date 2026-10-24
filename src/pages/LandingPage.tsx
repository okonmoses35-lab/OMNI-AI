import React from 'react';
import { useApp } from '../context/AppContext';
import { OMNI_SERVICES } from '../data/servicesData';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Lock,
  Globe,
  Layers,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Compass,
  ShieldAlert,
  Wallet,
  Zap,
  Store,
  Recycle
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage, loginUser, setShowApkModal, setShowIntroModal } = useApp();

  return (
    <div className="space-y-16 pb-20 max-w-6xl mx-auto">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-purple-950/40 via-slate-950 to-slate-950 p-8 sm:p-16 border border-purple-900/40 text-center shadow-2xl">
        {/* Branded Logo Showcase */}
        <div className="flex justify-center mb-6">
          <div className="relative group cursor-pointer" onClick={() => setShowIntroModal(true)}>
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-60 blur-xl group-hover:opacity-90 transition duration-500" />
            <img
              src="/omni-logo.jpg"
              alt="Omni AI Branded Logo"
              className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-3xl object-cover ring-2 ring-purple-400 shadow-2xl"
            />
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 rounded-full bg-purple-950/80 px-4 py-1.5 text-xs font-semibold text-purple-300 border border-purple-800/60 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span>Omni AI • Smarter • Stronger • Together</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Nigeria’s Premier Unified AI Platform for Everyday Life
        </h1>

        <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From passing JAMB and screening febrile illness to blocking BVN scams, tracking Naira budgets, optimizing generator fuel, and boosting SME sales.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-6 py-3.5 text-sm font-bold text-white transition-all shadow-xl shadow-purple-950/60 active:scale-95"
          >
            <span>Enter OmniAI Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setShowIntroModal(true)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-2xl bg-purple-950/80 hover:bg-purple-900/90 px-6 py-3.5 text-sm font-bold text-purple-200 border border-purple-800/70 transition-all shadow-lg shadow-purple-950/50"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span>3-Slide Feature Intro (30 Words/Slide)</span>
          </button>

          <button
            onClick={() => setShowApkModal(true)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-2xl bg-slate-900 hover:bg-slate-800 px-6 py-3.5 text-sm font-bold text-slate-200 border border-slate-800 transition-all"
          >
            <Smartphone className="h-4 w-4 text-emerald-400" />
            <span>Android APK Guide</span>
          </button>
        </div>

        {/* Feature badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs text-slate-300">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>10 Connected Services</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center space-x-2">
            <Lock className="h-4 w-4 text-amber-400" />
            <span>Zero Data Selling</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center space-x-2">
            <Globe className="h-4 w-4 text-cyan-400" />
            <span>Pidgin & Localized</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center space-x-2">
            <Smartphone className="h-4 w-4 text-purple-400" />
            <span>Offline-Resilient</span>
          </div>
        </div>
      </section>

      {/* Ten Solutions Showcase */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            10 Problems Solved in One Intelligent System
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            No need to juggle 10 disconnected apps. OmniAI harmonizes your health, study, career, business, and finances.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OMNI_SERVICES.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setCurrentPage(s.id)}
              className="cursor-pointer rounded-3xl bg-slate-900 p-6 border border-slate-800 hover:border-emerald-500/50 transition-all hover:bg-slate-900/80 group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">0{idx + 1}</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 font-semibold">{s.badge}</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {s.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{s.description}</p>
              <div className="pt-2 text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                <span>Explore tool</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fast CTA */}
      <section className="rounded-3xl bg-slate-900 p-8 sm:p-12 border border-slate-800 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white">Ready to experience OmniAI Nigeria?</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Start exploring immediately in guest mode or sign up to preserve your Naira budgets, CV summaries, and learning progress.
        </p>
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all shadow-lg shadow-emerald-950"
        >
          Launch Dashboard Now
        </button>
      </section>
    </div>
  );
};
