import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Eye, Trash2, PlusCircle, Compass } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function MyTrips() {
  const navigate = useNavigate();
  const { trips, deleteTrip } = useTravel();

  const getStatusColor = (status) => {
    if (status === 'Ongoing') return 'bg-amber-100 text-amber-800 border-amber-200';
    if (status === 'Completed') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const handleDelete = (id, name, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm(`Are you sure you want to cancel and delete the trip "${name}"?`)) {
      deleteTrip(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-slate-400 text-xs font-semibold">Dashboard / My Trips</p>
          <span className="text-xs text-slate-400 font-medium">Keep track of your past, current and future voyages.</span>
        </div>

        <button
          onClick={() => navigate('/dashboard/create-trip')}
          className="bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-5 py-3 rounded-2xl flex items-center space-x-1.5 shadow-md"
        >
          <PlusCircle size={16} />
          <span>Plan New Journey</span>
        </button>
      </div>

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {/* Image banner */}
              <div className="relative h-44 overflow-hidden shrink-0">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Status tag */}
                <span className={`absolute top-4 left-4 border font-heading font-bold text-[9px] px-2.5 py-0.5 rounded-full shadow-sm ${
                  getStatusColor(trip.status)
                }`}>
                  {trip.status}
                </span>

                {/* Delete button */}
                <button
                  onClick={(e) => handleDelete(trip.id, trip.name, e)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-500 hover:text-red-500 hover:bg-white transition-colors shadow-sm"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Details body */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-800">{trip.name}</h3>
                  <div className="space-y-1.5 mt-2.5 text-xs text-slate-400 font-semibold">
                    <span className="flex items-center"><MapPin size={12} className="mr-1.5 text-slate-400" /> {trip.destinationName}, {trip.country}</span>
                    <span className="flex items-center"><Calendar size={12} className="mr-1.5 text-slate-400" /> {trip.startDate} to {trip.endDate}</span>
                    <span className="flex items-center"><Users size={12} className="mr-1.5 text-slate-400" /> {trip.travelers.adults} Adults {trip.travelers.children > 0 && `, ${trip.travelers.children} Children`}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Budget Cap</span>
                    <span className="text-sm font-bold text-primary">${trip.budget?.limit || 0}</span>
                  </div>
                  <Link
                    to={`/dashboard/trip/${trip.id}`}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-heading font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-1 transition-colors"
                  >
                    <Eye size={12} />
                    <span>View Itinerary</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-16 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center min-h-[350px]">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 shadow-sm">
            <Compass size={26} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 font-heading">No Travel Trips Planned Yet</h3>
          <p className="text-slate-400 text-xs mt-2 max-w-sm leading-relaxed">
            Your next adventure is waiting. Compile tour packages or define a custom schedule with the planner wizard.
          </p>
          <button
            onClick={() => navigate('/dashboard/create-trip')}
            className="mt-6 bg-primary hover:bg-primary-light text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-md"
          >
            Plan Your First Trip
          </button>
        </div>
      )}

    </div>
  );
}
