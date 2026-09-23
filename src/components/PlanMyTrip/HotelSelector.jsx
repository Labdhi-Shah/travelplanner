import React from 'react';
import { Hotel, Star, Check, Sparkles, MapPin, Calendar, Users, Bed } from 'lucide-react';
import { MOCK_HOTELS } from '../../data/tripData';
import { formatINR } from '../../utils/pricing';

export default function HotelSelector({
  selectedDestination,
  checkInDate,
  checkOutDate,
  hotelNights,
  rooms,
  adults,
  children,
  selectedHotel,
  onSelectHotel
}) {
  const destKey = selectedDestination?.id || 'bali';
  const availableHotels = MOCK_HOTELS[destKey] || MOCK_HOTELS.bali;

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

  const totalGuests = adults + children;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 transition-all">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-7 h-7 rounded-full bg-emerald-100 text-primary-dark font-semibold text-sm flex items-center justify-center">
            8
          </span>
          <h2 className="text-xl font-bold text-slate-800 font-heading">
            Hotel & Resort Accommodation
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          Showing verified stays in <span className="font-semibold text-primary">{selectedDestination?.name}, {selectedDestination?.country}</span>.
        </p>
      </div>

      {/* Booking Parameters Header Pill */}
      <div className="bg-slate-50 rounded-xl p-3 mb-5 border border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>Destination: <strong>{selectedDestination?.name}</strong></span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>Check-in: <strong>{formatDateDisplay(checkInDate)}</strong></span>
          <span className="text-slate-300">|</span>
          <span>Check-out: <strong>{formatDateDisplay(checkOutDate)}</strong></span>
        </div>
        <div className="flex items-center gap-3 font-medium">
          <span className="flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-primary" />
            <strong>{rooms} Room{rooms > 1 ? 's' : ''}</strong>
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-primary" />
            <strong>{totalGuests} Guest{totalGuests > 1 ? 's' : ''}</strong>
          </span>
        </div>
      </div>

      {/* Hotel Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableHotels.map((hotel) => {
          const isSelected = selectedHotel?.id === hotel.id;
          const hotelTotal = hotel.pricePerNight * hotelNights * rooms;

          return (
            <div
              key={hotel.id}
              onClick={() => onSelectHotel(hotel)}
              className={`group rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md flex flex-col justify-between ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-sm'
                  : 'border-slate-200/80 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Stars Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 text-amber-400 text-xs">
                    {Array.from({ length: hotel.stars }).map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-amber-400" />
                    ))}
                    <span className="text-white text-[11px] font-bold ml-1">
                      {hotel.stars}-Star
                    </span>
                  </div>

                  {/* Checkmark indicator */}
                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 bg-primary text-white p-1 rounded-full shadow-md flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                  )}

                  {/* Location overlay */}
                  <div className="absolute bottom-2 left-2.5 text-white">
                    <p className="text-xs text-slate-200 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-accent" />
                      {hotel.location}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-base font-heading mb-2 leading-snug">
                    {hotel.name}
                  </h3>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hotel.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing breakdown footer */}
              <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 font-heading">
                    {formatINR(hotel.pricePerNight)}
                    <span className="text-xs font-normal text-slate-500"> / night</span>
                  </div>
                  <div className="text-[11px] text-primary font-semibold">
                    Total: {formatINR(hotelTotal)} ({hotelNights}n × {rooms}r)
                  </div>
                </div>

                <button
                  type="button"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    isSelected
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Selected
                    </>
                  ) : (
                    'Select Hotel'
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
