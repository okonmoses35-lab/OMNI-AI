import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
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
  Layers,
  ChevronRight
} from 'lucide-react';

interface SlideData {
  id: number;
  badge: string;
  tagline: string;
  title: string;
  text: string;
  modules: string[];
}

// Exactly 30 words per slide as strictly requested
export const INTRO_SLIDES: SlideData[] = [
  {
    id: 1,
    badge: 'Core Services • 30 Words',
    tagline: 'Healthcare, Education, Careers & Transit',
    title: 'Everyday Intelligence & Learning',
    text: 'Welcome to Omni AI Nigeria. Experience unified intelligence combining ten solutions. Receive cautious medical symptom guidance, prepare for JAMB examinations, optimize your professional resume, and calculate accurate commute fuel budgets.',
    modules: ['OmniHealth', 'OmniLearn', 'OmniCareer', 'OmniMove'],
  },
  {
    id: 2,
    badge: 'Security & Assets • 30 Words',
    tagline: 'Cyber Scam Shield, Naira Finance & Energy',
    title: 'Protection, Budgets & Power Cost',
    text: 'Protect yourself with advanced cyber scam detection inspecting suspicious messages. Track personal Naira expenses, manage household monthly budgets, calculate DisCo electricity tariffs, and compare generator fuel costs against solar inverters.',
    modules: ['OmniShield', 'OmniFinance', 'OmniPower'],
  },
  {
    id: 3,
    badge: 'Commerce & Truth • 30 Words',
    tagline: 'SME Sales, Recycling & Fact Verification',
    title: 'SME Growth, Environment & Truth',
    text: 'Grow your enterprise using automated WhatsApp marketing and inventory management. Discover verified local recycling scrap buyback hubs, while evaluating viral news claims through comprehensive media fact checking to stop misinformation.',
    modules: ['OmniBusiness', 'OmniWaste', 'OmniVerify'],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const IntroSlidesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex]);

  if (!isOpen) return null;

  const currentSlide = INTRO_SLIDES[currentSlideIndex];
  const wordCount = currentSlide.text.trim().split(/\s+/).length;

  const handleNext = () => {
    if (currentSlideIndex < INTRO_SLIDES.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('omni_intro_seen', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-950 border border-purple-900/50 shadow-2xl overflow-hidden my-auto">
        {/* Background glow effects matching the new logo */}
        <div className="absolute top-0 right-1/4 -mt-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 border-b border-purple-950/40">
          <div className="flex items-center space-x-2.5">
            <img
              src="/omni-logo.jpg"
              alt="Omni AI Logo"
              className="h-9 w-9 rounded-xl object-cover ring-2 ring-purple-500/40 shadow-lg shadow-purple-950"
            />
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight flex items-center space-x-1">
                <span>Omni</span>
                <span className="text-purple-400">AI</span>
              </span>
              <span className="text-[10px] text-purple-300 font-mono tracking-wider block -mt-0.5">
                SMARTER • STRONGER • TOGETHER
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-purple-950/80 px-2.5 py-0.5 text-[11px] font-mono text-purple-300 border border-purple-800/60">
              Slide {currentSlideIndex + 1} of 3
            </span>
            <button
              onClick={handleComplete}
              className="p-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Close Intro"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Content Carousel */}
        <div className="relative z-10 p-6 sm:p-8 space-y-6">
          {/* Logo Showcase Banner */}
          <div className="flex flex-col items-center text-center">
            <div className="relative group mb-3">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-60 blur-lg group-hover:opacity-100 transition duration-500" />
              <img
                src="/omni-logo.jpg"
                alt="Omni AI Branded Logo"
                className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover shadow-2xl border-2 border-purple-400/60"
              />
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
              {currentSlide.title}
            </h2>
            <p className="text-xs text-purple-400 font-semibold mt-0.5">
              {currentSlide.tagline}
            </p>
          </div>

          {/* Slide Description - Exactly 30 words */}
          <div className="rounded-2xl bg-slate-900/90 border border-purple-900/40 p-4 sm:p-5 relative shadow-inner">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-950/40 text-[10px] text-purple-300">
              <span className="font-semibold">{currentSlide.badge}</span>
              <span className="font-mono bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                Word Count: {wordCount} words
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              "{currentSlide.text}"
            </p>

            {/* Modules Highlight */}
            <div className="mt-3.5 pt-3 border-t border-purple-950/40 flex flex-wrap gap-1.5">
              <span className="text-[10px] text-slate-400 mr-1 self-center">Integrated Features:</span>
              {currentSlide.modules.map((m, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-purple-950/70 border border-purple-800/60 px-2 py-0.5 text-[10px] font-semibold text-purple-300"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center space-x-2 pt-2">
            {INTRO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlideIndex === idx
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-indigo-500'
                    : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="relative z-10 bg-slate-900/70 p-4 sm:p-6 border-t border-purple-950/40 flex items-center justify-between">
          {currentSlideIndex > 0 ? (
            <button
              onClick={handlePrev}
              className="flex items-center space-x-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Skip Intro
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-5 py-2.5 text-xs transition-all shadow-lg shadow-purple-950 active:scale-98"
          >
            <span>
              {currentSlideIndex === INTRO_SLIDES.length - 1 ? 'Enter Omni AI Platform' : 'Next Feature'}
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
