import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  History,
  Trash2,
  Download,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ModuleId } from '../types';

export const HistoryPage: React.FC = () => {
  const { chatMessages, setCurrentPage, sendChatMessage, clearChat } = useApp();
  const [filterModule, setFilterModule] = useState<string>('all');

  const exportChatHistory = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(chatMessages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `omniai_nigeria_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filtered = filterModule === 'all'
    ? chatMessages
    : chatMessages.filter((m) => m.module === filterModule);

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <div className="h-10 w-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center">
              <History className="h-5 w-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Conversation History & Saved Results</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Review and export queries across all 10 modules stored securely on your device.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={exportChatHistory}
            className="flex items-center space-x-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={clearChat}
            className="flex items-center space-x-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/50 px-3.5 py-2 text-xs font-semibold text-rose-300 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 divide-y divide-slate-800/80 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No saved conversations found for this filter.
          </div>
        ) : (
          filtered.map((msg) => (
            <div key={msg.id} className="p-4 sm:p-5 hover:bg-slate-950/40 transition-colors space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    msg.sender === 'user' ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {msg.sender === 'user' ? 'You' : 'OmniAI'}
                  </span>
                  {msg.module && (
                    <span className="text-[10px] text-slate-400 font-mono">[{msg.module}]</span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
