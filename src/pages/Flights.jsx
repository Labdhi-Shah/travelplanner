import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plane, Calendar, Users, Star, ArrowRight, ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { flights, airportHubs } from '../data/flights';

export default function Flights() {
  const { addBooking } = useTravel();

  // Search parameters states
  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('CDG');
  const [departDate, setDepartDate] = useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 14 days out
  const [cabinClass, setCabinClass] = useState('Economy');
  const [guests, setGuests] = useState('2');
  const [searched, setSearched] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const getPrice = (flight) => {
    const factor = Number(guests);
    if (cabinClass === 'Business') return flight.priceBusiness * factor;
    if (cabinClass === 'First Class') return flight.priceFirstClass * factor;
    return flight.priceEconomy * factor;
  };

  const handleBook = (flight) => {
    const totalPrice = getPrice(flight);
    const bookingData = {
      category: 'Flights',
      title: `${flight.airline} Flight ${flight.flightNumber} (${cabinClass})`,
      date: departDate,
      location: `${flight.origin} → ${flight.destination}`,
      price: totalPrice,
      status: 'Confirmed'
    };

    addBooking(bookingData);
    setSuccessBooking({
      ...bookingData,
      flightDetails: flight,
      guestsCount: guests
    });
  };

  // Find exact matches
  const exactMatches = flights.filter(f => f.origin === origin && f.destination === destination);
  // Alternative routes if no exact matches found
  const alternativeFlights = exactMatches.length > 0 ? exactMatches : flights;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 tracking-tight">
          Book International Flights
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Compare options across premier airlines. Secure flexible reservations directly linked to your dashboard.
        </p>
      </div>

      {/* Flight Search Engine Container */}
      <section className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end text-xs font-semibold text-slate-600">
          
          {/* Origin Hub */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Plane size={12} className="mr-1 text-primary rotate-45" /> Outbound From
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 outline-none font-bold text-slate-700"
            >
              {airportHubs.map(hub => (
                <option key={hub.code} value={hub.code}>{hub.city} ({hub.code})</option>
              ))}
            </select>
          </div>

          {/* Destination Hub */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Plane size={12} className="mr-1 text-primary rotate-135" /> Flying To
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 outline-none font-bold text-slate-700"
            >
              {airportHubs.map(hub => (
                <option key={hub.code} value={hub.code}>{hub.city} ({hub.code})</option>
              ))}
            </select>
          </div>

          {/* Departure Date */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Calendar size={12} className="mr-1 text-primary" /> Depart Date
            </label>
            <input
              type="date"
              required
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none"
            />
          </div>

          {/* Cabin Class */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Users size={12} className="mr-1 text-primary" /> Cabin Class
            </label>
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 outline-none font-bold text-slate-700"
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business Class</option>
              <option value="First Class">First Class</option>
            </select>
          </div>

          {/* Guests count */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Users size={12} className="mr-1 text-primary" /> Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 outline-none font-bold text-slate-700"
            >
              <option value="1">1 Passenger</option>
              <option value="2">2 Passengers</option>
              <option value="3">3 Passengers</option>
              <option value="4">4+ Passengers</option>
            </select>
          </div>

          <div className="col-span-1 sm:col-span-2 md:col-span-5 mt-2">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-light text-white font-heading font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-colors"
            >
              <Search size={16} />
              <span>Search Flights</span>
            </button>
          </div>

        </form>
      </section>

      {/* Flight Results Panel */}
      <section className="space-y-4">
        <h3 className="font-heading font-bold text-slate-800 text-base sm:text-lg">
          {searched ? 'Search Results' : 'Featured Airline Offerings'}
        </h3>

        {exactMatches.length === 0 && searched && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-3 rounded-2xl">
            No direct flights scheduled from {origin} to {destination} on this date. Showing general flight options below:
          </div>
        )}

        <div className="space-y-4">
          {alternativeFlights.map((flight, idx) => (
            <motion.div
              key={flight.id}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {/* Left details: Logo, Airline, stops */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary font-bold shadow-inner shrink-0">
                  {flight.airline.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-heading font-bold text-sm text-slate-850">{flight.airline}</h4>
                    <span className="text-[9px] bg-slate-100 text-slate-400 font-semibold px-2 py-0.5 rounded">
                      {flight.flightNumber}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-semibold mt-1">
                    <span className="flex items-center text-amber-500">
                      <Star size={10} className="fill-amber-500 mr-0.5" /> {flight.rating} Rating
                    </span>
                    <span>Class Option: <strong>{cabinClass}</strong></span>
                  </div>
                </div>
              </div>

              {/* Center: Route, duration & connections */}
              <div className="flex items-center justify-between md:justify-center gap-6 text-center text-xs">
                <div className="text-left md:text-right">
                  <span className="text-sm font-bold text-slate-800">{flight.departureTime}</span>
                  <span className="text-[10px] text-slate-400 block font-semibold">{searched ? origin : flight.origin}</span>
                </div>
                
                <div className="flex flex-col items-center min-w-[80px]">
                  <span className="text-[9px] text-slate-400 font-bold block mb-0.5">{flight.duration}</span>
                  <div className="w-full h-[2px] bg-slate-200 relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full border border-white" />
                  </div>
                  <span className="text-[8px] text-primary font-extrabold mt-0.5">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} Stopover`}
                  </span>
                </div>

                <div className="text-right md:text-left">
                  <span className="text-sm font-bold text-slate-800">{flight.arrivalTime}</span>
                  <span className="text-[10px] text-slate-400 block font-semibold">{searched ? destination : flight.destination}</span>
                </div>
              </div>

              {/* Right side: Price & Booking */}
              <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none mb-1">Passes Rate ({guests} pax)</span>
                  <span className="text-xl font-extrabold text-primary">${getPrice(flight)}</span>
                </div>
                
                <button
                  onClick={() => handleBook(flight)}
                  className="bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-colors"
                >
                  Book Flight
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* Success Booking Modal */}
      <AnimatePresence>
        {successBooking && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl border border-slate-100"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto shadow-sm">
                <CheckCircle2 size={30} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-heading text-slate-800">Flight Booked Successfully!</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  We've reserved {successBooking.guestsCount} seats on <strong>{successBooking.flightDetails.airline}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-semibold text-slate-600 space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">Flight:</span>
                  <span>{successBooking.flightDetails.flightNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Route:</span>
                  <span>{successBooking.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span>{successBooking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Class:</span>
                  <span>{cabinClass}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200/50 pt-2 font-bold text-slate-850">
                  <span className="text-slate-400">Total Price:</span>
                  <span className="text-sm text-primary">${successBooking.price}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setSuccessBooking(null)}
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => { setSuccessBooking(null); navigate('/dashboard/bookings'); }}
                  className="py-2.5 bg-primary hover:bg-primary-light text-white text-center rounded-xl font-semibold text-xs transition-colors shadow-md"
                >
                  View Bookings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
