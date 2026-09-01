import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Star, Clock, Users, ShieldAlert, CheckCircle, 
  XCircle, ChevronDown, Hotel, Coffee, Plane, Compass, Sparkles, Check, 
  Calendar, Phone, Mail, User, ShieldCheck, ArrowRight, Lock 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { packages } from '../data/packages';
import { calculatePriceBreakdown, formatINR, generateBookingReference } from '../utils/pricing';

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, createPendingBooking } = useTravel();

  const [expandedDay, setExpandedDay] = useState(1);

  // Find package
  const pkg = packages.find(p => p.id === id);

  // Booking Form State
  const [formData, setFormData] = useState(() => {
    const defaultStart = new Date();
    defaultStart.setDate(defaultStart.getDate() + 25);
    return {
      fullName: user?.name || 'Emily Watson',
      email: user?.email || 'emily.watson@example.com',
      phone: user?.phone || '+91 98765 43210',
      departDate: defaultStart.toISOString().split('T')[0],
      travelersCount: 2,
      specialRequests: ''
    };
  });

  const [formErrors, setFormErrors] = useState({});

  if (!pkg) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold font-heading text-slate-800">Package Not Found</h2>
        <p className="text-slate-500 text-sm mt-2">The package you are looking for does not exist.</p>
        <Link to="/packages" className="mt-6 inline-block bg-primary text-white text-xs px-6 py-2.5 rounded-full font-semibold">
          Back to Packages
        </Link>
      </div>
    );
  }

  // Calculate live INR price breakdown based on travelers count
  const basePricePerPerson = pkg.price * 85;
  const pricing = calculatePriceBreakdown({
    baseAmountINR: basePricePerPerson * (Number(formData.travelersCount) || 1),
    travelers: Number(formData.travelersCount) || 1
  });

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Contact phone is required';
    if (!formData.departDate) errors.departDate = 'Travel date is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const startDate = new Date(formData.departDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (pkg.durationDays || 6));

    const bookingData = {
      id: `booking-${Date.now()}`,
      reference: generateBookingReference('TR'),
      category: 'Activities',
      type: 'Tour Package',
      title: `${pkg.name} (${pkg.duration})`,
      destination: pkg.destinationId.charAt(0).toUpperCase() + pkg.destinationId.slice(1),
      location: pkg.destinationId.charAt(0).toUpperCase() + pkg.destinationId.slice(1),
      date: formData.departDate,
      endDate: endDate.toISOString().split('T')[0],
      priceUSD: pkg.price * (Number(formData.travelersCount) || 1),
      baseAmountINR: pricing.baseAmount,
      totalAmountINR: pricing.totalAmountINR,
      taxesAndFees: pricing.taxesAndFees,
      platformFee: pricing.platformFee,
      travelersCount: Number(formData.travelersCount) || 2,
      travelerName: formData.fullName,
      travelerEmail: formData.email,
      travelerPhone: formData.phone,
      specialRequests: formData.specialRequests,
      isPackageTrip: true,
      packageData: pkg,
      image: pkg.image,
      status: 'Pending Payment'
    };

    // Save as pending booking and directly navigate to Payment Page
    createPendingBooking(bookingData);
    navigate('/payment', { state: { booking: bookingData } });
  };

  return (
    <div className="bg-stone-50 pb-20 relative">
      
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 text-xs font-semibold py-2 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Packages</span>
        </button>
      </div>

      {/* Hero Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left main: Title, Image, Overview, Inclusions, Itinerary */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
              {pkg.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded">
                <Star size={12} className="fill-amber-500 mr-1" />
                <span>{pkg.rating} Rating</span>
              </div>
              <div className="flex items-center text-slate-500 font-semibold">
                <Clock size={14} className="mr-1 text-slate-400" />
                <span>{pkg.duration}</span>
              </div>
              <div className="flex items-center text-slate-500 font-semibold">
                <Users size={14} className="mr-1 text-slate-400" />
                <span>{pkg.travelers}</span>
              </div>
            </div>
          </div>

          {/* Large image gallery style banner */}
          <div className="h-[380px] rounded-3xl overflow-hidden shadow-md relative">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Overview text */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xl font-bold font-heading text-slate-800">Tour Summary</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{pkg.overview}</p>
          </div>

          {/* Inclusions / Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* What is Included */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-heading font-bold text-sm text-green-700 uppercase tracking-wider flex items-center">
                <CheckCircle size={16} className="text-green-600 mr-2" /> What's Included
              </h4>
              <ul className="space-y-2.5">
                {pkg.inclusions.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-500 flex items-start">
                    <Check size={12} className="text-green-600 mr-2 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What is Excluded */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-heading font-bold text-sm text-red-700 uppercase tracking-wider flex items-center">
                <XCircle size={16} className="text-red-500 mr-2" /> What's Excluded
              </h4>
              <ul className="space-y-2.5">
                {pkg.exclusions.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-500 flex items-start">
                    <span className="text-red-500 font-bold mr-2 select-none">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Day-by-Day Itinerary */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold font-heading text-slate-800">Detailed Day-by-Day Itinerary</h3>
            
            <div className="space-y-4">
              {pkg.itinerary.map((day) => {
                const isExpanded = expandedDay === day.day;
                return (
                  <div 
                    key={day.day} 
                    className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:border-slate-200 transition-colors"
                  >
                    <button
                      onClick={() => setExpandedDay(isExpanded ? 0 : day.day)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 px-5 py-4 flex items-center justify-between text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-primary text-white font-heading font-bold text-xs flex items-center justify-center shadow-sm">
                          D{day.day}
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 font-heading leading-tight">{day.title}</h4>
                      </div>
                      <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="px-5 py-4 border-t border-slate-100 bg-white">
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                          {day.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right sidebar: Comprehensive Booking Form panel */}
        <div className="space-y-8">
          
          {/* Reservation & Booking Form Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            
            {/* Package Pricing Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Package Price</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-primary">{formatINR(basePricePerPerson)}</span>
                <span className="text-[11px] text-slate-400 font-medium block">/ person (approx. ${pkg.price})</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Duration</span>
                <span className="text-sm font-bold text-slate-700">{pkg.duration}</span>
              </div>
            </div>

            {/* Inclusions summary */}
            <div className="space-y-2 text-xs text-slate-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center"><Hotel size={13} className="text-slate-400 mr-2" /> Hotel Accommodation</span>
                <span className="text-green-600 font-bold">Included</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center"><Coffee size={13} className="text-slate-400 mr-2" /> Daily Gourmet Breakfast</span>
                <span className="text-green-600 font-bold">Included</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center"><Compass size={13} className="text-slate-400 mr-2" /> Guided Tours & Entry</span>
                <span className="text-green-600 font-bold">Included</span>
              </div>
            </div>

            {/* The Booking Form */}
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="border-t border-slate-100 pt-3">
                <h4 className="text-xs font-bold font-heading text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <User size={14} className="text-primary" />
                  <span>Traveler & Booking Details</span>
                </h4>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700 block">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Primary Passenger Name"
                  className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                    formErrors.fullName ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-primary'
                  }`}
                />
                {formErrors.fullName && <p className="text-[10px] text-red-500 font-medium">{formErrors.fullName}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 block">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      formErrors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-primary'
                    }`}
                  />
                  {formErrors.email && <p className="text-[10px] text-red-500 font-medium">{formErrors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 block">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      formErrors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200 focus:border-primary'
                    }`}
                  />
                  {formErrors.phone && <p className="text-[10px] text-red-500 font-medium">{formErrors.phone}</p>}
                </div>
              </div>

              {/* Travel Date & Travelers count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 block">Travel Date</label>
                  <input
                    type="date"
                    value={formData.departDate}
                    onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 block">Travelers Count</label>
                  <select
                    value={formData.travelersCount}
                    onChange={(e) => setFormData({ ...formData, travelersCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary transition-all cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3.5 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Base Rate ({formData.travelersCount} pax):</span>
                  <span className="font-semibold text-slate-900">{pricing.formattedBase}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Tourism Taxes (12%):</span>
                  <span className="font-semibold text-slate-900">{pricing.formattedTaxes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee:</span>
                  <span className="font-semibold text-slate-900">{pricing.formattedFee}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold text-sm text-slate-900">
                  <span>Estimated Total:</span>
                  <span className="text-primary font-extrabold text-base">{pricing.formattedTotal}</span>
                </div>
              </div>

              {/* Submit Booking Button */}
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-light text-primary-dark font-heading font-extrabold py-3.5 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-accent/15 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Lock size={16} />
                <span>Submit Booking & Pay</span>
              </button>

              <span className="text-[10px] text-slate-400 text-center block leading-relaxed max-w-[240px] mx-auto font-medium">
                Instant redirect to secure Razorpay Test Mode Payment Page.
              </span>
            </form>

          </div>

          {/* Hotel Highlights */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="font-heading font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center">
              <Hotel size={16} className="text-primary mr-2" /> Lodging Details
            </h4>
            <div className="space-y-4">
              <img
                src={pkg.hotelDetails.image}
                alt={pkg.hotelDetails.name}
                className="w-full h-40 rounded-2xl object-cover"
              />
              <div>
                <h5 className="font-heading font-bold text-sm text-slate-800">{pkg.hotelDetails.name}</h5>
                <div className="flex items-center text-amber-500 text-xs font-semibold mt-1">
                  <Star size={12} className="fill-amber-500 mr-0.5" />
                  <span>{pkg.hotelDetails.rating} Star Luxury Resort</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="font-heading font-bold text-sm text-slate-800 uppercase tracking-wider">Reviews</h4>
            <div className="space-y-4 divide-y divide-slate-100">
              {pkg.reviews.map((rev, idx) => (
                <div key={rev.name} className={`${idx > 0 ? 'pt-4' : ''}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">{rev.name}</span>
                    <div className="flex text-amber-400 scale-90">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.floor(rev.rating) ? 'fill-amber-400' : ''} />)}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
