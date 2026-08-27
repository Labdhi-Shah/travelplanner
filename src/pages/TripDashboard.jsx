import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, Users, DollarSign, CloudSun, MapPin, 
  Plane, Hotel, Compass, CalendarRange, PlusCircle, CreditCard, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function TripDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips } = useTravel();

  // Find trip
  const trip = trips.find(t => t.id === id);

  if (!trip) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold font-heading text-slate-800">Trip Not Found</h2>
        <p className="text-slate-500 text-sm mt-2">The trip you are looking for does not exist or has been deleted.</p>
        <Link to="/dashboard/my-trips" className="mt-6 inline-block bg-primary text-white text-xs px-6 py-2.5 rounded-full font-semibold">
          Back to My Trips
        </Link>
      </div>
    );
  }

  // Calculate math details
  const daysDiff = Math.ceil(
    (new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)
  ) || 1;

  const budgetSpent = trip.budget?.spent || 0;
  const budgetLimit = trip.budget?.limit || 1000;
  const budgetPercent = Math.min(100, Math.round((budgetSpent / budgetLimit) * 100));

  // Default coordinates if route list is present
  const defaultRoute = trip.route || [trip.destinationName];

  return (
    <div className="space-y-8">
      
      {/* Back to trips & Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => navigate('/dashboard/my-trips')}
            className="flex items-center space-x-1 text-slate-400 hover:text-slate-600 text-xs font-semibold mb-1"
          >
            <ArrowLeft size={12} />
            <span>Back to My Trips</span>
          </button>
          <h2 className="text-2xl font-bold font-heading text-slate-800">{trip.name}</h2>
          <span className="text-xs text-slate-400 font-semibold flex items-center mt-1">
            <Calendar size={12} className="mr-1" /> {trip.startDate} to {trip.endDate} ({daysDiff} Days)
          </span>
        </div>

        <div className="flex space-x-2 shrink-0">
          <Link
            to="/dashboard/itinerary"
            className="bg-primary hover:bg-primary-light text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <CalendarRange size={14} />
            <span>Manage Itinerary</span>
          </Link>
          <Link
            to="/dashboard/budget"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4.5 py-2.5 rounded-xl shadow-sm transition-colors flex items-center space-x-1.5 border border-slate-200"
          >
            <DollarSign size={14} />
            <span>Budget Details</span>
          </Link>
        </div>
      </div>

      {/* Grid: 2 columns map/overview left, weather/booking right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left main: Route Map & Trip Stats */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Custom SVG Route Map (Premium Aesthetic) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <MapPin size={16} className="text-primary" /> Flight & Travel Route Map
            </h3>
            
            <div className="relative h-60 sm:h-72 rounded-2xl bg-stone-50 border border-slate-200 overflow-hidden flex items-center justify-center">
              {/* Animated flight nodes SVG */}
              <svg className="w-full h-full absolute inset-0 z-0" viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Grid pattern */}
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Connecting Route Line */}
                {defaultRoute.length > 1 && (
                  <path
                    d={`M 80,150 Q 250,50 420,150`}
                    fill="none"
                    stroke="#0a3d40"
                    strokeWidth="2.5"
                    strokeDasharray="6,4"
                    className="animate-[dash_10s_linear_infinite]"
                  />
                )}

                {/* Draw Route stops */}
                {defaultRoute.map((stop, idx) => {
                  // Distribute positions
                  const x = 80 + idx * (340 / Math.max(1, defaultRoute.length - 1));
                  const y = idx % 2 === 0 ? 150 : 100;
                  return (
                    <g key={stop}>
                      <circle cx={x} cy={y} r="6" fill="#cfa864" stroke="#0a3d40" strokeWidth="2" />
                      <text x={x} y={y - 12} textAnchor="middle" className="text-[10px] fill-slate-700 font-heading font-bold">
                        {stop}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-3 bg-white/95 border border-slate-100 px-3 py-1.5 rounded-xl text-[10px] font-semibold text-slate-500 shadow-sm flex items-center space-x-1 z-10">
                <span>Route sequence: <strong>{defaultRoute.join(' → ')}</strong></span>
              </div>
            </div>
          </div>

          {/* Budget Overview Widget */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <DollarSign size={16} className="text-accent" /> Budget Progress Ledger
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                ${budgetSpent} / ${budgetLimit} Spent ({budgetPercent}%)
              </span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${budgetPercent}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500 pt-1">
              <div>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Trip Budget Tier</span>
                <span className="text-sm font-bold text-slate-700 mt-0.5 block">{trip.budget?.range || 'Medium'} Range</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Remaining Pool</span>
                <span className="text-sm font-bold text-green-600 mt-0.5 block">${Math.max(0, budgetLimit - budgetSpent)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right column: reservations, weather & timeline details */}
        <div className="space-y-8">
          
          {/* Weather Widget */}
          <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-5 rounded-3xl shadow-md">
            <h3 className="font-heading font-bold text-sm mb-4 flex items-center">
              <CloudSun size={16} className="mr-2 text-accent" /> Local Destination Weather
            </h3>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-extrabold font-heading">29°C</span>
                <span className="text-[10px] text-slate-300 block font-semibold mt-1">Light Breezy Sunny</span>
              </div>
              <CloudSun size={48} className="text-accent-light shrink-0" />
            </div>
          </div>

          {/* Reservations Checklist */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <CreditCard size={16} className="text-primary" /> Active Reservations
            </h3>

            <div className="space-y-3.5 divide-y divide-slate-100">
              {trip.bookings && trip.bookings.length > 0 ? (
                trip.bookings.map((book) => (
                  <div key={book.id} className="flex items-start justify-between pt-3 first:pt-0">
                    <div className="flex items-start space-x-3 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                        {book.category === 'Flights' ? <Plane size={16} className="text-slate-500" /> : <Hotel size={16} className="text-slate-500" />}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-heading font-bold text-xs text-slate-800 truncate">{book.title}</h4>
                        <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Ref: {book.reference} • {book.date}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md self-center shrink-0 ml-2">
                      {book.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-slate-400 text-xs">
                  No direct bookings linked to this trip. Add flight/hotel confirmations under Bookings.
                </div>
              )}
            </div>
            
            <Link
              to="/dashboard/bookings"
              className="w-full text-center block py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
            >
              Add Confirmation Invoice
            </Link>
          </div>

          {/* Timeline teaser summary */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <Compass size={16} className="text-primary" /> Upcoming Stops
            </h3>
            
            <div className="relative border-l-2 border-slate-100 pl-4 ml-2 space-y-4 text-xs">
              {trip.activities && trip.activities.length > 0 ? (
                trip.activities.slice(0, 3).map((act) => (
                  <div key={act.id} className="relative">
                    <span className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white" />
                    <span className="text-[10px] text-slate-400 font-bold block">{act.time} • Day {act.day}</span>
                    <h4 className="font-heading font-bold text-slate-700 mt-0.5">{act.title}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5"><MapPin size={10} className="inline mr-0.5" /> {act.location}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-xs pl-2">No timeline events listed. Open Itinerary to add stops.</p>
              )}
            </div>

            <Link
              to="/dashboard/itinerary"
              className="flex items-center justify-between text-xs font-semibold text-primary hover:text-accent border-t border-slate-100 pt-3.5 mt-2"
            >
              <span>Build Complete Timeline</span>
              <ChevronRight size={14} />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
