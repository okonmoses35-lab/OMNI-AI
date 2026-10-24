import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Shield,
  Trash2,
  Moon,
  Sun,
  Database,
  Smartphone,
  HardDrive,
  Check,
  AlertTriangle
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme, logoutUser, setShowApkModal } = useApp();
  const [offlineCacheEnabled, setOfflineCacheEnabled] = useState(true);
  const [clearNotice, setClearNotice] = useState(false);

  const handleClearLocalData = () => {
    localStorage.removeItem('omni_expenses');
    localStorage.removeItem('omni_inventory');
    localStorage.removeItem('omni_user');
    setClearNotice(true);
    setTimeout(() => {
      setClearNotice(false);
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-16 max-w-3xl mx-auto">
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
          <div className="h-10 w-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Settings & Data Privacy</h1>
            <p className="text-xs text-slate-400">Manage device storage, local cache & data retention</p>
          </div>
        </div>

        {clearNotice && (
          <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-800 text-xs text-amber-300 text-center">
            Local data reset! Reloading application...
          </div>
        )}

        <div className="space-y-4 text-xs">
          {/* Theme Selection */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-bold text-white block">Theme Aesthetics</span>
              <span className="text-slate-400 text-[11px]">Optimized for dark OLED screens and battery longevity</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-xl flex items-center space-x-1.5 ${
                  theme === 'dark' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-400'
                }`}
              >
                <Moon className="h-4 w-4" />
                <span>Dark Navy</span>
              </button>
            </div>
          </div>

          {/* Low Bandwidth & Offline Cache */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-bold text-white block">Offline Caching & Low-Bandwidth Mode</span>
              <span className="text-slate-400 text-[11px]">
                Preload Nigerian knowledge base and calculators for zero-data usage
              </span>
            </div>
            <button
              onClick={() => setOfflineCacheEnabled(!offlineCacheEnabled)}
              className={`px-3 py-1.5 rounded-xl font-bold ${
                offlineCacheEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {offlineCacheEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Android Packaging */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-bold text-white block">Android APK / PWA Manifest</span>
              <span className="text-slate-400 text-[11px]">
                Review Capacitor commands, signing keys, and APK packaging
              </span>
            </div>
            <button
              onClick={() => setShowApkModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold"
            >
              APK Setup Guide
            </button>
          </div>

          {/* Privacy & Account Deletion */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
            <div>
              <span className="font-bold text-rose-300 block">Clear Local Storage & Delete Cache</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Permanently wipes all local conversation logs, stored Naira expenses, and inventory items from this browser/device.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleClearLocalData}
                className="flex items-center space-x-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 text-xs transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete All Local Data</span>
              </button>
              <button
                onClick={logoutUser}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 px-4 py-2 text-xs font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
