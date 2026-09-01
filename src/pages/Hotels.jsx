import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Star, Heart, MapPin, Calendar, Users, ShieldAlert, 
  CheckCircle2, X, Lock, User, Mail, Phone, ArrowRight 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { hotels, amenitiesList } from '../data/hotels';
import { calculatePriceBreakdown, formatINR, generateBookingReference } from '../utils/pricing';

export default function Hotels() {
  const navigate = useNavigate();
  const { user, toggleFavorite, isFavorite, createPendingBooking } = useTravel();

  // Search parameters states
  const [searchVal, setSearchVal] = useState('');
  const [checkIn, setCheckIn] = useState(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 15 days out
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 18 days out (3 nights)
  const [guests, setGuests] = useState('2');
  
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Selected Hotel for Booking Form Modal
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Emily Watson',
    email: user?.email || 'emily.watson@example.com',
    phone: user?.phone || '+91 98765 43210',
    specialRequests: '',
    roomType: 'Deluxe Suite'
  });
  const [formErrors, setFormErrors] = useState({});

  const toggleAmenity = (am) => {
    setSelectedAmenities(prev => 
      prev.includes(am) ? prev.filter(a => a !== am) : [...prev, am]
    );
  };

  const getNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const handleOpenBookingModal = (hotel) => {
    setSelectedHotel(hotel);
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Primary guest name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Contact phone is required';
    if (!checkIn) errors.checkIn = 'Check-in date is required';
    if (!checkOut) errors.checkOut = 'Check-out date is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!validateForm() || !selectedHotel) return;

    const nights = getNights();
    const totalPriceUSD = selectedHotel.price * nights;
    const baseINR = totalPriceUSD * 85;
    const pricing = calculatePriceBreakdown({
      baseAmountINR: baseINR,
      travelers: Number(guests) || 2
    });

    const bookingData = {
      id: `booking-${Date.now()}`,
      reference: generateBookingReference('HT'),
      category: 'Hotels',
      type: 'Hotels',
      title: `${selectedHotel.name} (${nights} Nights stay)`,
      date: checkIn,
      checkOutDate: checkOut,
      destination: selectedHotel.location,
      location: selectedHotel.location,
      priceUSD: totalPriceUSD,
      baseAmountINR: pricing.baseAmount,
      totalAmountINR: pricing.totalAmountINR,
      taxesAndFees: pricing.taxesAndFees,
      platformFee: pricing.platformFee,
      travelersCount: Number(guests) || 2,
      travelerName: formData.fullName,
      travelerEmail: formData.email,
      travelerPhone: formData.phone,
      specialRequests: formData.specialRequests,
      hotelDetails: selectedHotel,
      nightsCount: nights,
      image: selectedHotel.image,
      status: 'Pending Payment'
    };

    // Save as pending and immediately navigate to Payment Page
    createPendingBooking(bookingData);
    navigate('/payment', { state: { booking: bookingData } });
  };

  // Filter Hotels
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                          hotel.location.toLowerCase().includes(searchVal.toLowerCase());
    const matchesPrice = hotel.price <= maxPrice;
    const matchesAmenities = selectedAmenities.every(am => hotel.amenities.includes(am));

    return matchesSearch && matchesPrice && matchesAmenities;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 tracking-tight">
          Find Luxury Accommodation
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Experience 5-star service. Book award-winning overwater villas, traditional ryokans, and classic boutique hotels.
        </p>
      </div>

      {/* Hotels Search Bar */}
      <section className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end text-xs font-semibold text-slate-600">
          
          {/* Destination Location */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <MapPin size={12} className="mr-1 text-primary" /> Destination
            </label>
            <input
              type="text"
              placeholder="Where are you going?"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 outline-none font-bold text-slate-700 placeholder-slate-400"
            />
          </div>

          {/* Check-in Date */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Calendar size={12} className="mr-1 text-primary" /> Check-in Date
            </label>
            <input
              type="date"
              required
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer"
            />
          </div>

          {/* Check-out Date */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Calendar size={12} className="mr-1 text-primary" /> Check-out Date
            </label>
            <input
              type="date"
              required
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer"
            />
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
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4+ Guests</option>
            </select>
          </div>

        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="font-heading font-bold text-slate-800 text-sm">Filter Stays</h3>
            <button
              onClick={() => { setSearchVal(''); setMaxPrice(5000); setSelectedAmenities([]); }}
              className="text-xs text-slate-400 hover:text-primary font-semibold cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Max Price Slider */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-400 uppercase tracking-wider">Max Price / Night</label>
              <span className="font-bold text-primary">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max="700"
              step="20"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Amenities checkboxes */}
          <div className="flex flex-col space-y-2.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Amenities</label>
            {amenitiesList.map(am => (
              <label key={am} className="flex items-center space-x-2.5 text-xs text-slate-600 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(am)}
                  onChange={() => toggleAmenity(am)}
                  className="w-4 h-4 rounded border-slate-300 text-primary accent-primary cursor-pointer"
                />
                <span>{am}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Hotels Grid */}
        <div className="lg:col-span-3">
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHotels.map((hotel, idx) => {
                const nights = getNights();
                const rateINRPerNight = hotel.price * 85;
                const totalINR = hotel.price * nights * 85;

                return (
                  <motion.div
                    key={hotel.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 flex flex-col justify-between transition-all duration-300"
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: (idx % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                  >
                    {/* Photo */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => toggleFavorite(hotel.id)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/95 text-slate-600 hover:text-red-500 shadow-sm cursor-pointer"
                      >
                        <Heart
                          size={16}
                          className={isFavorite(hotel.id) ? "fill-red-500 text-red-500" : ""}
                        />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-base font-bold text-slate-800 font-heading leading-tight">{hotel.name}</h3>
                            <span className="text-[10px] text-slate-400 font-semibold flex items-center mt-1">
                              <MapPin size={10} className="mr-0.5" /> {hotel.location}
                            </span>
                          </div>
                          <div className="flex items-center text-amber-500 text-[10px] font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                            <Star size={10} className="fill-amber-500 mr-0.5" /> {hotel.rating}
                          </div>
                        </div>

                        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">{hotel.description}</p>
                        
                        {/* Amenities */}
                        <div className="flex flex-wrap gap-1 mb-6">
                          {hotel.amenities.map(am => (
                            <span key={am} className="text-[9px] bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-md">
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none mb-1">
                            {nights} Night{nights > 1 ? 's' : ''} Stay
                          </span>
                          <span className="text-lg font-bold text-primary font-heading">
                            {formatINR(totalINR)}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-normal">
                            ({formatINR(rateINRPerNight)} / night)
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handleOpenBookingModal(hotel)}
                          className="bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Reserve Room</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-heading">No Stays Found</h3>
              <p className="text-slate-400 text-xs max-w-sm mt-2">
                Expand your maximum budget or try unchecking some amenities criteria.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Hotel Booking Form Modal */}
      <AnimatePresence>
        {selectedHotel && (
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
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">Hotel Reservation Form</span>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mt-0.5">
                    {selectedHotel.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="text-slate-400" />
                    <span>{selectedHotel.location}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedHotel(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmitBooking} className="space-y-4 pt-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Primary Guest Full Name</label>
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
                    <label className="text-xs font-semibold text-slate-700 block">Email Address (for voucher)</label>
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

                {/* Dates & Room Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Check-in Date</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Check-out Date</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Special Requests (Optional)</label>
                  <input
                    type="text"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="High floor, king bed, quiet room, late check-in..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                {/* Price Breakdown Preview */}
                <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Base Room Rate ({getNights()} Nights, {guests} Guests):</span>
                    <span className="font-semibold text-slate-900">
                      {formatINR(selectedHotel.price * getNights() * 85)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST & Hotel Luxury Taxes (12%):</span>
                    <span className="font-semibold text-slate-900">
                      {formatINR(Math.round(selectedHotel.price * getNights() * 85 * 0.12))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee:</span>
                    <span className="font-semibold text-slate-900">₹499</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm text-slate-900">
                    <span>Total Amount Payable:</span>
                    <span className="text-primary font-black text-base">
                      {formatINR(Math.round(selectedHotel.price * getNights() * 85 * 1.12 + 499))}
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
                    You will be directly redirected to the Razorpay Test Payment Page.
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
