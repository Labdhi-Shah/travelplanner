import React from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, Plane, Hotel, Compass, Car } from 'lucide-react';
import { formatINR } from '../../utils/pricing';

export default function CostSummary({
  flightTotal,
  hotelTotal,
  activitiesTotal,
  transportCost,
  finalTripCost,
  budget,
  transportMode
}) {
  const isWithinBudget = finalTripCost <= budget;
  const difference = Math.abs(budget - finalTripCost);
  const budgetPercentage = budget > 0 ? Math.min(Math.round((finalTripCost / budget) * 100), 100) : 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 mb-5 transition-all">
      <h3 className="text-base font-bold text-slate-800 font-heading mb-4 flex items-center justify-between">
        <span>Cost Breakdown</span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          Real-time
        </span>
      </h3>

      {/* Itemized list */}
      <div className="space-y-2.5 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5 text-primary" />
            Flight Total
          </span>
          <span className="font-semibold text-slate-800">{formatINR(flightTotal)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Hotel className="w-3.5 h-3.5 text-amber-600" />
            Hotel Total
          </span>
          <span className="font-semibold text-slate-800">{formatINR(hotelTotal)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            Activities Total
          </span>
          <span className="font-semibold text-slate-800">{formatINR(activitiesTotal)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-purple-600" />
            Transit ({transportMode})
          </span>
          <span className="font-semibold text-slate-800">{formatINR(transportCost)}</span>
        </div>

        {/* Final Trip Cost Total Line */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-sm">
          <span className="font-bold text-slate-900 font-heading">
            Final Trip Cost
          </span>
          <span className="font-extrabold text-base text-primary-dark font-heading">
            {formatINR(finalTripCost)}
          </span>
        </div>
      </div>

      {/* Budget Validation Alert Box */}
      <div
        className={`p-3.5 rounded-xl border mb-3 transition-all ${
          isWithinBudget
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
            : 'bg-rose-50/80 border-rose-200 text-rose-900'
        }`}
      >
        <div className="flex items-start gap-2 mb-2">
          {isWithinBudget ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="text-xs font-bold font-heading">
              {isWithinBudget
                ? 'Your trip is within budget.'
                : `Your trip is ${formatINR(difference)} over budget.`}
            </div>
            <p className="text-[11px] opacity-80 mt-0.5">
              {isWithinBudget
                ? 'Great planning! All selected options stay under your target.'
                : 'Consider adjusting your cabin, hotel, or activities to meet your target.'}
            </p>
          </div>
        </div>

        {/* Comparison figures */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/5 text-center text-[11px]">
          <div>
            <span className="block opacity-70">Budget</span>
            <strong className="font-bold">{formatINR(budget)}</strong>
          </div>
          <div>
            <span className="block opacity-70">Estimated Cost</span>
            <strong className="font-bold">{formatINR(finalTripCost)}</strong>
          </div>
          <div>
            <span className="block opacity-70">
              {isWithinBudget ? 'Remaining' : 'Over Budget'}
            </span>
            <strong
              className={`font-bold ${
                isWithinBudget ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {formatINR(difference)}
            </strong>
          </div>
        </div>
      </div>

      {/* Budget Progress Meter */}
      <div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
          <span>Budget Utilized</span>
          <span className="font-bold text-slate-700">{Math.round((finalTripCost / (budget || 1)) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isWithinBudget ? 'bg-primary' : 'bg-rose-500'
            }`}
            style={{ width: `${Math.min(100, Math.round((finalTripCost / (budget || 1)) * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
