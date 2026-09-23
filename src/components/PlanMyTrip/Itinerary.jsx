import React from 'react';
import { 
  Calendar, MapPin, Plane, Hotel, Utensils, Sun, Sunrise, Sunset, 
  Sparkles, CheckCircle2, ChevronDown, Compass, Coffee, Plus 
} from 'lucide-react';

export default function Itinerary({
  destination,
  startDate,
  durationDays,
  hotel,
  flight,
  originCity,
  activities,
  preferences,
  transport,
  onOpenExtendModal
}) {
  // Helper to build real date strings for each day
  const getDayDate = (dayIndex) => {
    if (!startDate) return `Day ${dayIndex + 1}`;
    try {
      const d = new Date(startDate + 'T00:00:00');
      d.setDate(d.getDate() + dayIndex);
      return d.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
      });
    } catch {
      return `Day ${dayIndex + 1}`;
    }
  };

  // Generate dynamic days based on actual durationDays
  const daysList = Array.from({ length: Math.max(1, durationDays) }, (_, i) => i + 1);

  // Pool of activity highlights based on destination & user's added activities
  const userActivities = [...activities];
  const destHighlights = destination?.highlights || [
    'Scenic City Walking Tour',
    'Local Cultural Heritage Tour',
    'Panoramic Sunset Viewpoint',
    'Artisan Market & Shopping'
  ];

  return (
    <div id="trip-itinerary-section" className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-primary-dark font-bold text-xs uppercase tracking-wider">
              Bespoke Schedule
            </span>
            <span className="text-xs text-slate-400">
              {durationDays} Days / {Math.max(1, durationDays - 1)} Nights
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">
            Day-by-Day Itinerary for {destination?.name}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Tailored to your preferences ({preferences.length > 0 ? preferences.join(', ') : 'Relaxed exploration'}) and scheduled activities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenExtendModal && (
            <button
              type="button"
              onClick={onOpenExtendModal}
              className="px-3.5 py-2 rounded-xl bg-accent/20 hover:bg-accent/30 text-slate-900 border border-accent/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Add More Days</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-xs bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Dynamic {durationDays}-Day Plan</span>
          </div>
        </div>
      </div>

      {/* Days Timeline */}
      <div className="space-y-6 relative before:absolute before:top-4 before:bottom-4 before:left-4 md:before:left-5 before:w-0.5 before:bg-slate-200">
        {daysList.map((dayNum, idx) => {
          const isFirstDay = idx === 0;
          const isLastDay = idx === daysList.length - 1;
          const dayDate = getDayDate(idx);

          // Select matching activity if user picked any
          const assignedActivity = userActivities[idx % (userActivities.length || 1)];
          const fallbackHighlight = destHighlights[idx % destHighlights.length];

          return (
            <div key={dayNum} className="relative pl-10 md:pl-12">
              {/* Timeline marker node */}
              <div className={`absolute left-1.5 md:left-2.5 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-xs ${
                isFirstDay || isLastDay 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-slate-700 border-primary'
              }`}>
                {dayNum}
              </div>

              {/* Day Card */}
              <div className="bg-slate-50/80 rounded-2xl border border-slate-200/90 p-5 hover:border-primary/40 transition-colors shadow-xs">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200/70">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base font-extrabold text-slate-800 font-heading">
                      Day {dayNum}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-medium">
                      {dayDate}
                    </span>
                  </div>
                  <div className="text-xs text-primary font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{destination?.name}, {destination?.country}</span>
                  </div>
                </div>

                {/* Day Schedule Slots: Morning, Afternoon, Evening */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Morning Slot */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-amber-700 mb-1.5">
                        <Sunrise className="w-4 h-4 text-amber-500" />
                        <span>Morning</span>
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {isFirstDay ? (
                          <>
                            {transport === 'Flight' && flight ? (
                              <span className="block font-semibold text-primary">
                                ✈ {originCity} → {destination?.name} ({flight.flightNumber})
                              </span>
                            ) : (
                              <span className="block font-semibold text-primary">
                                🚆 Scenic departure to {destination?.name}
                              </span>
                            )}
                            Arrival & private airport transfer to accommodation.
                          </>
                        ) : (
                          <>
                            <span className="font-semibold block text-slate-800">
                              🥐 Breakfast at {hotel ? hotel.name.split(' ')[0] : 'Hotel'}
                            </span>
                            {assignedActivity ? assignedActivity.name : `Morning guided exploration: ${fallbackHighlight}.`}
                          </>
                        )}
                      </p>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1 pt-2 border-t border-slate-100">
                      <Coffee className="w-3 h-3" />
                      <span>{isFirstDay ? 'Transit & Check-in' : '08:30 AM — 12:00 PM'}</span>
                    </div>
                  </div>

                  {/* Afternoon Slot */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-blue-700 mb-1.5">
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span>Afternoon</span>
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {isFirstDay ? (
                          <>
                            <span className="font-semibold block text-slate-800">
                              🏨 Check-in to {hotel ? hotel.name : 'Resort'}
                            </span>
                            Unpack, relax by the pool or beachfront lounge, and refresh.
                          </>
                        ) : isLastDay ? (
                          <>
                            <span className="font-semibold block text-slate-800">
                              🛍️ Souvenir & Artisan Shopping
                            </span>
                            Last-minute sightseeing and authentic local gifts shopping.
                          </>
                        ) : (
                          <>
                            <span className="font-semibold block text-slate-800">
                              🏞️ {destHighlights[(idx + 1) % destHighlights.length]}
                            </span>
                            Sightseeing, photography, and exploring cultural landmarks.
                          </>
                        )}
                      </p>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1 pt-2 border-t border-slate-100">
                      <Compass className="w-3 h-3" />
                      <span>01:00 PM — 04:30 PM</span>
                    </div>
                  </div>

                  {/* Evening Slot */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-indigo-700 mb-1.5">
                        <Sunset className="w-4 h-4 text-orange-500" />
                        <span>Evening</span>
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {isLastDay ? (
                          <>
                            <span className="font-semibold block text-primary">
                              ✈ Hotel Check-out & Return Journey
                            </span>
                            Airport transfer for return flight back home to {originCity}.
                          </>
                        ) : (
                          <>
                            <span className="font-semibold block text-slate-800">
                              🍽️ Coastal Dinner & Night Ambiance
                            </span>
                            Gourmet regional cuisine dining and sunset stroll along the promenade.
                          </>
                        )}
                      </p>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1 pt-2 border-t border-slate-100">
                      <Utensils className="w-3 h-3" />
                      <span>06:00 PM — 10:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Hotel badge for the night */}
                {!isLastDay && hotel && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Hotel className="w-3.5 h-3.5 text-primary" />
                      Overnight Stay: <strong className="text-slate-700">{hotel.name}</strong>
                    </span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      Included in Hotel Total
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Extend Trip Callout Banner immediately after final day */}
        {onOpenExtendModal && (
          <div className="relative pl-10 md:pl-12 pt-2">
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 rounded-2xl border border-emerald-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-white px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                  Trip Completed / Ending Day {durationDays}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                  Want to stay longer in {destination?.name}?
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 max-w-md leading-relaxed">
                  Add +1, +2, +3, +5, +7, or custom days. We will automatically generate Day {durationDays + 1}+ itinerary activities and extend your stay.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenExtendModal}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 text-accent" />
                <span>Add More Days</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
