import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Check,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Zap,
  Building,
  Info
} from 'lucide-react';

export const SubscriptionPage: React.FC = () => {
  const { user, updateProfile } = useApp();
  const [selectedBilling, setSelectedBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [simulatedNotice, setSimulatedNotice] = useState<string | null>(null);

  const plans = [
    {
      name: 'Free Citizen',
      price: '₦0',
      period: 'Forever free',
      description: 'Essential everyday AI assistance for students, commuters, and households.',
      features: [
        'Access to all 10 core modules',
        'Standard symptom triage & safety advice',
        'Basic JAMB / WAEC question tutor',
        'Standard SMS scam inspection',
        'Naira budget expense tracking',
        'Device-local storage',
      ],
      current: user?.tier === 'Free',
      badge: 'Starter',
      btnText: 'Current Plan',
    },
    {
      name: 'Pro Citizen',
      price: selectedBilling === 'monthly' ? '₦3,500' : '₦35,000',
      period: selectedBilling === 'monthly' ? '/ month' : '/ year (Save 17%)',
      description: 'Enhanced for ambitious students, job seekers, and power users.',
      features: [
        'Unlimited AI chat reasoning',
        'Advanced step-by-step exam tutor',
        'ATS CV generator & unlimited mock interviews',
        'Solar & inverter engineering calculations',
        'Priority low-latency server processing',
        'Export conversations to PDF / JSON',
      ],
      current: user?.tier === 'Pro Citizen',
      badge: 'Popular',
      btnText: user?.tier === 'Pro Citizen' ? 'Current Active Tier' : 'Upgrade to Pro',
    },
    {
      name: 'Enterprise SME',
      price: selectedBilling === 'monthly' ? '₦12,500' : '₦120,000',
      period: selectedBilling === 'monthly' ? '/ month' : '/ year',
      description: 'Tailored for Nigerian small businesses, retail shops, and traders.',
      features: [
        'Everything in Pro Citizen',
        'OmniBusiness automated WhatsApp broadcasts',
        'Multi-product inventory tracking with alerts',
        'Customer credit ledger & recovery copy generator',
        'Commercial waste pickup dispatch coordination',
        'Dedicated priority SME support desk',
      ],
      current: user?.tier === 'Enterprise SME',
      badge: 'For Business',
      btnText: user?.tier === 'Enterprise SME' ? 'Current Active Tier' : 'Upgrade to SME',
    },
  ];

  const handleSimulateUpgrade = (tierName: string) => {
    updateProfile({ tier: tierName as any });
    setSimulatedNotice(`Simulation Mode: Switched profile tier to ${tierName}. Live Paystack / Flutterwave integration will process actual Naira transactions upon production deployment.`);
    setTimeout(() => setSimulatedNotice(null), 4000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <span className="rounded-full bg-emerald-950 px-3.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-800">
          Transparent Pricing in Nigerian Naira (₦)
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Choose the Right Plan for You or Your Business
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Start for free, or unlock advanced exam tutoring, career accelerators, and SME inventory automation.
        </p>

        {/* Billing Switch */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          <button
            onClick={() => setSelectedBilling('monthly')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedBilling === 'monthly' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setSelectedBilling('yearly')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedBilling === 'yearly' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Annual Billing (Discounted)
          </button>
        </div>
      </div>

      {simulatedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 text-center flex items-center justify-center space-x-2 animate-in fade-in">
          <Info className="h-4 w-4" />
          <span>{simulatedNotice}</span>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all ${
              p.current
                ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/40 border-2 border-emerald-500 shadow-2xl'
                : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{p.name}</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">{p.badge}</span>
              </div>

              <div className="flex items-baseline space-x-1 mb-2">
                <span className="text-3xl font-extrabold text-white font-mono">{p.price}</span>
                <span className="text-xs text-slate-400">{p.period}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">{p.description}</p>

              <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-300 block mb-2">Included features:</span>
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => handleSimulateUpgrade(p.name)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                  p.current
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {p.btnText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
        <p>
          <strong>Payment Gateway Architecture:</strong> In production deployment, payments are connected via Paystack or Flutterwave webhook verification. No cards are charged during this preview stage.
        </p>
      </div>
    </div>
  );
};
