import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  MapPin,
  Clock,
  Car,
  Fuel,
  Sparkles,
  AlertCircle,
  Navigation,
  Train,
  Bus,
  ArrowRight
} from 'lucide-react';
import { TransitRoute } from '../types';

const POPULAR_ROUTES: TransitRoute[] = [
  {
    id: 'rt-1',
    name: 'Ikorodu to Victoria Island (Lagos)',
    origin: 'Ikorodu Garage',
    destination: 'Victoria Island / CMS',
    distanceKm: 34,
    estMinutes: 75,
    fareEstimateNgn: 1200,
    transitTypes: ['BRT Dedicated Lane', 'Waterways Ferry Option'],
    trafficStatus: 'Heavy',
  },
  {
    id: 'rt-2',
    name: 'Ikeja to Lagos Island via 3rd Mainland Bridge',
    origin: 'Ikeja Under-Bridge',
    destination: 'CMS / Marina',
    distanceKm: 22,
    estMinutes: 45,
    fareEstimateNgn: 900,
    transitTypes: ['Danfo Minibus', 'BRT Express', 'Ride-Hailing'],
    trafficStatus: 'Moderate',
  },
  {
    id: 'rt-3',
    name: 'Marina to Mile 2 (Blue Line Rail)',
    origin: 'Marina Station',
    destination: 'Mile 2 Interchange',
    distanceKm: 13,
    estMinutes: 25,
    fareEstimateNgn: 750,
    transitTypes: ['Lagos Blue Line Electric Rail (Zero Traffic)'],
    trafficStatus: 'Light',
  },
  {
    id: 'rt-4',
    name: 'Abuja Airport Road to Central Business District',
    origin: 'Nnamdi Azikiwe International Airport',
    destination: 'CBD / Federal Secretariat',
    distanceKm: 42,
    estMinutes: 38,
    fareEstimateNgn: 3500,
    transitTypes: ['Abuja Metro Rail', 'Airport Taxi', 'Expressway Corridor'],
    trafficStatus: 'Light',
  },
];

export const OmniMovePage: React.FC = () => {
  const { sendChatMessage, setCurrentPage } = useApp();
  const [origin, setOrigin] = useState('Ikorodu, Lagos');
  const [destination, setDestination] = useState('Victoria Island, Lagos');
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'commercial'>('sedan');
  const [calculatedJourney, setCalculatedJourney] = useState<any>(null);

  const handlePlanRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) return;

    // Approximations
    const estDistanceKm = 32;
    const estDurationMins = 65;
    // Fuel: Sedan ~ 8L / 100km, SUV ~ 12L / 100km, Commercial ~ 14L / 100km
    const consumptionPer100 = vehicleType === 'sedan' ? 8.5 : vehicleType === 'suv' ? 12.0 : 14.5;
    const fuelLitres = (estDistanceKm * consumptionPer100) / 100;
    const fuelCostNgn = Math.round(fuelLitres * 1050);

    setCalculatedJourney({
      origin,
      destination,
      distanceKm: estDistanceKm,
      durationMins: estDurationMins,
      fuelLitres: Math.round(fuelLitres * 10) / 10,
      fuelCostNgn,
      recommendedMode: 'Lagos BRT Dedicated Corridor or Off-Peak Departure',
      transitOptions: [
        'Dedicated BRT Bus (Avoids general lane gridlock)',
        'Private Drive via Third Mainland Bridge',
        'Ikorodu Ferry Terminal to CMS Jetty (Fastest: ~30 mins)'
      ],
      trafficDisclaimer: 'Approximate historical estimation. Real-time conditions depend on peak commuter rushes and corridor checkpoints.',
    });
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 p-6 sm:p-8 border border-purple-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 shadow-lg">
              <Compass className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-purple-400">MODULE 04</span>
                <span className="rounded-md bg-purple-950 px-2 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-800/40">
                  Transit & Route Navigation
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">OmniMove Transit Planner</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Commute route planning, BRT/Danfo/Rail alternatives & Nigerian fuel consumption calculations.
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                sendChatMessage('What is the best route and fuel cost from Lagos Mainland to Island during morning rush hour?', 'omni_move');
                setCurrentPage('chat');
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Transit AI</span>
            </button>
          </div>
        </div>

        {/* Traffic disclaimer */}
        <div className="mt-5 rounded-2xl bg-slate-950/70 border border-slate-800 p-3.5 flex items-start space-x-3 text-xs text-slate-300">
          <AlertCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Live Traffic Policy:</strong> Journey times represent empirical historical averages. If live GPS sensor streams are not connected, traffic conditions are categorized as approximate estimates rather than guaranteed live telemetry.
          </p>
        </div>
      </div>

      {/* Plan Journey Form & Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Navigation className="h-4 w-4 text-purple-400" />
            <span>Plan Nigerian Journey / Commute</span>
          </h3>

          <form onSubmit={handlePlanRoute} className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1">Trip Origin (Starting point)</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Berger, Ikeja, Garki, Wuse"
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Victoria Island, Airport, Yaba"
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Vehicle / Commute Category</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as any)}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none"
              >
                <option value="sedan">Private Sedan (Toyota Corolla/Camry ~8.5L/100km)</option>
                <option value="suv">SUV / Crossover (Lexus/Highlander ~12L/100km)</option>
                <option value="commercial">Commercial Bus / Dispatch Bike (~14.5L/100km)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-purple-950/40"
            >
              Calculate Route & Fuel Budget
            </button>
          </form>

          {calculatedJourney && (
            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-purple-400">Route Assessment</span>
                <span className="text-slate-400 font-mono">~{calculatedJourney.distanceKm} km</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Est. Driving Time:</span>
                  <span className="text-sm font-bold text-white font-mono">{calculatedJourney.durationMins} minutes</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Fuel Requirement:</span>
                  <span className="text-sm font-bold text-amber-400 font-mono">{calculatedJourney.fuelLitres}L (₦{calculatedJourney.fuelCostNgn})</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-300 block mb-1">Public Transit Alternatives:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                  {calculatedJourney.transitOptions.map((opt: string, i: number) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Popular Key Commuter Corridors */}
        <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">Key Transit Corridors (Lagos & Abuja)</h3>
            <span className="text-[11px] text-slate-400">Pre-computed benchmarks</span>
          </div>

          <div className="space-y-3 text-xs">
            {POPULAR_ROUTES.map((rt) => (
              <div
                key={rt.id}
                onClick={() => {
                  setOrigin(rt.origin);
                  setDestination(rt.destination);
                }}
                className="cursor-pointer p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all space-y-1.5"
              >
                <div className="flex items-start justify-between">
                  <span className="font-bold text-white">{rt.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    rt.trafficStatus === 'Heavy' ? 'bg-rose-950 text-rose-400' : 'bg-emerald-950 text-emerald-400'
                  }`}>
                    {rt.trafficStatus}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-purple-400" />
                    <span>~{rt.estMinutes} mins</span>
                  </span>
                  <span>•</span>
                  <span>{rt.distanceKm} km</span>
                  <span>•</span>
                  <span className="font-mono text-emerald-400">Fare ~₦{rt.fareEstimateNgn}</span>
                </div>

                <div className="pt-1 flex flex-wrap gap-1">
                  {rt.transitTypes.map((t, idx) => (
                    <span key={idx} className="rounded bg-slate-900 px-1.5 py-0.2 text-[9px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
