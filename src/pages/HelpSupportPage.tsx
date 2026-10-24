import React from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  PhoneCall,
  Smartphone,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

const EMERGENCY_CONTACTS = [
  { name: 'National Emergency Toll-Free', number: '112', desc: 'Police, Fire, Ambulance 24/7' },
  { name: 'Lagos State Emergency', number: '767 / 112', desc: 'LASEMA, Lagos State Traffic Management' },
  { name: 'Federal Road Safety Corps (FRSC)', number: '122', desc: 'Highway accidents, road blockages' },
  { name: 'EFCC Cybercrime / Fraud Desk', number: '0809 332 2644', desc: 'Financial fraud, scam reporting' },
  { name: 'NEMA Disaster Helpline', number: '0800 2255 6362', desc: 'Flooding, building collapse, disasters' },
  { name: 'National Human Rights Commission', number: '0800 6472 4357', desc: 'Unlawful detention, citizen rights' },
];

const FAQS = [
  {
    q: 'How does OmniAI route my questions to the right module?',
    a: 'OmniAI includes an intelligent central classification engine. When you ask about fever, it routes to OmniHealth; when you paste an SMS about your BVN, it routes to OmniShield; and when you ask about algebra, it dispatches to OmniLearn.'
  },
  {
    q: 'Can OmniAI give me a doctor’s prescription for malaria?',
    a: 'No. By strict safety design, OmniAI never prescribes medical dosages or replaces licensed clinical diagnosis. It gives evidence-based educational guidance, highlights red flags, and points you to registered primary healthcare centers.'
  },
  {
    q: 'How do I install OmniAI Nigeria on my Android phone?',
    a: 'You can tap the "Android APK" button in the header or use Google Chrome on your phone: tap the three dots (⋮) and select "Add to Home screen". You can also compile a native Android APK using our provided Capacitor commands.'
  },
  {
    q: 'Does OmniAI work if my internet is slow?',
    a: 'Yes! The application is lightweight (less than 2MB total assets) and contains offline client-side calculators for Naira budgets, generator vs grid fuel, solar sizing, and WAEC practice quizzes.'
  },
  {
    q: 'Are my financial records and expenses kept private?',
    a: 'Absolutely. Your budget items, expenses, and business inventory are stored securely in your private browser storage. No financial credentials, bank passwords, or debit card pins are ever requested or stored.'
  },
];

export const HelpSupportPage: React.FC = () => {
  const { setShowApkModal, setCurrentPage, sendChatMessage } = useApp();

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <div className="h-10 w-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Help, Support & Emergency Directory</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Emergency hotlines, user guide, and frequently asked questions for Nigeria.
          </p>
        </div>

        <button
          onClick={() => setShowApkModal(true)}
          className="flex items-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md"
        >
          <Smartphone className="h-4 w-4" />
          <span>Android APK Guide</span>
        </button>
      </div>

      {/* Emergency Hotlines Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <PhoneCall className="h-4 w-4 text-rose-400" />
            <span>Verified Nigerian Emergency Hotlines</span>
          </h2>
          <span className="text-xs text-rose-400 font-bold">Toll-Free Numbers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EMERGENCY_CONTACTS.map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <span className="font-bold text-white block">{item.name}</span>
              <p className="text-[11px] text-slate-400">{item.desc}</p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-400 text-sm">{item.number}</span>
                <a
                  href={`tel:${item.number.replace(/\s+/g, '')}`}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-slate-200"
                >
                  Dial Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">Frequently Asked Questions</h2>
        <div className="divide-y divide-slate-800/80">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="py-3.5 space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-200 text-sm">{faq.q}</h3>
              <p className="text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
