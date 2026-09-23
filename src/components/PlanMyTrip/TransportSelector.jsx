import React from 'react';
import { Plane, Train, Bus, Car } from 'lucide-react';
import { TRANSPORTS } from '../../data/tripData';
import { formatINR } from '../../utils/pricing';

export default function TransportSelector({ transport, onTransportChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 transition-all">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-7 h-7 rounded-full bg-emerald-100 text-primary-dark font-semibold text-sm flex items-center justify-center">
            6
          </span>
          <h2 className="text-xl font-bold text-slate-800 font-heading">
            Transport Preference
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          Choose your primary transit mode. Selecting Flight unlocks dedicated flight schedules & cabin options.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TRANSPORTS.map((t) => {
          const isSelected = transport === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTransportChange(t.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary/5 text-primary-dark shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{t.icon}</span>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <div className="font-bold text-sm font-heading">{t.label}</div>
              <div className="text-[11px] text-slate-500 line-clamp-1 mb-2">{t.desc}</div>
              <div className="text-xs font-semibold text-primary">
                {t.id === 'Flight' ? 'Custom Flight' : `Est. ${formatINR(t.baseCost)}`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
