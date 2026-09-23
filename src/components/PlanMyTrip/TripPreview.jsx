import React from 'react';
import { 
  MapPin, Calendar, Users, Plane, Hotel, Compass, 
  Bookmark, Eye, CheckCircle2, AlertTriangle, ArrowRight, Sparkles 
} from 'lucide-react';
import { formatINR } from '../../utils/pricing';

export default function TripPreview({
  destination,
  startDate,
  endDate,
  durationDays,
  hotelNights,
  adults,
  children,
  tripType,
  flight,
  hotel,
  activities,
  flightTotal,
  hotelTotal,
  activitiesTotal,
  transportCost,
  finalTripCost,
  budget,
  onGenerateTrip,
  onViewItinerary,
  onSaveTrip,
  isGenerated,
  hasSavedTrip,
  onRestoreTrip,
  onProceedToPayment,
  onOpenExtendModal
}) {
  const isWithinBudget = finalTripCost <= budget;
  const difference = Math.abs(budget - finalTripCost);

  // Format date helper
  const formatDate = (str) => {
    if (!str) return '—';
    try {
      return new Date(str + 'T00:00:00').toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return str;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden sticky top-24 transition-all">
      {/* Header Banner with Destination Image */}
      <div className="relative h-44 w-full bg-slate-900">
        <img
          src={destination?.image || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'}
          alt={destination?.name || 'Destination'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Live Trip Preview Tag */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 flex items-center gap-1.5 shadow-xs">
          <Sparkles className="w-3 h-3 text-accent" />
          <span>LIVE TRIP PREVIEW</span>
        </div>

        {hasSavedTrip && (
          <button
            type="button"
            onClick={onRestoreTrip}
            className="absolute top-3 right-3 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full hover:bg-primary-light transition flex items-center gap-1 shadow-md cursor-pointer"
          >
            ↺ Restore Saved
          </button>
        )}

        {/* Destination & Country Overlay */}
        <div className="absolute bottom-3 left-3 text-white">
          <span className="text-[11px] uppercase tracking-widest text-accent font-semibold block">
            {destination?.country}
          </span>
          <h2 className="text-2xl font-black font-heading tracking-wide uppercase drop-shadow-sm">
            {destination?.name}
          </h2>
        </div>
      </div>

      {/* Overview Metadata Pills */}
      <div className="p-4 bg-slate-50 border-b border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-white p-2 rounded-lg border border-slate-200/60">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
            Duration
          </span>
          <strong className="font-bold text-slate-800 text-xs">
            {durationDays} Days
          </strong>
        </div>

        <div className="bg-white p-2 rounded-lg border border-slate-200/60">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
            Travelers
          </span>
          <strong className="font-bold text-slate-800 text-xs">
            {adults + children} ({tripType})
          </strong>
        </div>

        <div className="bg-white p-2 rounded-lg border border-slate-200/60">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
            Hotel Stay
          </span>
          <strong className="font-bold text-slate-800 text-xs">
            {hotelNights} Nights
          </strong>
        </div>
      </div>

      {/* Dates banner */}
      <div className="px-5 py-2.5 bg-emerald-50/50 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-950 font-medium">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>{formatDate(startDate)}</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span>{formatDate(endDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">{durationDays} Days</span>
          {onOpenExtendModal && (
            <button
              type="button"
              onClick={onOpenExtendModal}
              className="text-[11px] text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded-md font-bold transition cursor-pointer"
            >
              + Extend
            </button>
          )}
        </div>
      </div>

      {/* Selections breakdown */}
      <div className="p-5 space-y-3 text-xs">
        {/* Selected Flight */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <Plane className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block">
                {flight ? `${flight.airline} (${flight.flightNumber})` : 'No Flight Selected'}
              </span>
              <span className="text-[11px] text-slate-400">
                {flight ? flight.stops : 'Select a flight in Step 7'}
              </span>
            </div>
          </div>
          <span className="font-bold text-slate-800 font-mono">
            {formatINR(flightTotal)}
          </span>
        </div>

        {/* Selected Hotel */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <Hotel className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block line-clamp-1">
                {hotel ? hotel.name : 'No Hotel Selected'}
              </span>
              <span className="text-[11px] text-slate-400">
                {hotel ? `${hotelNights} Nights stay` : 'Select a hotel in Step 8'}
              </span>
            </div>
          </div>
          <span className="font-bold text-slate-800 font-mono">
            {formatINR(hotelTotal)}
          </span>
        </div>

        {/* Selected Activities */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <Compass className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block">
                {activities.length > 0 ? `${activities.length} Activities Selected` : 'No Activities Added'}
              </span>
              <span className="text-[11px] text-slate-400">
                {activities.length > 0 ? activities.map(a => a.name.split(' ')[0]).join(', ') : 'Add tours in Step 9'}
              </span>
            </div>
          </div>
          <span className="font-bold text-slate-800 font-mono">
            {formatINR(activitiesTotal)}
          </span>
        </div>

        {/* Total Price Callout */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Cost
            </span>
            <span className="text-xl font-extrabold text-primary-dark font-heading">
              {formatINR(finalTripCost)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">
              Budget: {formatINR(budget)}
            </span>
            <span className={`text-xs font-bold ${isWithinBudget ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isWithinBudget ? `Remaining: ${formatINR(difference)}` : `Over: ${formatINR(difference)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
        <button
          type="button"
          onClick={onGenerateTrip}
          className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span>{isGenerated ? 'Regenerate Itinerary' : 'Generate My Trip'}</span>
        </button>

        {onProceedToPayment && (
          <button
            type="button"
            onClick={onProceedToPayment}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Proceed to Payment ({formatINR(finalTripCost)})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        {onOpenExtendModal && (
          <button
            type="button"
            onClick={onOpenExtendModal}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Extend Trip / Add More Days</span>
          </button>
        )}

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={onViewItinerary}
            className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:border-primary text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50"
          >
            <Eye className="w-3.5 h-3.5 text-primary" />
            <span>View Itinerary</span>
          </button>

          <button
            type="button"
            onClick={onSaveTrip}
            className="py-2.5 px-3 rounded-xl bg-accent/20 hover:bg-accent/30 text-slate-900 border border-accent/40 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-700" />
            <span>Save Trip</span>
          </button>
        </div>
      </div>
    </div>
  );
}
