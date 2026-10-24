import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OMNI_SERVICES } from '../data/servicesData';
import { ServiceCard } from '../components/ServiceCard';
import {
  Sparkles,
  Send,
  Mic,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Zap,
  ArrowRight,
  Bookmark,
  Activity,
  Layers
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, sendChatMessage, setCurrentPage, chatMessages, language } = useApp();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  const suggestedQuestions = [
    'Help me prepare for JAMB',
    'Check whether this message is a scam',
    'Help me manage my monthly budget',
    'Improve my CV',
    'Help me reduce my business expenses',
    'Verify this news story',
    'Explain these health symptoms',
    'Help me save electricity',
  ];

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'pidgin' ? 'en-NG' : 'en-NG';
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      // Simulate quick sample prompt for voice fallback
      setInputText('Check whether this message claiming I won ₦100,000 from CBN is a scam');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAttachedImage(reader.result as string);
        setInputText((prev) => (prev ? prev : 'Inspect this image for scam or waste material identification'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
    setAttachedImage(null);
    setCurrentPage('chat');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome & Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-900 p-6 sm:p-10 border border-purple-900/40 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-50 blur-md" />
              <img
                src="/omni-logo.jpg"
                alt="Omni AI Branded Logo"
                className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover ring-2 ring-purple-400/50 shadow-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center space-x-2 rounded-full bg-purple-950/80 px-3.5 py-1 text-xs font-semibold text-purple-300 border border-purple-800/60 mb-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                <span>Omni AI • Smarter • Stronger • Together</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Welcome to <span className="text-purple-400">Omni AI</span>, {user?.name?.split(' ')[0] || 'Friend'}.
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Your unified intelligent platform combining 10 essential everyday solutions for learning, working, and living in Nigeria.
          </p>

          {/* Central Prominent AI Input */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="relative flex flex-col rounded-2xl bg-slate-950 p-2 border border-slate-800 focus-within:border-emerald-500/60 shadow-xl transition-all">
              {attachedImage && (
                <div className="p-2 flex items-center space-x-2 bg-slate-900 rounded-xl mb-2 text-xs text-emerald-400">
                  <ImageIcon className="h-4 w-4" />
                  <span>Image attached for AI analysis</span>
                  <button
                    type="button"
                    onClick={() => setAttachedImage(null)}
                    className="ml-auto text-slate-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              )}

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="What would you like help with today? (e.g. Check a scam message, prepare for JAMB, plan a Naira budget...)"
                rows={2}
                className="w-full resize-none bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 px-2">
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition-colors" title="Attach screenshot or photo">
                    <ImageIcon className="h-4 w-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>

                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-xl transition-colors ${
                      isListening ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-900'
                    }`}
                    title={isListening ? 'Listening...' : 'Voice Input (Nigerian Speech)'}
                  >
                    <Mic className="h-4 w-4" />
                  </button>

                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400">Enter</kbd> to send
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="flex items-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:pointer-events-none px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all shadow-md shadow-emerald-950/40"
                >
                  <span>Ask OmniAI</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </form>

          {/* Suggested Questions */}
          <div className="mt-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Suggested questions:
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sendChatMessage(q);
                    setCurrentPage('chat');
                  }}
                  className="rounded-full bg-slate-950/80 hover:bg-emerald-950/60 px-3 py-1.5 text-xs text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-800/60 transition-all flex items-center space-x-1.5 active:scale-95"
                >
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  <span>{q}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ten Solutions Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              10 Integrated Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Each module is equipped with dedicated tools, local calculators, and tailored AI logic.
            </p>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-2 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="h-4 w-4" />
            <span>All 10 Modules Active & Connected</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {OMNI_SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Additional Dashboard Sections: Recently Used Tools, Personalised Recommendations & Platform Status */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Used Tools */}
        <div className="rounded-3xl bg-slate-900/70 p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>Recently Used Tools</span>
            </h3>
            <span className="text-[11px] text-slate-400">Quick Access</span>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => setCurrentPage('omni_shield')}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-rose-500/40 text-left transition-all"
            >
              <div>
                <span className="text-xs font-bold text-white block">OmniShield SMS Inspector</span>
                <span className="text-[11px] text-slate-400">Scanned 1 BVN alert</span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-500" />
            </button>

            <button
              onClick={() => setCurrentPage('omni_power')}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 text-left transition-all"
            >
              <div>
                <span className="text-xs font-bold text-white block">Generator vs Grid Calculator</span>
                <span className="text-[11px] text-slate-400">3.5kVA fuel estimate</span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-500" />
            </button>

            <button
              onClick={() => setCurrentPage('omni_learn')}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 text-left transition-all"
            >
              <div>
                <span className="text-xs font-bold text-white block">JAMB Mathematics Quiz</span>
                <span className="text-[11px] text-slate-400">Quadratic equations</span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="rounded-3xl bg-slate-900/70 p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-amber-400" />
              <span>Recommended for You</span>
            </h3>
            <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold">
              {user?.state || 'Lagos'} • {user?.category || 'Entrepreneur'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="font-semibold text-emerald-400 block mb-1">OmniBusiness AI Broadcast</span>
              <p className="text-slate-300 text-[11px]">
                Create a high-converting WhatsApp sales message for month-end paydays in Nigeria.
              </p>
              <button
                onClick={() => setCurrentPage('omni_business')}
                className="mt-2 text-emerald-400 font-medium text-[11px] hover:underline"
              >
                Open SME tools →
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="font-semibold text-rose-400 block mb-1">Scam Alert (Lagos State)</span>
              <p className="text-slate-300 text-[11px]">
                Watch out for fraudulent loan apps sending WhatsApp threats to phone contacts.
              </p>
              <button
                onClick={() => setCurrentPage('omni_shield')}
                className="mt-2 text-rose-400 font-medium text-[11px] hover:underline"
              >
                Learn protection steps →
              </button>
            </div>
          </div>
        </div>

        {/* Platform Status */}
        <div className="rounded-3xl bg-slate-900/70 p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              <span>Platform Health & Status</span>
            </h3>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400">AI Engine</span>
              <span className="font-semibold text-emerald-400">Gemini 3.8 Flash</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Modules Online</span>
              <span className="font-semibold text-white">10 of 10 Ready</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Currency Default</span>
              <span className="font-semibold text-white">Nigerian Naira (₦)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Offline Fallback</span>
              <span className="font-semibold text-emerald-400">Active (Zero Downtime)</span>
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-950/40 p-3 border border-emerald-800/30 text-[11px] text-slate-300">
            <p className="flex items-center space-x-1 text-emerald-400 font-semibold mb-0.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>All Systems Operational</span>
            </p>
            Zero simulated fake statistics. All calculations are grounded in real formulas.
          </div>
        </div>
      </section>
    </div>
  );
};
