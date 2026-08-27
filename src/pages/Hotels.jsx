import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Heart, MapPin, Calendar, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { hotels, amenitiesList } from '../data/hotels';

export default function Hotels() {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, addBooking } = useTravel();

  // Search parameters states
  const [searchVal, setSearchVal] = useState('');
  const [checkIn, setCheckIn] = useState(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 15 days out
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 18 days out (3 nights)
  const [guests, setGuests] = useState('2');
  
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [successBooking, setSuccessBooking] = useState(null);

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

  const handleBookHotel = (hotel) => {
    const nights = getNights();
    const totalPrice = hotel.price * nights;
    const bookingData = {
      category: 'Hotels',
      title: `${hotel.name} (${nights} Nights stay)`,
      date: checkIn,
      location: hotel.location,
      price: totalPrice,
      status: 'Confirmed'
    };

    addBooking(bookingData);
    setSuccessBooking({
      ...bookingData,
      hotelDetails: hotel,
      nightsCount: nights,
      guestsCount: guests,
      checkOutDate: checkOut
    });
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

      {/* Hotels Search Bar (New Feature!) */}
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
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none"
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
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none"
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
              className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 outline-none font-bold text-slate-700"
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
              className="text-xs text-slate-400 hover:text-primary font-semibold"
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
                  className="w-4 h-4 rounded border-slate-300 text-primary accent-primary"
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
              {filteredHotels.map((hotel, idx) => (
                <motion.div
                  key={hotel.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
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
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/95 text-slate-600 hover:text-red-500 shadow-sm"
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

                    {/* Footer price & CTA */}
                    <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase block">Rate Per Night</span>
                        <span className="text-base font-bold text-primary">${hotel.price} <span className="text-[10px] text-slate-400 font-normal">/ night</span></span>
                      </div>
                      <button
                        onClick={() => handleBookHotel(hotel)}
                        className="bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                      >
                        Book Stay
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
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

      {/* Success Booking Modal Overlay */}
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
                <h3 className="text-xl font-bold font-heading text-slate-800">Hotel Booked Successfully!</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  We've secured a room for {successBooking.guestsCount} guests at <strong>{successBooking.hotelDetails.name}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-semibold text-slate-600 space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">Hotel Resort:</span>
                  <span className="truncate max-w-[180px]">{successBooking.hotelDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span>{successBooking.nightsCount} Nights Stay</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Check-In:</span>
                  <span>{successBooking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Check-Out:</span>
                  <span>{successBooking.checkOutDate}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200/50 pt-2 font-bold text-slate-850">
                  <span className="text-slate-400">Total Invoice:</span>
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
