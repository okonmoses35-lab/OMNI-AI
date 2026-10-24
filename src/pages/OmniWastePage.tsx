import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Recycle,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Truck,
  Leaf,
  DollarSign
} from 'lucide-react';

const RECYCLING_HUBS = [
  { name: 'Wecyclers Hub Lagos', location: 'Ebute Metta / Surulere, Lagos', materials: 'PET Plastics, Aluminum Cans, Cartons', reward: 'Cash & Points per Kg', phone: '+234 809 111 2233' },
  { name: 'PAKAM Waste Buy-Back Station', location: 'Ikeja / Agege, Lagos', materials: 'Pure water sachets (LDPE), Rigid plastics', reward: 'Direct Bank Transfer', phone: '+234 812 334 5566' },
  { name: 'LAWMA Recycling Resource Centre', location: 'Olushosun, Ojota, Lagos', materials: 'Electronic waste, Scrap metal, Paper', reward: 'Municipal Drop-off Hub', phone: '+234 1 774 5678' },
  { name: 'Abuja Green Cycle Depot', location: 'Kubwa / Jabi, Abuja', materials: 'PET bottles, Glass, E-waste', reward: 'Commercial Scrap Valuation', phone: '+234 9 888 1234' },
];

export const OmniWastePage: React.FC = () => {
  const { sendChatMessage, setCurrentPage } = useApp();
  const [materialDescription, setMaterialDescription] = useState('Empty plastic soft drink bottles (PET) and carton boxes');
  const [wasteAnalysis, setWasteAnalysis] = useState<any>(null);
  const [bookingScheduled, setBookingScheduled] = useState(false);

  const handleAnalyzeWaste = (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialDescription) return;

    setWasteAnalysis({
      identifiedType: 'PET Plastics (Polyethylene Terephthalate) & Corrugated Cardboard',
      recyclability: '100% Recyclable with High Cash Buy-Back Value in Nigeria',
      preparationSteps: [
        'Rinse beverage bottles to remove sugary residue and pests.',
        'Crush or flatten bottles to save storage space.',
        'Keep bottle caps separate as they are made of High-Density Polyethylene (HDPE).',
        'Flatten cardboard boxes and keep dry from rain to prevent weight degradation.'
      ],
      estimatedMarketValue: '₦180 - ₦250 per Kilogram at registered scrap hubs',
      verifiedHubsCount: 4,
    });
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-lime-950/70 via-slate-900 to-slate-900 p-6 sm:p-8 border border-lime-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-lime-500/20 text-lime-400 flex items-center justify-center border border-lime-500/30 shadow-lg">
              <Recycle className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-lime-400">MODULE 09</span>
                <span className="rounded-md bg-lime-950 px-2 py-0.5 text-[10px] font-semibold text-lime-300 border border-lime-800/40">
                  Waste & Recycling
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">OmniWaste Environmental Hub</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Identify recyclables, discover verified cash-for-scrap buyback hubs & schedule pickups.
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                sendChatMessage('Where can I sell plastic bottles and scrap cartons for cash in Lagos or Abuja?', 'omni_waste');
                setCurrentPage('chat');
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-lime-600 hover:bg-lime-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Recycling AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Waste Identifier */}
        <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Leaf className="h-4 w-4 text-lime-400" />
            <span>Identify Waste Material & Value</span>
          </h3>

          <form onSubmit={handleAnalyzeWaste} className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1">Describe the waste items:</label>
              <textarea
                value={materialDescription}
                onChange={(e) => setMaterialDescription(e.target.value)}
                placeholder="e.g. Pure water sachets, car battery, beer cans, computer monitor..."
                rows={3}
                className="w-full rounded-2xl bg-slate-950 p-3 text-xs text-white border border-slate-800 focus:outline-none focus:border-lime-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-lime-600 hover:bg-lime-500 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-lime-950/40"
            >
              Assess Material Recyclability
            </button>
          </form>

          {wasteAnalysis && (
            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-lime-400">{wasteAnalysis.identifiedType}</span>
                <span className="rounded bg-lime-950 px-2 py-0.5 text-[10px] text-lime-300 font-bold border border-lime-800">
                  Valuable Scrap
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Scrap Market Valuation:</span>
                <p className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{wasteAnalysis.estimatedMarketValue}</p>
              </div>

              <div>
                <span className="font-bold text-slate-300 block mb-1">Sorting & Preparation Guide:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  {wasteAnalysis.preparationSteps.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Collection Schedule Request */}
        <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <Truck className="h-4 w-4 text-lime-400" />
              <span>Schedule Commercial Collection Request</span>
            </h3>
            <span className="text-slate-400 text-[11px]">Free Pickup for &gt;50kg</span>
          </div>

          {!bookingScheduled ? (
            <form onSubmit={(e) => { e.preventDefault(); setBookingScheduled(true); }} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Pickup Address / Street</label>
                <input
                  type="text"
                  placeholder="e.g. 14 Ogunlana Drive, Surulere, Lagos"
                  className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Estimated Weight</label>
                  <select className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none">
                    <option>10 - 50 kg (Drop-off recommended)</option>
                    <option>50 - 200 kg (Van pickup)</option>
                    <option>200+ kg (Commercial truck)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    defaultValue="2026-10-28"
                    className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-bold text-white transition-colors"
              >
                Submit Pickup Request
              </button>
            </form>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-center space-y-2 animate-in fade-in">
              <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">Collection Request Dispatched</h4>
              <p className="text-slate-300 text-xs">
                Your request has been logged. An affiliated verified local scrap coordinator will contact you to confirm weighing and cash settlement.
              </p>
              <button
                onClick={() => setBookingScheduled(false)}
                className="text-xs text-emerald-400 underline font-semibold pt-2"
              >
                Book another request
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Verified Recycling Hubs Directory */}
      <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-sm">Verified Scrap & Recycling Buy-Back Centers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {RECYCLING_HUBS.map((hub, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-start justify-between">
                <span className="font-bold text-white">{hub.name}</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-lime-400 font-semibold">{hub.reward}</span>
              </div>
              <p className="text-slate-400 flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-slate-500" />
                <span>{hub.location}</span>
              </p>
              <p className="text-slate-300 text-[11px]"><strong className="text-slate-400">Accepted:</strong> {hub.materials}</p>
              <div className="pt-1 text-[11px] text-emerald-400 font-mono">
                Contact: {hub.phone}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
