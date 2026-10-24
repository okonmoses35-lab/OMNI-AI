import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Shield,
  Save,
  Check,
  CreditCard
} from 'lucide-react';

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, setCurrentPage } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+234 803 123 4567');
  const [state, setState] = useState(user?.state || 'Lagos');
  const [category, setCategory] = useState(user?.category || 'Entrepreneur');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, state, category: category as any });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16 max-w-3xl mx-auto">
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-2xl shadow-xl shadow-emerald-950">
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-white">{name || 'Nigerian User'}</h1>
                <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                  {user?.tier || 'Pro Citizen'}
                </span>
              </div>
              <p className="text-xs text-slate-400">{email || 'user@omniai.ng'}</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('subscription')}
            className="flex items-center space-x-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs font-semibold text-amber-300 border border-slate-700 transition-colors"
          >
            <CreditCard className="h-4 w-4" />
            <span>Manage Plan</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 text-center flex items-center justify-center space-x-2">
            <Check className="h-4 w-4" />
            <span>Profile and Nigerian regional settings updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="mt-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1">Phone Number (Nigeria +234)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Nigerian State of Residence</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none"
              >
                {NIGERIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Primary Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none"
            >
              <option value="Student">Student (JAMB / WAEC / Tertiary)</option>
              <option value="Job Seeker">Job Seeker / Graduate</option>
              <option value="Entrepreneur">Entrepreneur / Small Business Owner</option>
              <option value="Household">Household & Family Manager</option>
              <option value="Driver / Transport">Driver / Transport Operator</option>
              <option value="Professional">Corporate / Tech Professional</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-emerald-950/40"
            >
              <Save className="h-4 w-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
