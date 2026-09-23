import React from 'react';
import { Plus, Check, Clock, Sparkles, X } from 'lucide-react';
import { MOCK_ACTIVITIES } from '../../data/tripData';
import { formatINR } from '../../utils/pricing';

export default function ActivitySelector({
  selectedDestination,
  selectedActivities,
  onToggleActivity,
  adults,
  children
}) {
  const destKey = selectedDestination?.id || 'bali';
  const availableActivities = MOCK_ACTIVITIES[destKey] || MOCK_ACTIVITIES.bali;

  const totalTravelers = adults + children;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-primary-dark font-semibold text-sm flex items-center justify-center">
              9
            </span>
            <h2 className="text-xl font-bold text-slate-800 font-heading">
              Sightseeing & Experiences
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Hand-picked tours in <span className="font-semibold text-primary">{selectedDestination?.name}</span>. Add as many as you wish.
          </p>
        </div>

        {/* Selected activities count badge */}
        <div className="text-xs bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700 font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>{selectedActivities.length} Experience{selectedActivities.length === 1 ? '' : 's'} Selected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableActivities.map((activity) => {
          const isSelected = selectedActivities.some((a) => a.id === activity.id);
          const totalActivityPrice = activity.pricePerPerson * totalTravelers;

          return (
            <div
              key={activity.id}
              className={`rounded-xl border-2 overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-xs'
                  : 'border-slate-200/80 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex gap-3.5 p-3.5">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {activity.tag && (
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/70 text-white px-1.5 py-0.5 rounded backdrop-blur-xs">
                      {activity.tag}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-heading leading-tight mb-1">
                      {activity.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {activity.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{activity.duration}</span>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="px-3.5 py-2.5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 font-heading">
                    {formatINR(activity.pricePerPerson)}
                    <span className="text-[11px] font-normal text-slate-500"> / person</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Total: {formatINR(totalActivityPrice)} ({totalTravelers} pax)
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleActivity(activity)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                      : 'bg-primary text-white hover:bg-primary-light shadow-xs'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <X className="w-3.5 h-3.5" />
                      Remove
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      Add Activity
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
