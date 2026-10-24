import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
  PieChart,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { ExpenseItem } from '../types';

export const OmniFinancePage: React.FC = () => {
  const {
    expenses,
    addExpense,
    deleteExpense,
    monthlyBudget,
    setMonthlyBudget,
    sendChatMessage,
    setCurrentPage,
    user
  } = useApp();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseItem['category']>('Food');
  const [savingsTarget, setSavingsTarget] = useState(100000);
  const [currentSavings, setCurrentSavings] = useState(45000);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    addExpense({
      title,
      amount: Number(amount),
      category,
      date: new Date().toISOString().split('T')[0],
    });
    setTitle('');
    setAmount('');
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = monthlyBudget - totalSpent;
  const budgetPercentage = Math.min(100, Math.round((totalSpent / monthlyBudget) * 100));

  const categoryTotals: Record<string, number> = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 p-6 sm:p-8 border border-emerald-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-lg">
              <Wallet className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-emerald-400">MODULE 06</span>
                <span className="rounded-md bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-800/40">
                  Naira (₦) Management
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">OmniFinance Naira Budgeter</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Track food, transport, generator fuel, and utility spending in Nigerian Naira.
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                sendChatMessage('Help me create a monthly budget from a ₦250,000 salary in Nigeria with current inflation', 'omni_finance');
                setCurrentPage('chat');
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Finance AI</span>
            </button>
          </div>
        </div>

        {/* Overview Stat Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Monthly Budget Allocation</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">₦{monthlyBudget.toLocaleString()}</p>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-[11px] text-slate-400">
              <span>Change limit:</span>
              <button
                onClick={() => setMonthlyBudget(monthlyBudget === 250000 ? 350000 : 250000)}
                className="text-emerald-400 font-semibold underline"
              >
                Toggle ₦250k / ₦350k
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Total Spent This Month</span>
            <p className="text-xl sm:text-2xl font-bold text-rose-400 font-mono mt-1">₦{totalSpent.toLocaleString()}</p>
            <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full ${budgetPercentage > 85 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                style={{ width: `${budgetPercentage}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Remaining Safe Buffer</span>
            <p className={`text-xl sm:text-2xl font-bold font-mono mt-1 ${remainingBudget < 0 ? 'text-rose-500' : 'text-emerald-400'}`}>
              ₦{remainingBudget.toLocaleString()}
            </p>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {remainingBudget > 0 ? `${100 - budgetPercentage}% remaining` : 'Budget limit reached!'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Add Expense + Recent Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Expense Form */}
        <div className="space-y-4 rounded-3xl bg-slate-900 p-6 border border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Plus className="h-4 w-4 text-emerald-400" />
            <span>Record New Expense</span>
          </h3>

          <form onSubmit={handleAdd} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Expense Description</label>
              <input
                type="text"
                placeholder="e.g. Fuel 25L, Foodstuff, Data token"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Amount in Naira (₦)</label>
              <input
                type="number"
                placeholder="Amount (e.g. 15000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-emerald-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-xl bg-slate-950 p-2.5 text-white border border-slate-800 focus:outline-none focus:border-emerald-500"
              >
                <option value="Food">Food & Groceries</option>
                <option value="Power/Fuel">Power / Generator Fuel (PMS/Diesel)</option>
                <option value="Transport">Transport & BRT</option>
                <option value="Housing/Rent">Housing & Rent</option>
                <option value="Data/Airtime">Data & Airtime</option>
                <option value="Family">Family Support</option>
                <option value="Business">Business Inventory</option>
                <option value="Other">Other Expenses</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-emerald-950/40"
            >
              Add Expense
            </button>
          </form>

          {/* Savings target widget */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Emergency Fund Goal</span>
              <span className="text-emerald-400 font-mono font-bold">₦{currentSavings.toLocaleString()} / ₦{savingsTarget.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${(currentSavings / savingsTarget) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Aim for 3 months of basic living expenses kept in safe, high-yield instruments.
            </p>
          </div>
        </div>

        {/* Expenses Table & Breakdown */}
        <div className="md:col-span-2 space-y-4 rounded-3xl bg-slate-900 p-6 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">Recent Transactions & Records</h3>
            <span className="text-[11px] text-slate-400">{expenses.length} Records</span>
          </div>

          <div className="divide-y divide-slate-800/80 max-h-80 overflow-y-auto">
            {expenses.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs hover:bg-slate-950/30 transition-colors">
                <div>
                  <span className="font-bold text-white block">{item.title}</span>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] text-emerald-400">{item.category}</span>
                    <span className="text-slate-400 text-[10px]">{item.date}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="font-bold text-white font-mono">₦{item.amount.toLocaleString()}</span>
                  <button
                    onClick={() => deleteExpense(item.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Category Summary */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-300 block mb-2">Spending Breakdown by Category:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {Object.entries(categoryTotals).map(([cat, val]) => (
                <div key={cat} className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block truncate">{cat}</span>
                  <span className="font-bold text-white font-mono">₦{val.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
