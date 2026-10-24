import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  Mail,
  User,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

export const AuthPages: React.FC = () => {
  const { loginUser, setCurrentPage } = useApp();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('Lagos');
  const [category, setCategory] = useState<'Student' | 'Job Seeker' | 'Entrepreneur' | 'Household' | 'Professional'>('Entrepreneur');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setMessage('Password recovery instructions sent to your email.');
      return;
    }

    loginUser(email || 'demo.user@omniai.ng', name || 'Nigerian Citizen');
  };

  const handleQuickDemo = () => {
    loginUser('adewale.j@example.ng', 'Adewale Johnson');
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-950">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Sign in to OmniAI Nigeria' : mode === 'signup' ? 'Create Your Account' : 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? 'Access your saved budgets, CVs, and AI learning records'
              : mode === 'signup'
              ? 'Join Nigerian professionals, students, and entrepreneurs'
              : 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {message && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <>
              <div>
                <label className="text-slate-400 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="h-4 w-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chioma Okafor"
                    className="w-full rounded-xl bg-slate-950 p-2.5 pl-9 text-white border border-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">State of Residence</label>
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

                <div>
                  <label className="text-slate-400 block mb-1">Primary Role</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none"
                  >
                    <option value="Student">Student</option>
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="Entrepreneur">Entrepreneur / Trader</option>
                    <option value="Household">Household Manager</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="h-4 w-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.ng"
                className="w-full rounded-xl bg-slate-950 p-2.5 pl-9 text-white border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-400">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-slate-950 p-2.5 pl-9 text-white border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-emerald-950/40"
          >
            {mode === 'login' ? 'Sign In to Dashboard' : mode === 'signup' ? 'Create Account' : 'Send Recovery Link'}
          </button>
        </form>

        {/* Quick Demo Login */}
        <div className="pt-2 border-t border-slate-800 text-center space-y-3">
          <button
            onClick={handleQuickDemo}
            className="w-full flex items-center justify-center space-x-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 py-2 text-xs font-semibold text-emerald-400 border border-slate-800 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Continue as Demo User (Adewale)</span>
          </button>

          <div className="text-xs text-slate-400">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button onClick={() => setMode('signup')} className="text-emerald-400 font-semibold hover:underline">
                  Sign up free
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-emerald-400 font-semibold hover:underline">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
