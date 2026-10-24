import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Smartphone,
  Terminal,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';

export const AndroidApkModal: React.FC = () => {
  const { showApkModal, setShowApkModal } = useApp();
  const [activeTab, setActiveTab] = useState<'pwa' | 'apk' | 'api' | 'firebase'>('apk');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!showApkModal) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const capacitorCommands = `# 1. Install Capacitor dependencies
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Initialize Capacitor with your app name and package ID
npx cap init "OmniAI Nigeria" com.omniai.nigeria --web-dir dist

# 3. Build production web bundle
npm run build

# 4. Add the Android platform
npx cap add android

# 5. Sync the web bundle into the Android native directory
npx cap sync android

# 6. Open in Android Studio to build APK or AAB
npx cap open android
# Inside Android Studio: Click Build > Build Bundle(s) / APK(s) > Build APK(s)`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-emerald-900/40 shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">Android App & APK Packaging Guide</h2>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/30">
                  Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Two ways to run OmniAI Nigeria on your Android phone: Instant PWA or Native APK with Capacitor.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowApkModal(false)}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-800 px-5 pt-3 space-x-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('apk')}
            className={`pb-3 px-3 transition-colors border-b-2 whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'apk'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>1. Build Android APK (Capacitor)</span>
          </button>
          <button
            onClick={() => setActiveTab('pwa')}
            className={`pb-3 px-3 transition-colors border-b-2 whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'pwa'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>2. Instant Android PWA (No Build Needed)</span>
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`pb-3 px-3 transition-colors border-b-2 whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'api'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>3. Gemini API Security</span>
          </button>
          <button
            onClick={() => setActiveTab('firebase')}
            className={`pb-3 px-3 transition-colors border-b-2 whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'firebase'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>4. Firebase Auth & DB</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-4 text-xs sm:text-sm">
          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-emerald-950/40 border border-emerald-800/40 p-4">
                <h3 className="font-bold text-emerald-300 text-sm mb-1">
                  Compile Native Android APK / AAB
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  OmniAI Nigeria is fully structured with responsive mobile-first viewports, manifest, and icons. You can package it directly into a standard Android Studio project using Capacitor.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-slate-200 text-xs">Terminal Commands (Bash)</span>
                  <button
                    onClick={() => copyToClipboard(capacitorCommands, 'cap')}
                    className="flex items-center space-x-1 text-emerald-400 text-xs hover:text-emerald-300"
                  >
                    {copiedCmd === 'cap' ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Commands</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="rounded-2xl bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-emerald-400 overflow-x-auto border border-slate-800">
                  {capacitorCommands}
                </pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                  <span className="font-bold text-white block mb-1">📱 Step 5: Install APK on Android Phone</span>
                  <p className="text-slate-400 text-[11px]">
                    After clicking <strong>Build APK</strong> in Android Studio, transfer the generated <code className="text-emerald-400">app-debug.apk</code> to your phone via USB or WhatsApp, enable "Install unknown apps" in Android settings, and install directly!
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                  <span className="font-bold text-white block mb-1">🌐 Offline & Low Bandwidth Resilient</span>
                  <p className="text-slate-400 text-[11px]">
                    All 10 modules feature client-side calculators (Naira budgets, generator vs grid, solar sizing, health triage, WAEC quizzes) that function seamlessly even during network dips.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pwa' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
                <h3 className="font-bold text-white text-sm mb-2">Instant Install via Chrome on Android</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-xs">
                  <li>Open this web application URL in Google Chrome or Samsung Internet on your Android phone.</li>
                  <li>Tap the <strong>three dots (⋮)</strong> in the top-right browser corner.</li>
                  <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                  <li>OmniAI Nigeria will appear on your phone's app launcher with the emerald icon, launching in standalone native app mode without the browser URL bar!</li>
                </ol>
              </div>

              <div className="rounded-xl bg-emerald-950/30 border border-emerald-800/30 p-3.5">
                <h4 className="font-semibold text-emerald-300 text-xs mb-1">Why PWA is popular in Nigeria:</h4>
                <p className="text-slate-300 text-xs">
                  Zero app store download data (less than 1.5MB cache), fast updates without manual APK downloads, and saves phone storage on entry-level Android devices.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
                <h3 className="font-bold text-white text-sm mb-1">Secure Gemini 3.8 Flash Integration</h3>
                <p className="text-slate-400 text-xs mb-3">
                  In accordance with strict security architecture, the private <code className="text-emerald-400">GEMINI_API_KEY</code> is never exposed in browser or Android client code.
                </p>
                <div className="rounded-xl bg-slate-900 p-3 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <p><strong>Server-Side Proxy:</strong> The client sends requests to <code className="text-emerald-400">/api/chat</code>, <code className="text-emerald-400">/api/modules/shield/analyze</code>, and <code className="text-emerald-400">/api/modules/verify/fact-check</code>.</p>
                  <p><strong>Environment Variable:</strong> Set <code className="text-emerald-400">GEMINI_API_KEY</code> in your server or Google Cloud Run runtime.</p>
                  <p><strong>Offline Fallback:</strong> If no API key is supplied or during offline usage, the app's embedded Nigerian Knowledge Engine handles questions with culturally accurate responses.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'firebase' && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
                <h3 className="font-bold text-white text-sm mb-1">Firebase Authentication & Firestore Sync</h3>
                <p className="text-slate-400 text-xs mb-3">
                  User accounts and preferences are currently stored with secure local persistence and are architected to easily connect with Firebase Auth.
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block mb-0.5">1. Firebase Authentication:</span>
                    Supports Email/Password and Phone SMS authentication for Nigerian mobile numbers (+234).
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block mb-0.5">2. Cloud Firestore Rules:</span>
                    Enforces per-user privacy so each Nigerian user can only read and write their own budgets, health reminders, and business inventory:
                    <pre className="mt-1 text-[10px] text-emerald-400 font-mono bg-slate-950 p-2 rounded">
{`match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">OmniAI Nigeria v2.4.0 • Android Mobile Edition</span>
          <button
            onClick={() => setShowApkModal(false)}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 text-xs transition-colors shadow-lg shadow-emerald-900/30"
          >
            Got it, close
          </button>
        </div>
      </div>
    </div>
  );
};
