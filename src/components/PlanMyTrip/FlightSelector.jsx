import React from 'react';
import { Plane, ArrowRight, Clock, Check, ShieldCheck } from 'lucide-react';
import { MOCK_FLIGHTS, ORIGIN_CITIES, CABIN_CLASSES } from '../../data/tripData';
import { formatINR } from '../../utils/pricing';

export default function FlightSelector({
  selectedDestination,
  originCity,
  onOriginCityChange,
  departureDate,
  returnDate,
  adults,
  children,
  cabinClass,
  onCabinClassChange,
  selectedFlight,
  onSelectFlight
}) {
  const destKey = selectedDestination?.id || 'bali';
  const availableFlights = MOCK_FLIGHTS[destKey] || MOCK_FLIGHTS.bali;

  const currentCabin = CABIN_CLASSES.find((c) => c.id === cabinClass) || CABIN_CLASSES[0];
  const multiplier = currentCabin.multiplier;

  // Format readable date
  const formatDateDisplay = (str) => {
    if (!str) return 'Select Date';
    try {
      return new Date(str + 'T00:00:00').toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short'
      });
    } catch {
      return str;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 transition-all">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-7 h-7 rounded-full bg-emerald-100 text-primary-dark font-semibold text-sm flex items-center justify-center">
            7
          </span>
          <h2 className="text-xl font-bold text-slate-800 font-heading">
            Flight Selection
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          Route automatically connected to <span className="font-semibold text-primary">{selectedDestination?.name}, {selectedDestination?.country}</span>.
        </p>
      </div>

      {/* Flight Search Bar / Route Info */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* From City */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              From
            </label>
            <select
              value={originCity}
              onChange={(e) => onOriginCityChange(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 focus:outline-none focus:border-primary"
            >
              {ORIGIN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city} (India)
                </option>
              ))}
            </select>
          </div>

          {/* To City (Auto-populated from destination) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              To (Destination)
            </label>
            <div className="w-full px-3 py-2 bg-emerald-50/60 border border-emerald-200 rounded-lg text-sm font-semibold text-emerald-900 flex items-center justify-between">
              <span>{selectedDestination?.name}</span>
              <span className="text-xs bg-emerald-200/60 px-1.5 py-0.5 rounded text-emerald-800">
                {selectedDestination?.airportCode || 'DEST'}
              </span>
            </div>
          </div>

          {/* Dates Sync */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Departure / Return
            </label>
            <div className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span>{formatDateDisplay(departureDate)}</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span>{formatDateDisplay(returnDate)}</span>
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Travelers
            </label>
            <div className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
              {adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}
            </div>
          </div>
        </div>

        {/* Cabin Class Selector */}
        <div className="mt-4 pt-3 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Cabin Class:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {CABIN_CLASSES.map((cabin) => {
              const isCabinActive = cabinClass === cabin.id;
              return (
                <button
                  key={cabin.id}
                  type="button"
                  onClick={() => onCabinClassChange(cabin.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    isCabinActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cabin.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Flight Cards */}
      <div className="space-y-3">
        {availableFlights.map((flight) => {
          const isSelected = selectedFlight?.id === flight.id;
          const adjustedAdultPrice = Math.round(flight.priceAdult * multiplier);
          const adjustedChildPrice = Math.round((flight.priceChild || flight.priceAdult * 0.75) * multiplier);
          const flightTotalForParty = (adults * adjustedAdultPrice) + (children * adjustedChildPrice);

          return (
            <div
              key={flight.id}
              onClick={() => onSelectFlight(flight)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                  : 'border-slate-200/80 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Airline & Route Details */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-primary'
                  }`}>
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 text-base font-heading">
                        {flight.airline}
                      </h4>
                      <span className="text-xs text-slate-400 font-mono">
                        {flight.flightNumber}
                      </span>
                      {flight.tag && (
                        <span className="text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full bg-accent/20 text-slate-800">
                          {flight.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="font-semibold text-slate-700">
                        {originCity} → {selectedDestination?.name}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {flight.duration}
                      </span>
                      <span>•</span>
                      <span className={`font-semibold ${flight.stops === 'Non-stop' ? 'text-emerald-600' : 'text-slate-600'}`}>
                        {flight.stops}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timing Visual */}
                <div className="hidden lg:flex items-center gap-3 text-xs text-slate-600 px-3 py-1.5 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-bold text-slate-800">{flight.departureTime}</div>
                    <div className="text-[11px] text-slate-400">{originCity}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <div>
                    <div className="font-bold text-slate-800">{flight.arrivalTime}</div>
                    <div className="text-[11px] text-slate-400">{selectedDestination?.airportCode}</div>
                  </div>
                </div>

                {/* Price & Selection Button */}
                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <div className="text-lg font-bold text-slate-900 font-heading">
                      {formatINR(adjustedAdultPrice)}
                      <span className="text-xs font-normal text-slate-400"> / adult</span>
                    </div>
                    {children > 0 && (
                      <div className="text-[11px] text-slate-500">
                        Child: {formatINR(adjustedChildPrice)}
                      </div>
                    )}
                    <div className="text-xs font-semibold text-primary">
                      Total: {formatINR(flightTotalForParty)} ({adults + children} pax)
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        Selected
                      </>
                    ) : (
                      'Select Flight'
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
