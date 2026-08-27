import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Star, Clock, Users, ShieldAlert, CheckCircle, 
  XCircle, ChevronDown, Hotel, Coffee, Plane, Compass, Sparkles, Check 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { packages } from '../data/packages';

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTrip, addBooking } = useTravel();

  const [expandedDay, setExpandedDay] = useState(1);
  const [successModal, setSuccessModal] = useState(false);

  // Find package
  const pkg = packages.find(p => p.id === id);

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

  const handleAddToMyTrip = () => {
    // Generate a new Trip based on this package
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 30); // 30 days from now
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + pkg.durationDays);

    const tripId = addTrip({
      name: pkg.name,
      destinationId: pkg.destinationId,
      destinationName: pkg.destinationId.charAt(0).toUpperCase() + pkg.destinationId.slice(1),
      image: pkg.image,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      travelers: { adults: 2, children: 0 },
      budgetLimit: pkg.price * 1.5,
      route: [pkg.destinationId.charAt(0).toUpperCase() + pkg.destinationId.slice(1)],
      activities: pkg.itinerary.map((it, idx) => ({
        id: `act-pkg-${idx}`,
        day: it.day,
        time: idx === 0 ? "14:00" : "09:30",
        title: it.title,
        cost: 0,
        notes: it.description,
        location: pkg.destinationId.charAt(0).toUpperCase() + pkg.destinationId.slice(1)
      }))
    });

    // Also add a corresponding booking
    addBooking({
      tripId,
      category: 'Hotels',
      title: pkg.hotelDetails.name,
      date: startDate.toISOString().split('T')[0],
      location: pkg.destinationId.charAt(0).toUpperCase() + pkg.destinationId.slice(1),
      price: pkg.price,
      status: 'Confirmed'
    });

    setSuccessModal(true);
  };

  return (
    <div className="bg-stone-50 pb-20 relative">
      
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 text-xs font-semibold py-2"
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
                      className="w-full bg-slate-50/50 hover:bg-slate-50 px-5 py-4 flex items-center justify-between text-left transition-colors"
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

        {/* Right sidebar: Booking Details panel */}
        <div className="space-y-8">
          
          {/* Reservation Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Package Price</span>
                <span className="text-3xl font-extrabold font-heading text-primary">${pkg.price}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Duration</span>
                <span className="text-sm font-bold text-slate-700">{pkg.duration}</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-500">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center"><Hotel size={14} className="text-slate-400 mr-2" /> Hotel Accommodation</span>
                <span className="text-green-600">Included</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center"><Coffee size={14} className="text-slate-400 mr-2" /> Daily Gourmet Breakfast</span>
                <span className="text-green-600">Included</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center"><Plane size={14} className="text-slate-400 mr-2" /> Internal Flights</span>
                <span className={pkg.hasFlight ? 'text-green-600' : 'text-slate-400'}>{pkg.hasFlight ? 'Included' : 'Not Included'}</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center"><Compass size={14} className="text-slate-400 mr-2" /> Guided Tours & Entry</span>
                <span className="text-green-600">Included</span>
              </div>
            </div>

            <button
              onClick={handleAddToMyTrip}
              className="w-full bg-accent hover:bg-accent-light text-primary-dark font-heading font-semibold py-3.5 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-accent/10 transition-transform hover:-translate-y-0.5"
            >
              <Sparkles size={16} />
              <span>Add to My Trip</span>
            </button>

            <span className="text-[10px] text-slate-400 text-center block leading-relaxed max-w-[220px] mx-auto">
              Add this package to your travel schedule to automatically build dynamic itineraries!
            </span>
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

      {/* Success Modal Overlay */}
      {successModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl border border-slate-100">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto shadow-sm">
              <CheckCircle size={30} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-heading text-slate-800">Trip Created Successfully!</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                We've added <strong>{pkg.name}</strong> to your upcoming schedule! Check it out in your My Trips dashboard.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setSuccessModal(false)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors"
              >
                Close
              </button>
              <Link
                to="/dashboard/my-trips"
                className="py-2.5 bg-primary hover:bg-primary-light text-white text-center rounded-xl font-semibold text-xs transition-colors shadow-md"
              >
                Go to My Trips
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
