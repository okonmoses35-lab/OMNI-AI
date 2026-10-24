import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  Fuel,
  Sun,
  BatteryCharging,
  Sparkles,
  AlertCircle,
  TrendingDown,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export const OmniPowerPage: React.FC = () => {
  const { sendChatMessage, setCurrentPage } = useApp();

  // Generator vs Grid State
  const [genKva, setGenKva] = useState<'2.5' | '3.5' | '5.0' | '10.0'>('3.5');
  const [dailyGenHours, setDailyGenHours] = useState<number>(6);
  const [pmsPricePerLitre, setPmsPricePerLitre] = useState<number>(1050);

  // Solar Sizing State
  const [fansCount, setFansCount] = useState(3);
  const [tvCount, setTvCount] = useState(1);
  const [laptopCount, setLaptopCount] = useState(2);
  const [lightsCount, setLightsCount] = useState(6);
  const [fridgeCount, setFridgeCount] = useState(1);

  // DisCo Tariff State
  const [discoBand, setDiscoBand] = useState<'A' | 'B' | 'C'>('A');
  const [tokenAmountNgn, setTokenAmountNgn] = useState<number>(20000);

  // Generator Calculations
  // Approx fuel burn rates: 2.5kVA ~ 1.0 L/hr, 3.5kVA ~ 1.4 L/hr, 5kVA ~ 2.0 L/hr, 10kVA ~ 3.5 L/hr
  const genFuelRates: Record<string, number> = {
    '2.5': 1.0,
    '3.5': 1.4,
    '5.0': 2.0,
    '10.0': 3.5,
  };
  const hourlyLitres = genFuelRates[genKva] || 1.4;
  const dailyFuelCost = dailyGenHours * hourlyLitres * pmsPricePerLitre;
  const monthlyFuelCost = dailyFuelCost * 30;

  // Grid equivalent calculation (Band A ~ ₦209/kWh, Band B ~ ₦68/kWh)
  const bandRatePerKwh = discoBand === 'A' ? 209 : discoBand === 'B' ? 68 : 55;
  const tokenKwh = Math.round((tokenAmountNgn / bandRatePerKwh) * 10) / 10;

  // Solar Sizing Calculations
  // Fan ~ 60W, TV ~ 100W, Laptop ~ 65W, Light ~ 10W, Fridge ~ 150W
  const totalLoadWatts =
    fansCount * 60 +
    tvCount * 100 +
    laptopCount * 65 +
    lightsCount * 10 +
    fridgeCount * 150;

  const recommendedInverterKva = totalLoadWatts > 1200 ? '2.5 kVA' : totalLoadWatts > 700 ? '1.5 kVA' : '1.0 kVA';
  const recommendedBatteryKwh = Math.round((totalLoadWatts * 6 * 1.2) / 1000 * 10) / 10; // 6 hrs backup

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 p-6 sm:p-8 border border-amber-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-lg">
              <Zap className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-amber-400">MODULE 07</span>
                <span className="rounded-md bg-amber-950 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-800/40">
                  Power & Energy Optimization
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">OmniPower Energy Lab</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                DisCo tariff calculator, generator fuel vs grid economics, and solar inverter sizing.
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                sendChatMessage('How can my household reduce generator fuel expenses in Nigeria right now?', 'omni_power');
                setCurrentPage('chat');
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Energy AI</span>
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-950/70 border border-slate-800 p-3.5 flex items-start space-x-3 text-xs text-slate-300">
          <Info className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Energy Safety Notice:</strong> Calculations use empirical average appliance wattages and current Nigerian pump prices. Never attempt uncertified electrical rewiring without an authorized, licensed technician.
          </p>
        </div>
      </div>

      {/* Grid vs Generator Economic Comparison */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white text-base flex items-center space-x-2">
              <Fuel className="h-5 w-5 text-amber-400" />
              <span>Generator (PMS/Diesel) Fuel Cost vs Grid Reality</span>
            </h3>
            <p className="text-xs text-slate-400">Calculate exact monthly expenditure on "I better pass my neighbour" generators</p>
          </div>
          <span className="rounded bg-rose-950 px-2.5 py-1 text-xs font-bold text-rose-400 border border-rose-800">
            Fuel @ ₦{pmsPricePerLitre}/L
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Generator Rating</label>
              <select
                value={genKva}
                onChange={(e) => setGenKva(e.target.value as any)}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none"
              >
                <option value="2.5">2.5 kVA (Small, ~1.0 Litres/hr)</option>
                <option value="3.5">3.5 kVA (Tiger/Elepaq, ~1.4 Litres/hr)</option>
                <option value="5.0">5.0 kVA (Medium Household, ~2.0 Litres/hr)</option>
                <option value="10.0">10.0 kVA (Commercial/Diesel, ~3.5 Litres/hr)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-medium">Daily Running Hours: {dailyGenHours} hrs</label>
              <input
                type="range"
                min="1"
                max="18"
                value={dailyGenHours}
                onChange={(e) => setDailyGenHours(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-medium">Fuel Pump Price (₦/Litre)</label>
              <input
                type="number"
                value={pmsPricePerLitre}
                onChange={(e) => setPmsPricePerLitre(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="md:col-span-2 rounded-2xl bg-slate-950 p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Daily Generator Fuel Spend</span>
                <p className="text-2xl font-bold text-rose-400 font-mono mt-1">₦{Math.round(dailyFuelCost).toLocaleString()}</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">{dailyGenHours * hourlyLitres} litres burnt per day</span>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/40">
                <span className="text-[11px] text-rose-300 block">Estimated Monthly Generator Spend</span>
                <p className="text-2xl font-bold text-rose-400 font-mono mt-1">₦{Math.round(monthlyFuelCost).toLocaleString()}</p>
                <span className="text-[10px] text-rose-300/80 mt-0.5 block">Excluding periodic oil changes and servicing!</span>
              </div>
            </div>

            <div className="rounded-xl bg-emerald-950/40 p-3.5 border border-emerald-800/30 text-xs space-y-1">
              <span className="font-bold text-emerald-300 block">💡 The Solar / Inverter Alternative:</span>
              <p className="text-slate-300 leading-relaxed">
                By investing <strong>₦{Math.round(monthlyFuelCost * 5).toLocaleString()}</strong> in a reliable 1.5kVA lithium solar setup, the system pays for itself in less than 5 to 6 months of generator savings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DisCo Tariff & Prepaid Units Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>DisCo Prepaid Meter Token Calculator</span>
            </h3>
            <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">IKEDC / EKEDC / AEDC</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Feeder Service Band</label>
              <select
                value={discoBand}
                onChange={(e) => setDiscoBand(e.target.value as any)}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none"
              >
                <option value="A">Band A (Minimum 20 hrs/day @ ~₦209/kWh)</option>
                <option value="B">Band B (16 to 20 hrs/day @ ~₦68/kWh)</option>
                <option value="C">Band C (12 to 16 hrs/day @ ~₦55/kWh)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-medium">Recharge Amount (₦)</label>
              <input
                type="number"
                value={tokenAmountNgn}
                onChange={(e) => setTokenAmountNgn(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none font-mono"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Expected Energy Yield:</span>
                <p className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">{tokenKwh} kWh</p>
                <span className="text-[10px] text-slate-400">At standard NERC approved band rate</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Tariff Rate:</span>
                <p className="text-sm font-bold text-white font-mono">₦{bandRatePerKwh}/kWh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Solar & Inverter Capacity Sizer */}
        <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <Sun className="h-4 w-4 text-amber-400" />
              <span>Solar & Inverter Sizing Helper</span>
            </h3>
            <span className="text-amber-400 font-bold">{totalLoadWatts} Watts Peak</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Ceiling / Standing Fans (60W)</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => setFansCount(Math.max(0, fansCount - 1))} className="px-2 py-0.5 bg-slate-800 rounded">-</button>
                <span className="font-mono">{fansCount}</span>
                <button onClick={() => setFansCount(fansCount + 1)} className="px-2 py-0.5 bg-slate-800 rounded">+</button>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Television (LED 100W)</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => setTvCount(Math.max(0, tvCount - 1))} className="px-2 py-0.5 bg-slate-800 rounded">-</button>
                <span className="font-mono">{tvCount}</span>
                <button onClick={() => setTvCount(tvCount + 1)} className="px-2 py-0.5 bg-slate-800 rounded">+</button>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Laptops & Workstations (65W)</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => setLaptopCount(Math.max(0, laptopCount - 1))} className="px-2 py-0.5 bg-slate-800 rounded">-</button>
                <span className="font-mono">{laptopCount}</span>
                <button onClick={() => setLaptopCount(laptopCount + 1)} className="px-2 py-0.5 bg-slate-800 rounded">+</button>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/40 space-y-1">
            <span className="font-bold text-amber-300 block">Recommended System Setup:</span>
            <p className="text-slate-200">
              Inverter: <strong>{recommendedInverterKva} Pure Sine Wave</strong> • Battery: <strong>~{recommendedBatteryKwh} kWh Lithium (LiFePO4)</strong> (gives 6+ hours runtime without noise).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
