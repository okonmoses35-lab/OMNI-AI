import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Sparkles,
  Mic,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
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
  ExternalLink,
  Volume2
} from 'lucide-react';
import { ModuleId } from '../types';

export const CentralChatPage: React.FC = () => {
  const {
    chatMessages,
    sendChatMessage,
    isTyping,
    clearChat,
    setCurrentPage,
    setActiveModule,
    language,
    setLanguage
  } = useApp();

  const [input, setInput] = useState('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<ModuleId | 'all'>('all');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendChatMessage(input, selectedModuleFilter !== 'all' ? selectedModuleFilter : undefined);
    setInput('');
  };

  const handleVoice = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const Speech = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new Speech();
      rec.lang = 'en-NG';
      rec.start();
      setIsListening(true);
      rec.onresult = (evt: any) => {
        const text = evt.results[0][0].transcript;
        setInput(text);
        setIsListening(false);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
    } else {
      setInput('Is this message asking for my bank BVN a scam?');
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 200));
      utterance.lang = 'en-NG';
      window.speechSynthesis.speak(utterance);
    }
  };

  const getModuleBadge = (mod?: ModuleId | string) => {
    switch (mod) {
      case 'omni_health':
      case 'OmniHealth':
        return { label: 'OmniHealth', color: 'bg-emerald-950 text-emerald-400 border-emerald-800', page: 'omni_health' as const, icon: <HeartPulse className="h-3 w-3" /> };
      case 'omni_learn':
      case 'OmniLearn':
        return { label: 'OmniLearn', color: 'bg-amber-950 text-amber-400 border-amber-800', page: 'omni_learn' as const, icon: <GraduationCap className="h-3 w-3" /> };
      case 'omni_career':
      case 'OmniCareer':
        return { label: 'OmniCareer', color: 'bg-blue-950 text-blue-400 border-blue-800', page: 'omni_career' as const, icon: <Briefcase className="h-3 w-3" /> };
      case 'omni_move':
      case 'OmniMove':
        return { label: 'OmniMove', color: 'bg-purple-950 text-purple-400 border-purple-800', page: 'omni_move' as const, icon: <Compass className="h-3 w-3" /> };
      case 'omni_shield':
      case 'OmniShield':
        return { label: 'OmniShield', color: 'bg-rose-950 text-rose-400 border-rose-800', page: 'omni_shield' as const, icon: <ShieldAlert className="h-3 w-3" /> };
      case 'omni_finance':
      case 'OmniFinance':
        return { label: 'OmniFinance', color: 'bg-green-950 text-green-400 border-green-800', page: 'omni_finance' as const, icon: <Wallet className="h-3 w-3" /> };
      case 'omni_power':
      case 'OmniPower':
        return { label: 'OmniPower', color: 'bg-amber-950 text-amber-300 border-amber-800', page: 'omni_power' as const, icon: <Zap className="h-3 w-3" /> };
      case 'omni_business':
      case 'OmniBusiness':
        return { label: 'OmniBusiness', color: 'bg-cyan-950 text-cyan-400 border-cyan-800', page: 'omni_business' as const, icon: <Store className="h-3 w-3" /> };
      case 'omni_waste':
      case 'OmniWaste':
        return { label: 'OmniWaste', color: 'bg-lime-950 text-lime-400 border-lime-800', page: 'omni_waste' as const, icon: <Recycle className="h-3 w-3" /> };
      case 'omni_verify':
      case 'OmniVerify':
        return { label: 'OmniVerify', color: 'bg-violet-950 text-violet-400 border-violet-800', page: 'omni_verify' as const, icon: <CheckCircle2 className="h-3 w-3" /> };
      default:
        return { label: 'OmniCentral Multi-Router', color: 'bg-slate-800 text-slate-300 border-slate-700', page: 'dashboard' as const, icon: <Sparkles className="h-3 w-3 text-emerald-400" /> };
    }
  };

  const sampleShortcuts = [
    { text: 'Help me prepare for JAMB Mathematics', mod: 'omni_learn' as const },
    { text: 'Check if this message is a scam', mod: 'omni_shield' as const },
    { text: 'Help me manage my monthly Naira budget', mod: 'omni_finance' as const },
    { text: 'How can my shop reduce generator electricity costs?', mod: 'omni_power' as const },
    { text: 'Verify this viral WhatsApp news story', mod: 'omni_verify' as const },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] lg:h-[calc(100vh-7rem)] max-w-5xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3 sm:px-6">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-950">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm sm:text-base font-bold text-white">Central AI Assistant</h2>
              <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-800">
                10 Solutions Connected
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Intelligently classifies and coordinates Nigerian modules</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Pidgin toggle */}
          <button
            onClick={() => setLanguage(language === 'pidgin' ? 'en' : 'pidgin')}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all ${
              language === 'pidgin'
                ? 'bg-amber-950/80 text-amber-300 border-amber-700/80'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {language === 'pidgin' ? '🗣️ Pidgin Active' : '🗣️ Pidgin Mode'}
          </button>

          <button
            onClick={clearChat}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            title="Reset Conversation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          const badge = getModuleBadge(msg.module);

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-[90%] sm:max-w-[80%] text-xs sm:text-sm shadow-md ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-950 text-slate-100 rounded-bl-none border border-slate-800'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                    <div className="flex items-center space-x-1.5">
                      <span className={`inline-flex items-center space-x-1 rounded-md px-2 py-0.5 text-[10px] font-semibold border ${badge.color}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => speakText(msg.text)}
                      className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                      title="Read aloud"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                {/* Safety / Verification Disclaimer */}
                {msg.disclaimer && (
                  <div className="mt-2.5 rounded-xl bg-slate-900/90 p-2.5 text-[11px] text-amber-300/90 border border-amber-900/40">
                    {msg.disclaimer}
                  </div>
                )}

                {/* Module Action Tips & Jump-in Button */}
                {msg.actionTips && msg.actionTips.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Recommended Next Actions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.actionTips.map((tip, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            sendChatMessage(tip);
                          }}
                          className="rounded-lg bg-slate-900 hover:bg-emerald-950 px-2 py-1 text-[11px] text-emerald-300 border border-slate-800 hover:border-emerald-700/60 transition-all text-left"
                        >
                          → {tip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!isUser && badge.page !== 'dashboard' && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex justify-end">
                    <button
                      onClick={() => {
                        setActiveModule(badge.page as ModuleId);
                        setCurrentPage(badge.page);
                      }}
                      className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
                    >
                      <span>Open dedicated {badge.label} tools</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                )}

                <span className={`block text-[10px] mt-1.5 ${isUser ? 'text-emerald-200 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 rounded-2xl bg-slate-950 p-3 max-w-xs border border-slate-800 text-slate-400 text-xs">
            <Sparkles className="h-4 w-4 text-emerald-400 animate-spin" />
            <span>OmniAI is reasoning across Nigerian modules...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested shortcuts */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-2 overflow-x-auto scrollbar-none flex space-x-2">
        {sampleShortcuts.map((s, idx) => (
          <button
            key={idx}
            onClick={() => sendChatMessage(s.text, s.mod)}
            className="whitespace-nowrap rounded-full bg-slate-900 hover:bg-slate-800 px-3 py-1 text-[11px] text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center space-x-1"
          >
            <span>{s.text}</span>
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
        <div className="flex items-center space-x-2 rounded-2xl bg-slate-900 px-3 py-1.5 border border-slate-800 focus-within:border-emerald-500/60">
          <button
            type="button"
            onClick={handleVoice}
            className={`p-2 rounded-xl transition-colors ${
              isListening ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'text-slate-400 hover:text-emerald-400'
            }`}
            title="Voice input"
          >
            <Mic className="h-4 w-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              language === 'pidgin'
                ? 'Wetin you wan make I help you do today? Type am here...'
                : 'Ask anything across health, exams, CV, traffic, scam shield, Naira, energy...'
            }
            className="flex-1 bg-transparent py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-all shadow-md"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
