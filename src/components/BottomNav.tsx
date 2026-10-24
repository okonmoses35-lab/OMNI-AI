import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  MessageSquare,
  Grid,
  Wallet,
  User,
  X,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Compass,
  ShieldAlert,
  Zap,
  Store,
  Recycle,
  CheckCircle2
} from 'lucide-react';
import { PageId } from '../types';

export const BottomNav: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();
  const [modulesModalOpen, setModulesModalOpen] = useState(false);

  const modulesList: { id: PageId; name: string; icon: React.ReactNode; color: string }[] = [
    { id: 'omni_health', name: 'OmniHealth', icon: <HeartPulse className="h-5 w-5" />, color: 'bg-emerald-950 text-emerald-400 border-emerald-800' },
    { id: 'omni_learn', name: 'OmniLearn', icon: <GraduationCap className="h-5 w-5" />, color: 'bg-amber-950 text-amber-400 border-amber-800' },
    { id: 'omni_career', name: 'OmniCareer', icon: <Briefcase className="h-5 w-5" />, color: 'bg-blue-950 text-blue-400 border-blue-800' },
    { id: 'omni_move', name: 'OmniMove', icon: <Compass className="h-5 w-5" />, color: 'bg-purple-950 text-purple-400 border-purple-800' },
    { id: 'omni_shield', name: 'OmniShield', icon: <ShieldAlert className="h-5 w-5" />, color: 'bg-rose-950 text-rose-400 border-rose-800' },
    { id: 'omni_finance', name: 'OmniFinance', icon: <Wallet className="h-5 w-5" />, color: 'bg-emerald-950 text-emerald-400 border-emerald-800' },
    { id: 'omni_power', name: 'OmniPower', icon: <Zap className="h-5 w-5" />, color: 'bg-amber-950 text-amber-300 border-amber-800' },
    { id: 'omni_business', name: 'OmniBusiness', icon: <Store className="h-5 w-5" />, color: 'bg-cyan-950 text-cyan-400 border-cyan-800' },
    { id: 'omni_waste', name: 'OmniWaste', icon: <Recycle className="h-5 w-5" />, color: 'bg-lime-950 text-lime-400 border-lime-800' },
    { id: 'omni_verify', name: 'OmniVerify', icon: <CheckCircle2 className="h-5 w-5" />, color: 'bg-violet-950 text-violet-400 border-violet-800' },
  ];

  return (
    <>
      {/* Mobile Modules Sheet Modal */}
      {modulesModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm lg:hidden">
          <div className="rounded-t-3xl bg-slate-900 border-t border-slate-800 p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-white text-base">All 10 OmniAI Modules</h3>
                <p className="text-xs text-slate-400">Integrated solutions for Nigerian everyday life</p>
              </div>
              <button
                onClick={() => setModulesModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {modulesList.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setCurrentPage(m.id);
                    setModulesModalOpen(false);
                  }}
                  className="flex items-center space-x-3 rounded-2xl bg-slate-950/70 p-3 text-left border border-slate-800/80 hover:border-emerald-500/50 transition-all active:scale-98"
                >
                  <div className={`p-2 rounded-xl border ${m.color}`}>
                    {m.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{m.name}</span>
                    <span className="text-[10px] text-slate-400">Tap to open</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-lg px-2 py-1.5 safe-bottom">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              currentPage === 'dashboard' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="h-5 w-5 mb-0.5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => setCurrentPage('chat')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all relative ${
              currentPage === 'chat' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <MessageSquare className="h-5 w-5 mb-0.5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[10px]">AI Chat</span>
          </button>

          {/* Center Modules Grid Opener */}
          <button
            onClick={() => setModulesModalOpen(true)}
            className="flex flex-col items-center justify-center -mt-4"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-900/50 border-2 border-slate-950 text-white active:scale-95 transition-transform">
              <Grid className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-medium text-emerald-400 mt-0.5">10 Modules</span>
          </button>

          <button
            onClick={() => setCurrentPage('omni_finance')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              currentPage === 'omni_finance' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wallet className="h-5 w-5 mb-0.5" />
            <span className="text-[10px]">Finance ₦</span>
          </button>

          <button
            onClick={() => setCurrentPage('profile')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              currentPage === 'profile' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="h-5 w-5 mb-0.5" />
            <span className="text-[10px]">Profile</span>
          </button>
        </div>
      </nav>
    </>
  );
};
