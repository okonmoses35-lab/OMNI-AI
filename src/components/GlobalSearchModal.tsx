import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { OMNI_SERVICES } from '../data/servicesData';
import { Search, X, ArrowRight, Sparkles, BookOpen, ShieldAlert, HeartPulse, Wallet, Zap, Store } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, setCurrentPage, sendChatMessage } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchModalOpen]);

  if (!searchModalOpen) return null;

  const filteredServices = OMNI_SERVICES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const quickPrompts = [
    { text: 'Check if this BVN message is a scam', module: 'omni_shield' as const },
    { text: 'Help me prepare for JAMB Mathematics', module: 'omni_learn' as const },
    { text: 'Calculate 3.5kVA generator fuel cost vs grid', module: 'omni_power' as const },
    { text: 'Create a monthly budget from ₦250k salary', module: 'omni_finance' as const },
    { text: 'Generate WhatsApp promo copy for fashion items', module: 'omni_business' as const },
    { text: 'Fever and chills symptom guidance', module: 'omni_health' as const },
  ].filter((p) => p.text.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 pt-16 sm:pt-24">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3 border-b border-slate-800">
          <Search className="h-5 w-5 text-emerald-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search OmniAI Nigeria modules, tools, questions..."
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setSearchModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Filtered Modules */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              OmniAI Modules ({filteredServices.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredServices.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => {
                    setCurrentPage(srv.id);
                    setSearchModalOpen(false);
                  }}
                  className="cursor-pointer p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-950 transition-all group flex items-start justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {srv.name}
                    </span>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{srv.tagline}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Prompts */}
          {quickPrompts.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Ask OmniAI Assistant Directly
              </h4>
              <div className="space-y-1.5">
                {quickPrompts.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      sendChatMessage(p.text, p.module);
                      setCurrentPage('chat');
                      setSearchModalOpen(false);
                    }}
                    className="cursor-pointer flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-all"
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>{p.text}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Ask AI →</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-950 px-4 py-2 text-[11px] text-slate-400 border-t border-slate-800 flex justify-between">
          <span>Use <strong>ESC</strong> to close</span>
          <span>OmniAI Nigeria Knowledge Base</span>
        </div>
      </div>
    </div>
  );
};
