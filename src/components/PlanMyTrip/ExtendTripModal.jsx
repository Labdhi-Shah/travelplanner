import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Plus, Clock, Hotel, Plane, ArrowRight, 
  CheckCircle2, Sparkles, X, AlertCircle 
} from 'lucide-react';
import { formatINR } from '../../utils/pricing';

const DAY_PRESETS = [1, 2, 3, 5, 7];

export default function ExtendTripModal({
  isOpen,
  onClose,
  startDate,
  endDate,
  durationDays,
  hotelNights,
  selectedHotel,
  rooms,
  finalTripCost,
  onConfirmExtend
}) {
  const [selectedPreset, setSelectedPreset] = useState(3);
  const [customDays, setCustomDays] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Determine active additional days
  const additionalDays = useMemo(() => {
    if (isCustom) {
      const parsed = parseInt(customDays, 10);
      return isNaN(parsed) || parsed < 1 ? 1 : Math.min(parsed, 60);
    }
    return selectedPreset;
  }, [isCustom, customDays, selectedPreset]);

  // Format date display helper
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Calculate new end date and day immediately after current end date
  const { nextDayDateStr, newEndDateStr, newDuration, newHotelNights, additionalHotelCost, newEstimatedCost } = useMemo(() => {
    if (!endDate) {
      return {
        nextDayDateStr: '',
        newEndDateStr: '',
        newDuration: durationDays + additionalDays,
        newHotelNights: hotelNights + additionalDays,
        additionalHotelCost: 0,
        newEstimatedCost: finalTripCost
      };
    }

    const currentEnd = new Date(endDate + 'T00:00:00');
    
    // Day immediately after current end date
    const nextDay = new Date(currentEnd.getTime() + 24 * 60 * 60 * 1000);
    const nextDayFormatted = nextDay.toISOString().split('T')[0];

    // New end date after adding additionalDays
    const newEnd = new Date(currentEnd.getTime() + additionalDays * 24 * 60 * 60 * 1000);
    const newEndFormatted = newEnd.toISOString().split('T')[0];

    // Recalculate duration and nights
    const start = new Date(startDate + 'T00:00:00');
    const diffDays = Math.round((newEnd.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const duration = diffDays + 1;
    const nights = diffDays;

    // Additional hotel cost
    const nightlyRate = selectedHotel?.pricePerNight || 0;
    const extraHotelCost = nightlyRate * additionalDays * (rooms || 1);
    const estimatedNewTotal = finalTripCost + extraHotelCost;

    return {
      nextDayDateStr: nextDayFormatted,
      newEndDateStr: newEndFormatted,
      newDuration: duration,
      newHotelNights: nights,
      additionalHotelCost: extraHotelCost,
      newEstimatedCost: estimatedNewTotal
    };
  }, [startDate, endDate, durationDays, hotelNights, additionalDays, selectedHotel, rooms, finalTripCost]);

  const handleSelectPreset = (days) => {
    setIsCustom(false);
    setSelectedPreset(days);
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setCustomDays(val);
    setIsCustom(true);
  };

  const handleConfirm = () => {
    if (!newEndDateStr) return;
    onConfirmExtend(newEndDateStr, additionalDays, additionalHotelCost);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-primary-dark flex items-center justify-center font-bold text-xl shrink-0">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-primary bg-primary/5 px-2.5 py-0.5 rounded-full">
                Flexible Vacation Planning
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-0.5">
                Extend Trip & Add More Days
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
            Want to explore longer? Add extra days starting immediately after your current departure. Your start date stays untouched while hotel nights and itinerary automatically extend.
          </p>

          {/* Current vs New Dates Comparison Banner */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/60">
              <span className="text-slate-500">Current Trip Duration:</span>
              <strong className="text-slate-800 font-bold">
                {formatDateDisplay(startDate)} → {formatDateDisplay(endDate)} ({durationDays} Days)
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">New Days Start From:</span>
              <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded text-[11px]">
                {formatDateDisplay(nextDayDateStr)} (Day {durationDays + 1})
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
              <span className="font-bold text-slate-700">Updated Trip Window:</span>
              <strong className="text-emerald-700 font-bold text-sm font-heading">
                {formatDateDisplay(startDate)} → {formatDateDisplay(newEndDateStr)} ({newDuration} Days)
              </strong>
            </div>
          </div>

          {/* Select Additional Days Presets */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Select How Many Days to Add
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {DAY_PRESETS.map((days) => {
                const isActive = !isCustom && selectedPreset === days;
                return (
                  <button
                    key={days}
                    type="button"
                    onClick={() => handleSelectPreset(days)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer text-center ${
                      isActive
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                  >
                    +{days} Day{days > 1 ? 's' : ''}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer text-center ${
                  isCustom
                    ? 'border-primary bg-primary text-white shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                }`}
              >
                Custom
              </button>
            </div>

            {/* Custom Days Input */}
            {isCustom && (
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="number"
                  min="1"
                  max="60"
                  placeholder="e.g. 4"
                  value={customDays}
                  onChange={handleCustomChange}
                  className="w-28 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-primary"
                />
                <span className="text-xs text-slate-500 font-medium">Additional days</span>
              </div>
            )}
          </div>

          {/* Dynamic Recalculations Breakdown */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 mb-6 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                Extended Duration
              </span>
              <span className="font-bold text-slate-800">
                {durationDays} Days + {additionalDays} Days = <strong>{newDuration} Days</strong>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-1.5">
                <Hotel className="w-3.5 h-3.5 text-amber-600" />
                Hotel Nights Recalculation
              </span>
              <span className="font-bold text-slate-800">
                {hotelNights} Nights + {additionalDays} = <strong>{newHotelNights} Nights</strong>
              </span>
            </div>

            {selectedHotel && (
              <div className="flex items-center justify-between pt-1 border-t border-emerald-200/50">
                <span className="text-slate-600">
                  Additional Hotel Cost ({additionalDays}n × {formatINR(selectedHotel.pricePerNight)})
                </span>
                <span className="font-bold text-slate-900">
                  +{formatINR(additionalHotelCost)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-emerald-200 text-sm">
              <span className="font-extrabold text-slate-900 font-heading">
                Updated Total Trip Cost
              </span>
              <span className="font-black text-primary-dark font-heading text-base">
                {formatINR(newEstimatedCost)}
              </span>
            </div>
          </div>

          {/* Flight Return Date Advisory */}
          <div className="p-3 bg-blue-50/80 border border-blue-200/70 rounded-xl flex items-start gap-2 text-[11px] text-blue-900 mb-6">
            <Plane className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block">Return Flight Notice:</strong>
              Your return flight departure date will adjust to <strong>{formatDateDisplay(newEndDateStr)}</strong> to match your new return date.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="py-3 px-4 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Extend Trip to {newDuration} Days</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
