import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Star, Clock, Users, ShieldCheck, CheckCircle2, 
  Plane, Luggage, Wifi, Coffee, Tv, Zap, Check, 
  Calendar, Phone, Mail, User, ArrowRight, Lock, AlertCircle, Info
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { flights } from '../data/flights';
import { calculatePriceBreakdown, formatINR, generateBookingReference } from '../utils/pricing';

export default function FlightDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, createPendingBooking } = useTravel();

  // Retrieve flight either from route param in data or from location.state
  const flight = flights.find(f => f.id === id) || location.state?.flight;

  // Search parameters inherited from location state if available
  const initialCabin = location.state?.cabinClass || 'Economy';
  const initialGuests = Number(location.state?.guests) || 2;
  const initialDepartDate = location.state?.departDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [cabinClass, setCabinClass] = useState(initialCabin);
  const [guestsCount, setGuestsCount] = useState(initialGuests);
  const [departDate, setDepartDate] = useState(initialDepartDate);

  // Passenger form
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Emily Watson',
    email: user?.email || 'emily.watson@example.com',
    phone: user?.phone || '+91 98765 43210',
    specialRequests: ''
  });
  const [formErrors, setFormErrors] = useState({});

  if (!flight) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center bg-stone-50">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <Plane size={28} />
        </div>
        <h2 className="text-2xl font-bold font-heading text-slate-800">Flight Not Found</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-sm">
          The requested flight schedule could not be located or may have expired.
        </p>
        <Link
          to="/flights"
          className="mt-6 inline-flex items-center space-x-2 bg-primary hover:bg-primary-light text-white text-xs px-6 py-3 rounded-full font-heading font-semibold shadow-md transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Flights</span>
        </Link>
      </div>
    );
  }

  // Calculate live dynamic prices based on cabin class and guests
  const getBaseUnitPriceUSD = () => {
    if (cabinClass === 'Business') return flight.priceBusiness;
    if (cabinClass === 'First Class') return flight.priceFirstClass;
    return flight.priceEconomy;
  };

  const unitPriceUSD = getBaseUnitPriceUSD();
  const totalPriceUSD = unitPriceUSD * Number(guestsCount);
  const baseAmountINR = totalPriceUSD * 85;

  const pricing = calculatePriceBreakdown({
    baseAmountINR: baseAmountINR,
    travelers: Number(guestsCount) || 1
  });

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
    if (!validateForm()) return;

    const bookingData = {
      id: `booking-${Date.now()}`,
      reference: generateBookingReference('FL'),
      category: 'Flights',
      type: 'Flights',
      title: `${flight.airline} Flight ${flight.flightNumber} (${cabinClass})`,
      date: departDate,
      destination: `${flight.originCity || flight.origin} to ${flight.destinationCity || flight.destination}`,
      location: `${flight.origin} → ${flight.destination}`,
      priceUSD: totalPriceUSD,
      baseAmountINR: pricing.baseAmount,
      totalAmountINR: pricing.totalAmountINR,
      taxesAndFees: pricing.taxesAndFees,
      platformFee: pricing.platformFee,
      cabinClass: cabinClass,
      travelersCount: Number(guestsCount) || 1,
      travelerName: formData.fullName,
      travelerEmail: formData.email,
      travelerPhone: formData.phone,
      specialRequests: formData.specialRequests,
      flightDetails: flight,
      status: 'Pending Payment'
    };

    // Save pending booking & proceed directly to unified payment checkout
    createPendingBooking(bookingData);
    navigate('/payment', { state: { booking: bookingData } });
  };

  return (
    <div className="bg-stone-50 pb-24 relative">
      
      {/* Top Breadcrumbs & Back to Flights navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate('/flights')}
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-primary transition-colors text-xs font-heading font-bold py-2 cursor-pointer group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Flights</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Flight Overview, Journey Route, Amenities, Policies */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Flight Card Header Banner */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary text-xl font-bold font-heading shadow-inner">
                  {flight.airline.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                      {flight.airline}
                    </h1>
                    <span className="text-xs font-mono font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-lg">
                      {flight.flightNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Boeing 777-300ER • Commercial Jetliner • Scheduled Flight
                  </p>
                </div>
              </div>

              <div className="flex items-center text-amber-500 font-bold bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-xl text-xs">
                <Star size={14} className="fill-amber-500 mr-1" />
                <span>{flight.rating} / 5.0 Rating</span>
              </div>
            </div>

            {/* Visual Route Timeline */}
            <div className="bg-slate-50 border border-slate-200/70 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Departure */}
              <div className="text-left">
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-800">
                  {flight.departureTime}
                </span>
                <span className="text-sm font-bold text-primary block mt-0.5">
                  {flight.origin} Airport
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {flight.originCity || 'Origin Terminal'}
                </span>
              </div>

              {/* Center Timeline Flight Arc */}
              <div className="flex-1 flex flex-col items-center px-4 max-w-xs mx-auto">
                <span className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                  <Clock size={12} className="text-slate-400" />
                  <span>{flight.duration}</span>
                </span>
                
                <div className="w-full flex items-center relative my-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20 shrink-0" />
                  <div className="flex-1 h-[2px] bg-slate-300 relative mx-1 border-t-2 border-dashed border-slate-300">
                    <Plane 
                      size={14} 
                      className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" 
                    />
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/20 shrink-0" />
                </div>

                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 mt-1">
                  {flight.stops === 0 ? 'Non-Stop Direct Flight' : `${flight.stops} Stopover Connection`}
                </span>
              </div>

              {/* Arrival */}
              <div className="text-left md:text-right">
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-800">
                  {flight.arrivalTime}
                </span>
                <span className="text-sm font-bold text-accent block mt-0.5">
                  {flight.destination} Airport
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {flight.destinationCity || 'Destination Terminal'}
                </span>
              </div>

            </div>

            {/* Cabin Class Selection */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Select Cabin Class
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Economy', price: flight.priceEconomy, desc: 'Standard seating, meal & 23kg check-in' },
                  { name: 'Business', price: flight.priceBusiness, desc: 'Lie-flat seats, priority boarding & lounge' },
                  { name: 'First Class', price: flight.priceFirstClass, desc: 'Private suite, luxury dining & chauffeur' }
                ].map((tier) => (
                  <button
                    key={tier.name}
                    type="button"
                    onClick={() => setCabinClass(tier.name)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      cabinClass === tier.name
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-heading font-bold text-sm text-slate-800">{tier.name}</span>
                      {cabinClass === tier.name && (
                        <CheckCircle2 size={16} className="text-primary" />
                      )}
                    </div>
                    <span className="text-base font-extrabold text-primary font-heading block">
                      ${tier.price} <span className="text-[10px] text-slate-400 font-normal">/ pax</span>
                    </span>
                    <p className="text-[10px] text-slate-500 leading-tight mt-1">{tier.desc}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* In-Flight Amenities & Inclusions */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-800">
              In-Flight Amenities & Baggage Policy
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { icon: Luggage, title: 'Baggage', desc: '1 Check-in (23kg) + 7kg Cabin' },
                { icon: Coffee, title: 'Meals & Drinks', desc: 'Complimentary hot meals & bar' },
                { icon: Wifi, title: 'Wi-Fi Onboard', desc: 'High-speed satellite connectivity' },
                { icon: Tv, title: 'Entertainment', desc: 'Over 1,000 movies & games' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary mb-2 shadow-xs">
                    <item.icon size={18} />
                  </div>
                  <h4 className="font-heading font-bold text-xs text-slate-800">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Guarantee & Cancellation Rules */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 space-y-3">
            <div className="flex items-center space-x-2 text-primary">
              <ShieldCheck size={20} />
              <h4 className="font-heading font-bold text-sm text-slate-900">TripSphere Booking Protection</h4>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
              <li>Free 24-hour cancellation guarantee after purchase.</li>
              <li>Instant flight confirmation and e-ticket emailed directly to your inbox.</li>
              <li>Dedicated 24/7 travel concierge support for itinerary adjustments or delays.</li>
            </ul>
          </div>

        </div>

        {/* Right 1 Column: Sticky Passenger Form & Price Breakdown Checkout */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md space-y-6 sticky top-24">
            
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">
                Instant Reservation
              </span>
              <h3 className="text-xl font-bold font-heading text-slate-900 mt-0.5">
                Reserve Seats
              </h3>
              <p className="text-xs text-slate-500">
                {flight.airline} • {cabinClass} Class
              </p>
            </div>

            {/* Passenger Form */}
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              
              {/* Departure Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Departure Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Number of Passengers */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Passengers</label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value={1}>1 Passenger</option>
                  <option value={2}>2 Passengers</option>
                  <option value={3}>3 Passengers</option>
                  <option value={4}>4 Passengers</option>
                  <option value={5}>5 Passengers</option>
                </select>
              </div>

              {/* Passenger Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Passenger Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Emily Watson"
                  className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                    formErrors.fullName ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-primary'
                  }`}
                />
                {formErrors.fullName && <p className="text-[10px] text-red-500 mt-1 font-medium">{formErrors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. emily@example.com"
                  className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                    formErrors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-primary'
                  }`}
                />
                {formErrors.email && <p className="text-[10px] text-red-500 mt-1 font-medium">{formErrors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                    formErrors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-primary'
                  }`}
                />
                {formErrors.phone && <p className="text-[10px] text-red-500 mt-1 font-medium">{formErrors.phone}</p>}
              </div>

              {/* Live Price Breakdown in INR */}
              <div className="bg-slate-50 border border-slate-200/70 p-4 rounded-2xl space-y-2 pt-3">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Base Airfare ({guestsCount} pax)</span>
                  <span>{formatINR(pricing.baseAmount)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Airport Taxes & Fuel ({pricing.taxRatePercent}%)</span>
                  <span>{formatINR(pricing.taxesAndFees)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Convenience Fee</span>
                  <span>{formatINR(pricing.platformFee)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline">
                  <div>
                    <span className="font-heading font-bold text-sm text-slate-900 block">Total Due</span>
                    <span className="text-[10px] text-slate-400">Approx. ${totalPriceUSD} USD</span>
                  </div>
                  <span className="font-heading font-extrabold text-xl text-primary">
                    {formatINR(pricing.totalAmountINR)}
                  </span>
                </div>
              </div>

              {/* Submit to Payment */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white font-heading font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 pt-1">
                <Lock size={12} className="text-emerald-600" />
                <span>256-Bit SSL Encrypted • Instant Confirmation</span>
              </div>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
}
