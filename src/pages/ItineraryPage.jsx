import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, Trash2, Edit3, MapPin, Clock, 
  DollarSign, CheckSquare, Square, ChevronRight, HelpCircle, Save, X 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function ItineraryPage() {
  const { trips, addActivityToTrip, updateActivityInTrip, deleteActivityFromTrip } = useTravel();

  // Active Trip state (default to first trip)
  const [selectedTripId, setSelectedTripId] = useState(() => {
    return trips.length > 0 ? trips[0].id : '';
  });

  const trip = trips.find(t => t.id === selectedTripId);

  // Day filter state
  const [activeDay, setActiveDay] = useState(1);

  // Modal / Form States
  const [showModal, setShowModal] = useState(false);
  const [editingAct, setEditingAct] = useState(null); // Holds activity object if editing
  const [actTime, setActTime] = useState('09:00');
  const [actTitle, setActTitle] = useState('');
  const [actLocation, setActLocation] = useState('');
  const [actCost, setActCost] = useState('0');
  const [actNotes, setActNotes] = useState('');

  if (trips.length === 0) {
    return (
      <div className="bg-white p-16 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center min-h-[350px]">
        <HelpCircle size={40} className="text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-slate-800 font-heading">No Scheduled Trips Found</h3>
        <p className="text-slate-400 text-xs mt-2 max-w-sm">
          Please create a travel plan using the wizard to populate your daily timeline coordinator.
        </p>
      </div>
    );
  }

  // Calculate total duration in days
  const daysDiff = trip 
    ? Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) || 1 
    : 1;

  // Filter activities matching selected day
  const dailyActivities = trip?.activities
    ? trip.activities
        .filter(act => act.day === activeDay)
        .sort((a, b) => a.time.localeCompare(b.time))
    : [];

  const handleOpenAddModal = () => {
    setEditingAct(null);
    setActTime('09:00');
    setActTitle('');
    setActLocation('');
    setActCost('0');
    setActNotes('');
    setShowModal(true);
  };

  const handleOpenEditModal = (act) => {
    setEditingAct(act);
    setActTime(act.time);
    setActTitle(act.title);
    setActLocation(act.location);
    setActCost(act.cost.toString());
    setActNotes(act.notes);
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const actData = {
      day: activeDay,
      time: actTime,
      title: actTitle,
      location: actLocation,
      cost: Number(actCost),
      notes: actNotes
    };

    if (editingAct) {
      updateActivityInTrip(selectedTripId, editingAct.id, actData);
    } else {
      addActivityToTrip(selectedTripId, actData);
    }
    setShowModal(false);
  };

  const handleDeleteActivity = (actId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this stop from your schedule?")) {
      deleteActivityFromTrip(selectedTripId, actId);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Selector & Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-slate-400 text-xs font-semibold">Dashboard / Timeline Coordinator</p>
          <span className="text-xs text-slate-400 font-medium">Build, organize, and cost out your day-by-day travel schedule.</span>
        </div>

        {/* Trip Dropdown Selector */}
        <div className="flex items-center space-x-2 w-full sm:w-fit">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Trip:</span>
          <select
            value={selectedTripId}
            onChange={(e) => { setSelectedTripId(e.target.value); setActiveDay(1); }}
            className="flex-grow sm:flex-grow-0 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none"
          >
            {trips.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Days tabs left, timeline right */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Days Tabs (Vertical List) */}
        <aside className="md:col-span-1 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Days List</h3>
          
          {/* Horizontal scroll on mobile, vertical stack on desktop */}
          <div className="flex md:flex-col overflow-x-auto no-scrollbar gap-1.5 p-1 bg-white md:bg-transparent rounded-2xl border border-slate-100 md:border-0">
            {[...Array(daysDiff)].map((_, i) => {
              const dayNum = i + 1;
              const isActive = activeDay === dayNum;
              return (
                <button
                  key={dayNum}
                  onClick={() => setActiveDay(dayNum)}
                  className={`w-full text-left rounded-xl py-3 px-4 text-xs font-bold flex items-center justify-between shrink-0 transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/60 md:border-0'
                  }`}
                  style={{ minWidth: '80px' }}
                >
                  <span>Day {dayNum}</span>
                  <ChevronRight size={14} className="hidden md:block" />
                </button>
              );
            })}
          </div>
        </aside>

        {/* Timeline Events (Main Area) */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800">Day {activeDay} Schedule</h3>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                {dailyActivities.length} items listed
              </span>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="bg-primary hover:bg-primary-light text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <PlusCircle size={14} />
              <span>Add Activity</span>
            </button>
          </div>

          {/* Activities List */}
          {dailyActivities.length > 0 ? (
            <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-6 py-2">
              {dailyActivities.map((act) => (
                <div key={act.id} className="relative bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  {/* Circle Timeline Pin */}
                  <span className="absolute -left-[31px] top-5 w-4 h-4 rounded-full bg-accent border-2 border-white shadow-sm" />

                  {/* Left stop details */}
                  <div className="space-y-1.5 overflow-hidden">
                    <div className="flex items-center space-x-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                      <Clock size={12} className="text-slate-400" />
                      <span>{act.time}</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-slate-800">{act.title}</h4>
                    
                    <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-semibold">
                      <span className="flex items-center"><MapPin size={10} className="mr-0.5" /> {act.location}</span>
                      {act.cost > 0 && <span className="flex items-center text-primary"><DollarSign size={10} /> {act.cost} est. cost</span>}
                    </div>

                    {act.notes && (
                      <p className="text-[11px] text-slate-400 italic pt-1 leading-relaxed font-light">
                        "{act.notes}"
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-1.5 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => handleOpenEditModal(act)}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                      <Edit3 size={12} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteActivity(act.id, e)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty Timeline State */
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center min-h-[220px]">
              <Clock size={32} className="text-slate-300 mb-3" />
              <h4 className="font-heading font-bold text-sm text-slate-800">Timeline Empty for Day {activeDay}</h4>
              <p className="text-slate-400 text-[11px] mt-1.5 max-w-xs leading-relaxed">
                Add sight stops, checking reservations, restaurant reservations, or flight transit items.
              </p>
              <button
                onClick={handleOpenAddModal}
                className="mt-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Create Stop
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Add / Edit Activity Dialog Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-heading font-bold text-base text-slate-800">
                {editingAct ? 'Edit Stop Details' : 'Add New Timeline Stop'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs text-slate-600 font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</label>
                  <input
                    type="time"
                    required
                    value={actTime}
                    onChange={(e) => setActTime(e.target.value)}
                    className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Est. Cost ($)</label>
                  <input
                    type="number"
                    value={actCost}
                    onChange={(e) => setActCost(e.target.value)}
                    className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Activity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Check-in, Dinner at restaurant"
                  value={actTitle}
                  onChange={(e) => setActTitle(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location / Venue</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kyoto Plaza lobby"
                  value={actLocation}
                  onChange={(e) => setActLocation(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Notes / Reminders</label>
                <textarea
                  rows={3}
                  placeholder="Write checklist or directions..."
                  value={actNotes}
                  onChange={(e) => setActNotes(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-primary hover:bg-primary-light text-white rounded-xl font-semibold shadow-sm"
                >
                  Save Stop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
