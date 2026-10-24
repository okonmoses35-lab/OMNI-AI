import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartPulse,
  AlertTriangle,
  Hospital,
  Clock,
  Sparkles,
  PhoneCall,
  MapPin,
  CheckCircle2,
  ShieldAlert,
  Search,
  Plus
} from 'lucide-react';

const NIGERIAN_FACILITIES = [
  { name: 'Lagos University Teaching Hospital (LUTH)', state: 'Lagos', city: 'Idi-Araba, Surulere', type: 'Federal Teaching Hospital', phone: '+234 1 773 1234', emergency: '24/7 Trauma Center' },
  { name: 'National Hospital Abuja', state: 'Abuja FCT', city: 'Central Business District', type: 'Federal Tertiary Hospital', phone: '+234 9 234 5678', emergency: '24/7 Urgent Care' },
  { name: 'University College Hospital (UCH)', state: 'Oyo', city: 'Queen Elizabeth Road, Ibadan', type: 'Teaching Hospital', phone: '+234 2 241 0088', emergency: '24/7 Emergency' },
  { name: 'University of Port Harcourt Teaching Hospital (UPTH)', state: 'Rivers', city: 'East-West Road, Port Harcourt', type: 'Teaching Hospital', phone: '+234 84 890 123', emergency: '24/7 Emergency' },
  { name: 'Aminu Kano Teaching Hospital (AKTH)', state: 'Kano', city: 'Zaria Road, Kano', type: 'Federal Teaching Hospital', phone: '+234 64 669 000', emergency: '24/7 Emergency' },
  { name: 'Garki Hospital Abuja', state: 'Abuja FCT', city: 'Area 8, Garki', type: 'General Hospital', phone: '+234 9 461 4000', emergency: '24/7 Outpatient' },
];

export const OmniHealthPage: React.FC = () => {
  const {
    healthReminders,
    toggleHealthReminder,
    addHealthReminder,
    sendChatMessage,
    setCurrentPage,
    user
  } = useApp();

  const [symptomInput, setSymptomInput] = useState('');
  const [hasEmergencySigns, setHasEmergencySigns] = useState(false);
  const [symptomOutput, setSymptomOutput] = useState<any>(null);
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('All');
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('08:00 AM');

  const handleSymptomTriage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;

    const lower = symptomInput.toLowerCase();
    const emergencyDetected =
      lower.includes('chest pain') ||
      lower.includes('difficulty breathing') ||
      lower.includes('unconscious') ||
      lower.includes('vomiting blood') ||
      lower.includes('seizure') ||
      lower.includes('convulsion');

    setHasEmergencySigns(emergencyDetected);

    setSymptomOutput({
      summary: emergencyDetected
        ? 'CRITICAL RED FLAG DETECTED: The symptoms you described require immediate professional emergency intervention.'
        : 'Symptom Triage Assessment: Based on your input, these symptoms commonly align with mild acute febrile illness, seasonal environmental factors, or dehydration.',
      commonFactors: lower.includes('fever') || lower.includes('headache')
        ? ['Malaria (Plasmodium falciparum)', 'Typhoid fever (Salmonella enterica)', 'Acute stress / heat fatigue', 'Dehydration']
        : ['General physical fatigue', 'Infection', 'Environmental stress'],
      cautiousSteps: [
        'Rest in a cool, well-ventilated space.',
        'Drink clean water and electrolyte oral rehydration solution (ORS).',
        'Do not take random antibiotic or antimalarial combinations without a Rapid Diagnostic Test (RDT).',
        'Visit a licensed primary healthcare facility if symptoms persist beyond 24 hours.'
      ],
      isEmergency: emergencyDetected,
    });
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderTitle) return;
    addHealthReminder(newReminderTitle, newReminderTime);
    setNewReminderTitle('');
  };

  const filteredFacilities = selectedStateFilter === 'All'
    ? NIGERIAN_FACILITIES
    : NIGERIAN_FACILITIES.filter((f) => f.state.includes(selectedStateFilter));

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 p-6 sm:p-8 border border-emerald-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-lg">
              <HeartPulse className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-emerald-400">MODULE 01</span>
                <span className="rounded-md bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-800/40">
                  Health & Clinic Support
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">OmniHealth Assistant</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Symptom triage, preventive education, medication tracking & Nigerian hospital directory.
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                sendChatMessage('I have a headache, mild chills, and fever. What should I do?', 'omni_health');
                setCurrentPage('chat');
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Health AI</span>
            </button>
          </div>
        </div>

        {/* Mandatory Medical Safety Disclaimer */}
        <div className="mt-5 rounded-2xl bg-amber-950/40 border border-amber-800/50 p-3.5 flex items-start space-x-3 text-xs text-amber-200/90">
          <ShieldAlert className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 block mb-0.5">Important Clinical Safety Notice:</span>
            OmniHealth provides non-clinical educational guidance only. It does not provide medical diagnoses, prescribe prescription drugs or dosages, or replace physical assessment by a registered doctor. In case of acute emergencies, call <strong>112</strong> or <strong>767</strong> immediately.
          </div>
        </div>
      </div>

      {/* Main Grid: Symptom Checker & Facility Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Symptom Checker Form */}
        <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <HeartPulse className="h-4 w-4 text-emerald-400" />
            <span>Interactive Symptom Guidance</span>
          </h3>

          <form onSubmit={handleSymptomTriage} className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Describe symptoms (e.g. "I have a headache and fever for 2 days"):
              </label>
              <textarea
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                placeholder="Type your symptoms here with duration and severity..."
                rows={3}
                className="w-full rounded-2xl bg-slate-950 p-3 text-xs text-white border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] text-slate-400 block w-full">Quick scenarios:</span>
              <button
                type="button"
                onClick={() => setSymptomInput('Headache, chills, mild joint weakness, and temperature')}
                className="rounded-lg bg-slate-950 px-2 py-1 text-[11px] text-slate-300 hover:text-emerald-400 border border-slate-800"
              >
                + Fever & Headache
              </button>
              <button
                type="button"
                onClick={() => setSymptomInput('Chest tightness with sudden shortness of breath')}
                className="rounded-lg bg-slate-950 px-2 py-1 text-[11px] text-rose-300 hover:text-rose-400 border border-slate-800"
              >
                + Chest Tightness (Red Flag)
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-emerald-950/40"
            >
              Analyze & Screen Symptoms
            </button>
          </form>

          {symptomOutput && (
            <div className={`rounded-2xl p-4 border text-xs space-y-2.5 animate-in fade-in ${
              symptomOutput.isEmergency ? 'bg-rose-950/40 border-rose-700/60' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center space-x-2">
                {symptomOutput.isEmergency ? (
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                )}
                <span className={`font-bold ${symptomOutput.isEmergency ? 'text-rose-300 text-sm' : 'text-emerald-300'}`}>
                  {symptomOutput.isEmergency ? 'URGENT MEDICAL ATTENTION REQUIRED' : 'Clinical Triage Evaluation'}
                </span>
              </div>

              <p className="text-slate-200 leading-relaxed">{symptomOutput.summary}</p>

              <div>
                <span className="font-bold text-slate-300 block mb-1">Recommended Next Steps:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {symptomOutput.cautiousSteps.map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>

              {symptomOutput.isEmergency && (
                <div className="mt-3 p-3 rounded-xl bg-rose-900/60 border border-rose-600 text-white font-semibold flex items-center justify-between">
                  <span>Emergency Toll-Free Hotline:</span>
                  <a href="tel:112" className="underline font-bold text-amber-300">112 or 767</a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Medication & Hydration Reminders */}
        <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>Medication & Wellness Reminders</span>
            </h3>
            <span className="text-[11px] text-slate-400">{healthReminders.filter(r => r.done).length}/{healthReminders.length} Done</span>
          </div>

          <div className="space-y-2">
            {healthReminders.map((r) => (
              <div
                key={r.id}
                onClick={() => toggleHealthReminder(r.id)}
                className={`cursor-pointer flex items-center justify-between p-3 rounded-2xl border text-xs transition-all ${
                  r.done
                    ? 'bg-slate-950/40 text-slate-500 border-slate-900 line-through'
                    : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${r.done ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-600'}`}>
                    {r.done && <CheckCircle2 className="h-3 w-3" />}
                  </div>
                  <span className="font-medium">{r.title}</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-mono">{r.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddReminder} className="pt-2 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 block">Add New Reminder:</span>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="e.g. Paracetamol after food"
                value={newReminderTitle}
                onChange={(e) => setNewReminderTitle(e.target.value)}
                className="flex-1 rounded-xl bg-slate-950 p-2 text-xs text-white border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                value={newReminderTime}
                onChange={(e) => setNewReminderTime(e.target.value)}
                className="w-24 rounded-xl bg-slate-950 p-2 text-xs text-white border border-slate-800 focus:outline-none focus:border-emerald-500 text-center font-mono"
              />
              <button
                type="submit"
                className="rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs text-white font-bold"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Nigerian Hospital & Clinic Directory */}
      <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <Hospital className="h-4 w-4 text-emerald-400" />
              <span>Registered Healthcare Facilities in Nigeria</span>
            </h3>
            <p className="text-xs text-slate-400">Public teaching hospitals and accredited emergency facilities</p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Filter State:</span>
            <select
              value={selectedStateFilter}
              onChange={(e) => setSelectedStateFilter(e.target.value)}
              className="rounded-xl bg-slate-950 px-3 py-1.5 text-white border border-slate-800 focus:outline-none"
            >
              <option value="All">All States</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja FCT</option>
              <option value="Oyo">Oyo</option>
              <option value="Rivers">Rivers</option>
              <option value="Kano">Kano</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredFacilities.map((f, i) => (
            <div key={i} className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <span className="font-bold text-white">{f.name}</span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-emerald-400 font-semibold">{f.state}</span>
              </div>
              <p className="text-slate-400 flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-slate-500" />
                <span>{f.city}</span>
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-amber-400 font-semibold">{f.emergency}</span>
                <a href={`tel:${f.phone}`} className="flex items-center space-x-1 text-emerald-400 font-medium hover:underline">
                  <PhoneCall className="h-3 w-3" />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
