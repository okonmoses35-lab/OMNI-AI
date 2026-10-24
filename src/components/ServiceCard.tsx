import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceDefinition } from '../types';
import {
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
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface Props {
  service: ServiceDefinition;
  index: number;
}

export const ServiceCard: React.FC<Props> = ({ service, index }) => {
  const { setCurrentPage, sendChatMessage } = useApp();

  const getIcon = (name: string) => {
    switch (name) {
      case 'HeartPulse':
        return <HeartPulse className="h-6 w-6 text-emerald-400" />;
      case 'GraduationCap':
        return <GraduationCap className="h-6 w-6 text-amber-400" />;
      case 'Briefcase':
        return <Briefcase className="h-6 w-6 text-blue-400" />;
      case 'Compass':
        return <Compass className="h-6 w-6 text-purple-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="h-6 w-6 text-rose-400" />;
      case 'Wallet':
        return <Wallet className="h-6 w-6 text-emerald-400" />;
      case 'Zap':
        return <Zap className="h-6 w-6 text-amber-300" />;
      case 'Store':
        return <Store className="h-6 w-6 text-cyan-400" />;
      case 'Recycle':
        return <Recycle className="h-6 w-6 text-lime-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="h-6 w-6 text-violet-400" />;
      default:
        return <Sparkles className="h-6 w-6 text-emerald-400" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-slate-900/80 p-5 sm:p-6 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-200">
      <div>
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 border border-slate-800 shadow-inner group-hover:scale-105 transition-transform">
              {getIcon(service.iconName)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono text-emerald-500/80 font-bold">
                  0{index + 1}
                </span>
                <span className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                  {service.badge}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                {service.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Tagline & Description */}
        <p className="text-xs font-semibold text-emerald-400/90 mb-2">
          {service.tagline}
        </p>
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Sample prompt chip */}
        <div className="mb-5 pt-3 border-t border-slate-800/60">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
            Quick AI Prompt:
          </span>
          <button
            onClick={() => {
              sendChatMessage(service.sampleQuestions[0], service.id);
              setCurrentPage('chat');
            }}
            className="w-full text-left rounded-xl bg-slate-950/70 hover:bg-emerald-950/40 p-2.5 text-[11px] text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-800/50 transition-all flex items-center justify-between"
          >
            <span className="truncate italic">"{service.sampleQuestions[0]}"</span>
            <MessageSquare className="h-3 w-3 text-emerald-400 flex-shrink-0 ml-1.5" />
          </button>
        </div>
      </div>

      {/* Action button */}
      <div className="pt-2">
        <button
          onClick={() => setCurrentPage(service.id)}
          className="w-full flex items-center justify-center space-x-2 rounded-xl bg-slate-950 hover:bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white border border-slate-800 hover:border-emerald-500 transition-all shadow-md group-hover:border-emerald-500/30"
        >
          <span>Open {service.name}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
