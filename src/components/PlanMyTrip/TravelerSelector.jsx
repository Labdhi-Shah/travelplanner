import React from 'react';
import { Plus, Minus, Users, Bed, UserCheck } from 'lucide-react';
import { TRIP_TYPES } from '../../data/tripData';

export default function TravelerSelector({
  adults,
  children,
  rooms,
  tripType,
  onAdultsChange,
  onChildrenChange,
  onRoomsChange,
  onTripTypeChange
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 transition-all">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-7 h-7 rounded-full bg-emerald-100 text-primary-dark font-semibold text-sm flex items-center justify-center">
            3
          </span>
          <h2 className="text-xl font-bold text-slate-800 font-heading">
            Travelers & Room Configuration
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          Configure party size and rooms. Counter limits ensure at least 1 adult and 1 room.
        </p>
      </div>

      {/* Trip Type Cards */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-primary" />
          Trip Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {TRIP_TYPES.map((type) => {
            const isSelected = tripType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => onTripTypeChange(type.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary-dark shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{type.icon}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <div className="font-bold text-sm font-heading">{type.label}</div>
                <div className="text-[11px] text-slate-500 leading-tight line-clamp-1">{type.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Traveler Counters: Adults, Children, Rooms */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
        {/* Adults Counter */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold text-slate-700 block uppercase tracking-wider">
                Adults
              </span>
              <span className="text-[11px] text-slate-400">Age 12+ years</span>
            </div>
            <Users className="w-4 h-4 text-primary" />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              disabled={adults <= 1}
              onClick={() => onAdultsChange(Math.max(1, adults - 1))}
              className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
              aria-label="Decrease adults"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-lg font-bold text-slate-800 font-heading">
              {adults}
            </span>
            <button
              type="button"
              onClick={() => onAdultsChange(adults + 1)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 transition cursor-pointer shadow-xs"
              aria-label="Increase adults"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Children Counter */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold text-slate-700 block uppercase tracking-wider">
                Children
              </span>
              <span className="text-[11px] text-slate-400">Age 2-11 years</span>
            </div>
            <Users className="w-4 h-4 text-accent" />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              disabled={children <= 0}
              onClick={() => onChildrenChange(Math.max(0, children - 1))}
              className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
              aria-label="Decrease children"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-lg font-bold text-slate-800 font-heading">
              {children}
            </span>
            <button
              type="button"
              onClick={() => onChildrenChange(children + 1)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 transition cursor-pointer shadow-xs"
              aria-label="Increase children"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Rooms Counter */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold text-slate-700 block uppercase tracking-wider">
                Rooms
              </span>
              <span className="text-[11px] text-slate-400">Hotel accommodation</span>
            </div>
            <Bed className="w-4 h-4 text-primary-light" />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              disabled={rooms <= 1}
              onClick={() => onRoomsChange(Math.max(1, rooms - 1))}
              className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
              aria-label="Decrease rooms"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-lg font-bold text-slate-800 font-heading">
              {rooms}
            </span>
            <button
              type="button"
              onClick={() => onRoomsChange(rooms + 1)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 transition cursor-pointer shadow-xs"
              aria-label="Increase rooms"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
