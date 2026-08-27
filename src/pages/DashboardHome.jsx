import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Compass, Map, MapPin, Calendar, Users, 
  ArrowRight, Landmark, Globe, Sparkles, CheckCircle2 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user, trips } = useTravel();

  // Compute travel statistics
  const totalTrips = trips.length;
  const upcomingTrips = trips.filter(t => t.status === 'Upcoming').length;
  const completedTrips = trips.filter(t => t.status === 'Completed').length;
  
  // Calculate unique countries and destinations visited
  const allDestinations = trips.map(t => t.destinationName);
  const placesVisited = [...new Set(allDestinations)].length;
  const uniqueCountries = [...new Set(trips.map(t => t.country))].length;

  // Find the primary upcoming trip to display as a featured card
  const featuredUpcoming = trips.find(t => t.status === 'Upcoming') || trips[0];
  const recentTrips = trips.filter(t => t.id !== (featuredUpcoming ? featuredUpcoming.id : ''));

  return (
    <div className="space-y-8">
      
      {/* 1. Welcome Card */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-2 left-[40%] w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
        
        <div className="space-y-2 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight flex items-center gap-2">
            Good Morning, {user.name.split(' ')[0]} 👋
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm font-light max-w-md">
            Ready to explore? Discover exotic destinations or build custom travel schedules from your control panel.
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard/create-trip')}
          className="relative z-10 bg-accent hover:bg-accent-light text-primary-dark font-heading font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5"
        >
          Plan New Trip
        </button>
      </section>

      {/* 2. Stat Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Trips */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Compass size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Trips</span>
            <span className="text-lg sm:text-xl font-bold text-slate-800 mt-0.5 block">{totalTrips}</span>
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
            <Calendar size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Upcoming</span>
            <span className="text-lg sm:text-xl font-bold text-slate-800 mt-0.5 block">{upcomingTrips}</span>
          </div>
        </div>

        {/* Places Visited */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <Landmark size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Cities Visited</span>
            <span className="text-lg sm:text-xl font-bold text-slate-800 mt-0.5 block">{placesVisited}</span>
          </div>
        </div>

        {/* Countries Explored */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Globe size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Countries</span>
            <span className="text-lg sm:text-xl font-bold text-slate-800 mt-0.5 block">{uniqueCountries}</span>
          </div>
        </div>

      </section>

      {/* 3. Main content splitting */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Featured Upcoming Trip */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-heading font-bold text-slate-800 text-base sm:text-lg flex items-center gap-1.5">
              <Sparkles size={18} className="text-accent" /> Upcoming Adventure
            </h3>
            {featuredUpcoming && (
              <Link 
                to={`/dashboard/trip/${featuredUpcoming.id}`} 
                className="text-xs font-semibold text-primary hover:text-accent flex items-center space-x-0.5"
              >
                <span>Full Details</span>
                <span>→</span>
              </Link>
            )}
          </div>

          {featuredUpcoming ? (
            <motion.div 
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200/80 group flex flex-col justify-between h-[360px]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative h-48 overflow-hidden shrink-0">
                <img
                  src={featuredUpcoming.image}
                  alt={featuredUpcoming.name}
                  className="w-full h-full object-cover transition-transform duration-75 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-accent text-primary-dark font-heading font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
                  Upcoming Trip
                </span>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-bold font-heading text-slate-800">{featuredUpcoming.name}</h4>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-semibold mt-1">
                    <span className="flex items-center"><MapPin size={12} className="mr-1" /> {featuredUpcoming.destinationName}, {featuredUpcoming.country}</span>
                    <span className="flex items-center"><Calendar size={12} className="mr-1" /> {featuredUpcoming.startDate} to {featuredUpcoming.endDate}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[...Array(featuredUpcoming.travelers.adults)].map((_, i) => (
                      <span key={i} className="w-7 h-7 rounded-full bg-primary/20 border border-white text-primary text-[10px] font-bold flex items-center justify-center">
                        U
                      </span>
                    ))}
                    {featuredUpcoming.travelers.children > 0 && (
                      <span className="w-7 h-7 rounded-full bg-accent/25 border border-white text-primary text-[10px] font-bold flex items-center justify-center">
                        +{featuredUpcoming.travelers.children}C
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/dashboard/trip/${featuredUpcoming.id}`}
                    className="bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    View Trip Dashboard
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center h-[360px]">
              <Calendar size={40} className="text-slate-300 mb-4" />
              <h4 className="font-heading font-bold text-slate-800">No Upcoming Trips Yet</h4>
              <p className="text-slate-400 text-xs mt-1.5 max-w-xs leading-relaxed">
                Your next adventure is waiting. Design a custom travel itinerary and budget plan right now.
              </p>
              <button
                onClick={() => navigate('/dashboard/create-trip')}
                className="mt-5 bg-primary hover:bg-primary-light text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md"
              >
                Plan Your First Trip
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Recent Trips list & quick links */}
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-slate-800 text-base sm:text-lg">Recent Explorations</h3>
          
          <div className="space-y-4">
            {recentTrips.length > 0 ? (
              recentTrips.slice(0, 3).map((trip) => (
                <div key={trip.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-grow overflow-hidden">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-800 truncate">{trip.name}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{trip.destinationName}, {trip.country}</span>
                    <span className="inline-block text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-1">
                      {trip.status}
                    </span>
                  </div>
                  <Link
                    to={`/dashboard/trip/${trip.id}`}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors"
                  >
                    →
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-xs">No previous trips recorded.</p>
            )}
          </div>

          {/* Quick links summary helper */}
          <div className="bg-stone-100/60 p-5 rounded-2xl border border-slate-200/50 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-700">Quick Travel Tips</h4>
            <div className="space-y-2 text-[11px] text-slate-500 leading-relaxed font-light">
              <p className="flex items-start gap-1"><span className="text-green-500">✓</span> <span>Check internal flight guidelines 48h before departure.</span></p>
              <p className="flex items-start gap-1"><span className="text-green-500">✓</span> <span>Synchronize offline maps for city navigation.</span></p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
