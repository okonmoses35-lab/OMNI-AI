import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  MessageSquare,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Compass,
  ShieldAlert,
  Wallet,
  Zap,
  Store,
  Recycle,
  CheckCircle2,
  History,
  User,
  Settings,
  CreditCard,
  Sparkles,
  Smartphone,
  HelpCircle
} from 'lucide-react';
import { PageId } from '../types';

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, setShowApkModal, setShowIntroModal } = useApp();

  const navItems: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'chat', label: 'Central AI Assistant', icon: <MessageSquare className="h-4 w-4 text-emerald-400" /> },
  ];

  const moduleItems: { id: PageId; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'omni_health', label: '1. OmniHealth', icon: <HeartPulse className="h-4 w-4" />, color: 'text-emerald-400' },
    { id: 'omni_learn', label: '2. OmniLearn', icon: <GraduationCap className="h-4 w-4" />, color: 'text-amber-400' },
    { id: 'omni_career', label: '3. OmniCareer', icon: <Briefcase className="h-4 w-4" />, color: 'text-blue-400' },
    { id: 'omni_move', label: '4. OmniMove', icon: <Compass className="h-4 w-4" />, color: 'text-purple-400' },
    { id: 'omni_shield', label: '5. OmniShield', icon: <ShieldAlert className="h-4 w-4" />, color: 'text-rose-400' },
    { id: 'omni_finance', label: '6. OmniFinance', icon: <Wallet className="h-4 w-4" />, color: 'text-green-400' },
    { id: 'omni_power', label: '7. OmniPower', icon: <Zap className="h-4 w-4" />, color: 'text-amber-300' },
    { id: 'omni_business', label: '8. OmniBusiness', icon: <Store className="h-4 w-4" />, color: 'text-cyan-400' },
    { id: 'omni_waste', label: '9. OmniWaste', icon: <Recycle className="h-4 w-4" />, color: 'text-lime-400' },
    { id: 'omni_verify', label: '10. OmniVerify', icon: <CheckCircle2 className="h-4 w-4" />, color: 'text-violet-400' },
  ];

  const utilityItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'history', label: 'Conversations & Saved', icon: <History className="h-4 w-4 text-slate-400" /> },
    { id: 'subscription', label: 'Subscription Plans', icon: <CreditCard className="h-4 w-4 text-amber-400" /> },
    { id: 'profile', label: 'Profile & State', icon: <User className="h-4 w-4 text-slate-400" /> },
    { id: 'settings', label: 'Settings & Privacy', icon: <Settings className="h-4 w-4 text-slate-400" /> },
    { id: 'help', label: 'Help, FAQ & Emergency', icon: <HelpCircle className="h-4 w-4 text-cyan-400" /> },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-900 bg-slate-950/70 p-4 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto scrollbar-thin">
      {/* Primary navigation */}
      <div className="space-y-1 mb-5">
        <p className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Navigation
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              currentPage === item.id
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60 shadow-sm'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.id === 'chat' && (
              <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 text-[9px] font-bold">
                CORE
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 10 Modules List */}
      <div className="space-y-1 mb-5">
        <div className="flex items-center justify-between px-2.5 mb-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            10 Dedicated Modules
          </p>
          <span className="rounded bg-slate-900 px-1.5 py-0.2 text-[9px] text-slate-400 font-mono">
            10/10
          </span>
        </div>

        {moduleItems.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setCurrentPage(mod.id)}
            className={`w-full flex items-center space-x-2.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              currentPage === mod.id
                ? 'bg-slate-900 text-white border border-slate-700 shadow-sm'
                : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
            }`}
          >
            <span className={mod.color}>{mod.icon}</span>
            <span className="truncate">{mod.label}</span>
          </button>
        ))}
      </div>

      {/* Utilities */}
      <div className="space-y-1 mb-4">
        <p className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Account & Resources
        </p>
        {utilityItems.map((u) => (
          <button
            key={u.id}
            onClick={() => setCurrentPage(u.id)}
            className={`w-full flex items-center space-x-2.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              currentPage === u.id
                ? 'bg-slate-900 text-white border border-slate-700'
                : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
            }`}
          >
            {u.icon}
            <span>{u.label}</span>
          </button>
        ))}
      </div>

      {/* Intro Tour Banner */}
      <div className="mt-auto pt-3 border-t border-purple-950/40 space-y-2">
        <button
          onClick={() => setShowIntroModal(true)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-800/50 text-purple-300 transition-all text-xs font-semibold group"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-purple-400 group-hover:rotate-12 transition-transform" />
            <span>3-Slide Feature Intro</span>
          </div>
          <span className="text-[10px] font-mono bg-purple-900/80 px-1.5 py-0.5 rounded text-purple-200">
            Play
          </span>
        </button>

        {/* APK Banner */}
        <div
          onClick={() => setShowApkModal(true)}
          className="cursor-pointer rounded-xl bg-gradient-to-br from-emerald-950/60 to-slate-900 p-3 border border-emerald-900/40 hover:border-emerald-700/60 transition-all group"
        >
          <div className="flex items-center space-x-2 text-emerald-400 mb-1">
            <Smartphone className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Android APK Ready</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Run on any Android smartphone via Capacitor or PWA install.
          </p>
        </div>
      </div>
    </aside>
  );
};
