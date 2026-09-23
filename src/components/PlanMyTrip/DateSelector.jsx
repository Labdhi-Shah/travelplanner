import React from 'react';
import { Calendar, AlertCircle, Clock, Moon } from 'lucide-react';

export default function DateSelector({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  durationDays,
  hotelNights,
  dateError
}) {
  // Format readable dates for display (e.g., 05 Oct 2026)
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return 'Select Date';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 transition-all">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-7 h-7 rounded-full bg-emerald-100 text-primary-dark font-semibold text-sm flex items-center justify-center">
            2
          </span>
          <h2 className="text-xl font-bold text-slate-800 font-heading">
            Trip Dates & Duration
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          Pick your travel window. Duration and hotel nights calculate automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            Start Date *
          </label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Departure: <span className="font-semibold text-slate-700">{formatDisplayDate(startDate)}</span>
          </p>
        </div>

        {/* End Date */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            End Date *
          </label>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Return: <span className="font-semibold text-slate-700">{formatDisplayDate(endDate)}</span>
          </p>
        </div>
      </div>

      {/* Date Validation Error Alert */}
      {dateError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-red-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{dateError}</span>
        </div>
      )}

      {/* Dynamic Summary Badges */}
      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-primary flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Trip Duration
            </span>
            <p className="text-lg font-bold text-slate-800 font-heading">
              {durationDays > 0 ? `${durationDays} Days` : '—'}
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Hotel Nights
            </span>
            <p className="text-lg font-bold text-slate-800 font-heading">
              {hotelNights > 0 ? `${hotelNights} Nights` : '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
