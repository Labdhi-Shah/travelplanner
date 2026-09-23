import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { PREFERENCES } from '../../data/tripData';

export default function PreferenceSelector({ preferences, onTogglePreference }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 transition-all">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-7 h-7 rounded-full bg-emerald-100 text-primary-dark font-semibold text-sm flex items-center justify-center">
            5
          </span>
          <h2 className="text-xl font-bold text-slate-800 font-heading">
            Travel Preferences & Mood
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          Select all vacation styles that appeal to you. We'll use these to customize your day-by-day itinerary.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PREFERENCES.map((pref) => {
          const isSelected = preferences.includes(pref.id);
          return (
            <button
              key={pref.id}
              type="button"
              onClick={() => onTogglePreference(pref.id)}
              className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary/5 text-primary-dark shadow-xs font-semibold'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{pref.icon}</span>
                <span className="text-sm font-medium">{pref.label}</span>
              </div>
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-primary border-primary text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
