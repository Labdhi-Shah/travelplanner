import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plane, Calendar, Users, Star, ArrowRight, 
  ShieldCheck, HelpCircle, CheckCircle2, X, Lock, User, Mail, Phone 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { flights, airportHubs } from '../data/flights';
import { calculatePriceBreakdown, formatINR, generateBookingReference } from '../utils/pricing';

export default function Flights() {
  const navigate = useNavigate();
  const { user, createPendingBooking } = useTravel();

  // Search parameters states
  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('CDG');
  const [departDate, setDepartDate] = useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 14 days out
  const [cabinClass, setCabinClass] = useState('Economy');
  const [guests, setGuests] = useState('2');
  const [searched, setSearched] = useState(false);
  // Selected Flight for Booking Form modal
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Emily Watson',
    email: user?.email || 'emily.watson@example.com',
    phone: user?.phone || '+91 98765 43210',
    specialRequests: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const getPriceUSD = (flight) => {
    const factor = Number(guests);
    if (cabinClass === 'Business') return flight.priceBusiness * factor;
    if (cabinClass === 'First Class') return flight.priceFirstClass * factor;
    return flight.priceEconomy * factor;
  };

  const handleOpenBookingModal = (flight) => {
    setSelectedFlight(flight);
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Passenger name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Contact phone is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!validateForm() || !selectedFlight) return;

    const totalPriceUSD = getPriceUSD(selectedFlight);
    const baseINR = totalPriceUSD * 85;
    const pricing = calculatePriceBreakdown({
      baseAmountINR: baseINR,
      travelers: Number(guests) || 1
    });

    const bookingData = {
      id: `booking-${Date.now()}`,
      reference: generateBookingReference('FL'),
      category: 'Flights',
      type: 'Flights',
      title: `${selectedFlight.airline} Flight ${selectedFlight.flightNumber} (${cabinClass})`,
      date: departDate,
      destination: `${selectedFlight.origin} to ${selectedFlight.destination}`,
      location: `${selectedFlight.origin} → ${selectedFlight.destination}`,
      priceUSD: totalPriceUSD,
      baseAmountINR: pricing.baseAmount,
      totalAmountINR: pricing.totalAmountINR,
      taxesAndFees: pricing.taxesAndFees,
      platformFee: pricing.platformFee,
      cabinClass: cabinClass,
      travelersCount: Number(guests) || 1,
      travelerName: formData.fullName,
      travelerEmail: formData.email,
      travelerPhone: formData.phone,
      specialRequests: formData.specialRequests,
      flightDetails: selectedFlight,
      status: 'Pending Payment'
    };

    // Save as pending and immediately navigate to Payment Page
    createPendingBooking(bookingData);
    navigate('/payment', { state: { booking: bookingData } });
  };

  // Find exact matches
  const exactMatches = flights.filter(f => f.origin === origin && f.destination === destination);
  const alternativeFlights = exactMatches.length > 0 ? exactMatches : flights;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 tracking-tight">
          Book International Flights
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Compare options across premier airlines. Select your flight and submit booking to proceed to secure payment.
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
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 outline-none font-bold text-slate-700 cursor-pointer"
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
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 outline-none font-bold text-slate-700 cursor-pointer"
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
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer"
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
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 outline-none font-bold text-slate-700 cursor-pointer"
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
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 outline-none font-bold text-slate-700 cursor-pointer"
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
              className="w-full bg-primary hover:bg-primary-light text-white font-heading font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-colors cursor-pointer"
            >
              <Search size={16} />
              <span>Search Available Flights</span>
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
          {alternativeFlights.map((flight, idx) => {
            const priceUSD = getPriceUSD(flight);
            const priceINR = priceUSD * 85;

            return (
              <motion.div
                key={flight.id}
                onClick={() => navigate(`/flights/${flight.id}`, { state: { flight, cabinClass, guests, departDate } })}
                className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group"
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                {/* Left details: Logo, Airline, stops */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary font-bold shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    {flight.airline.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-heading font-bold text-sm text-slate-850 group-hover:text-primary transition-colors">{flight.airline}</h4>
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
                    <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none mb-1">
                      Rate ({guests} pax)
                    </span>
                    <span className="text-xl font-extrabold text-primary font-heading">
                      {formatINR(priceINR)}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">(${priceUSD})</span>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/flights/${flight.id}`, { state: { flight, cabinClass, guests, departDate } });
                    }}
                    className="bg-primary hover:bg-primary-light text-white font-heading font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Details / Book</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Flight Booking Form Modal */}
      <AnimatePresence>
        {selectedFlight && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">Passenger Booking Form</span>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mt-0.5">
                    {selectedFlight.airline} ({selectedFlight.flightNumber})
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedFlight.origin} → {selectedFlight.destination} • {departDate} • {cabinClass}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFlight(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmitBooking} className="space-y-4 pt-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Primary Passenger Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Emily Watson"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      formErrors.fullName ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-primary'
                    }`}
                  />
                  {formErrors.fullName && <p className="text-[10px] text-red-500 font-medium">{formErrors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Email Address (for e-ticket)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="emily@example.com"
                      className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                        formErrors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-primary'
                      }`}
                    />
                    {formErrors.email && <p className="text-[10px] text-red-500 font-medium">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                        formErrors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-primary'
                      }`}
                    />
                    {formErrors.phone && <p className="text-[10px] text-red-500 font-medium">{formErrors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Special Assistance / Seat Preferences (Optional)</label>
                  <input
                    type="text"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Window seat, vegetarian meal, etc."
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                {/* Price Breakdown Preview */}
                <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Base Fare ({guests} Passenger(s)):</span>
                    <span className="font-semibold text-slate-900">
                      {formatINR(getPriceUSD(selectedFlight) * 85)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Airport Taxes & GST (12%):</span>
                    <span className="font-semibold text-slate-900">
                      {formatINR(Math.round(getPriceUSD(selectedFlight) * 85 * 0.12))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Convenience Fee:</span>
                    <span className="font-semibold text-slate-900">₹499</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm text-slate-900">
                    <span>Total Amount Payable:</span>
                    <span className="text-primary font-black text-base">
                      {formatINR(Math.round(getPriceUSD(selectedFlight) * 85 * 1.12 + 499))}
                    </span>
                  </div>
                </div>

                {/* Submit Booking Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-primary hover:bg-primary-light text-white rounded-2xl font-heading font-bold text-xs shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <Lock size={15} />
                    <span>Submit Booking & Proceed to Payment</span>
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
                    You will be directly redirected to the secure reservation checkout.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
