import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Bell,
  Globe,
  Smartphone,
  User,
  LogOut,
  Settings,
  Sparkles,
  ChevronDown,
  Check,
  X,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { LanguageMode } from '../types';

export const Header: React.FC = () => {
  const {
    user,
    logoutUser,
    setCurrentPage,
    language,
    setLanguage,
    notifications,
    markNotificationRead,
    setShowApkModal,
    setSearchModalOpen,
    setShowIntroModal,
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const languages: { code: LanguageMode; label: string; flag: string }[] = [
    { code: 'en', label: 'English (Default)', flag: '🇳🇬' },
    { code: 'pidgin', label: 'Nigerian Pidgin', flag: '🗣️' },
    { code: 'yoruba', label: 'Yorùbá (BETA)', flag: '🌿' },
    { code: 'hausa', label: 'Hausa (BETA)', flag: '☀️' },
    { code: 'igbo', label: 'Asụsụ Igbo (BETA)', flag: '🦅' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-950/40 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6">
        {/* Left: Brand & Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setCurrentPage('dashboard')}>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden ring-2 ring-purple-500/50 shadow-lg shadow-purple-950/60 group-hover:scale-105 transition-transform">
            <img
              src="/omni-logo.jpg"
              alt="Omni AI Logo"
              className="h-full w-full object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-tight text-white text-base sm:text-lg">
                Omni <span className="text-purple-400">AI</span>
              </span>
              <span className="rounded bg-purple-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-800/40">
                NG
              </span>
            </div>
            <p className="hidden sm:block text-[10px] text-purple-300/80 font-medium tracking-tight">
              Smarter • Stronger • Together
            </p>
          </div>
        </div>

        {/* Global Search Button */}
        <div className="flex-1 max-w-md mx-3 hidden md:block">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="w-full flex items-center justify-between rounded-xl bg-slate-900/90 px-3.5 py-2 text-xs text-slate-400 border border-slate-800 hover:border-emerald-600/50 hover:bg-slate-900 transition-all shadow-inner"
          >
            <span className="flex items-center space-x-2">
              <Search className="h-3.5 w-3.5 text-emerald-400" />
              <span>Search modules, JAMB math, scam checks, fuel calculators...</span>
            </span>
            <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 border border-slate-700">⌘K</kbd>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Mobile search trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Intro Tour Button */}
          <button
            onClick={() => setShowIntroModal(true)}
            className="flex items-center space-x-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900/70 px-2.5 py-1.5 text-xs font-medium text-purple-300 border border-purple-800/60 transition-colors shadow-sm"
            title="Watch 3-Slide Intro"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span className="hidden sm:inline">Intro Tour</span>
          </button>

          {/* Android APK / Install Button */}
          <button
            onClick={() => setShowApkModal(true)}
            className="flex items-center space-x-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 px-2.5 py-1.5 text-xs font-medium text-emerald-300 border border-emerald-800/60 transition-colors"
            title="Android APK & Installation Guide"
          >
            <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Android APK</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setNotifOpen(false);
                setProfileOpen(false);
              }}
              className="flex items-center space-x-1 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 border border-slate-800 hover:border-slate-700"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-400" />
              <span className="uppercase font-semibold">{language}</span>
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 p-1.5 shadow-2xl border border-slate-800 z-50">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 border-b border-slate-800 mb-1">
                  Language Preference
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition-colors ${
                      language === l.code ? 'bg-emerald-950/80 text-emerald-300 font-medium' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{l.flag} {l.label}</span>
                    {language === l.code && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setLangMenuOpen(false);
                setProfileOpen(false);
              }}
              className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 p-3 shadow-2xl border border-slate-800 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-white">Notifications & Alerts</span>
                    <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold">
                      Nigeria Real-time
                    </span>
                  </div>
                  <button onClick={() => setNotifOpen(false)} className="text-slate-500 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`cursor-pointer rounded-xl p-2.5 text-xs transition-colors ${
                        n.read ? 'bg-slate-950/50 text-slate-400' : 'bg-slate-800/80 text-slate-200 border-l-2 border-emerald-500'
                      }`}
                    >
                      <p className="font-medium">{n.title}</p>
                      <span className="mt-1 block text-[10px] text-slate-500">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Popover */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
                setLangMenuOpen(false);
              }}
              className="flex items-center space-x-2 rounded-full p-1 bg-slate-900 border border-slate-800 hover:border-emerald-500/50"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'N'}
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 p-2 shadow-2xl border border-slate-800 z-50">
                <div className="p-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-white">{user?.name || 'Nigerian User'}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email || 'guest@omniai.ng'}</p>
                  <div className="mt-1.5 flex items-center space-x-1.5">
                    <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[10px] text-emerald-400 font-semibold border border-emerald-800/50">
                      {user?.tier || 'Free Citizen'}
                    </span>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">
                      {user?.state || 'Lagos'}
                    </span>
                  </div>
                </div>

                <div className="py-1 space-y-0.5">
                  <button
                    onClick={() => {
                      setCurrentPage('profile');
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('subscription');
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <CreditCard className="h-3.5 w-3.5 text-amber-400" />
                    <span>Subscription & Plans</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('settings');
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <Settings className="h-3.5 w-3.5 text-slate-400" />
                    <span>Settings & Privacy</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('help');
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Help, Emergency & APK</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      logoutUser();
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-950/40"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
