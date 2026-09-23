import React, { useState, useEffect } from 'react';
import { IndianRupee, Sparkles } from 'lucide-react';
import { BUDGET_PRESETS } from '../../data/tripData';
import { formatINR } from '../../utils/pricing';

export default function BudgetSelector({ budget, onBudgetChange }) {
  const [customVal, setCustomVal] = useState(budget || 100000);

  useEffect(() => {
    setCustomVal(budget);
  }, [budget]);

  const handleCustomInput = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    setCustomVal(num);
    onBudgetChange(num);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 transition-all">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-7 h-7 rounded-full bg-emerald-100 text-primary-dark font-semibold text-sm flex items-center justify-center">
            4
          </span>
          <h2 className="text-xl font-bold text-slate-800 font-heading">
            Target Budget
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          Set your total trip budget. We will validate in real-time whether your selections fit or exceed this target.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Preset Budgets
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {BUDGET_PRESETS.map((preset) => {
            const isSelected = budget === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => {
                  onBudgetChange(preset.value);
                  setCustomVal(preset.value);
                }}
                className={`py-2.5 px-3 rounded-xl border text-sm font-semibold transition cursor-pointer text-center ${
                  isSelected
                    ? 'border-primary bg-primary text-white shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Budget Input */}
      <div className="pt-3 border-t border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>Or Enter Custom Budget (INR)</span>
          <span className="text-primary font-bold text-sm">
            Active: {formatINR(budget)}
          </span>
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
            ₹
          </span>
          <input
            type="number"
            min="1000"
            step="1000"
            placeholder="e.g. 150000"
            value={customVal || ''}
            onChange={handleCustomInput}
            className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition"
          />
        </div>
      </div>
    </div>
  );
}
