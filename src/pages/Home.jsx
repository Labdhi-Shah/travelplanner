import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, Users, Star, Heart, MapPin, 
  ArrowRight, Shield, Globe, Award, Send, Sparkles, Compass 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';
import { hotels } from '../data/hotels';
import { testimonials } from '../data/testimonials';
import { experienceCategories } from '../data/hotels';

export default function Home() {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useTravel();

  // Search box state
  const [searchDest, setSearchDest] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState('2');

  // Testimonial index
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/destinations?search=${encodeURIComponent(searchDest)}&travelers=${travelers}`);
  };

  const handleTestimonialNext = () => {
    setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handleTestimonialPrev = () => {
    setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Select top items for home page showcase
  const homeDestinations = destinations.slice(0, 6);
  const homePackages = packages.slice(0, 3);
  const homeHotels = hotels.slice(0, 3);

  // Animation variants for smooth re-usable transitions
  const headingVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="overflow-hidden bg-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION MATCHING REFERENCE DESIGN                                  */}
      {/* ========================================================================= */}
      <section className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center bg-[#072d30] overflow-hidden pt-20 pb-16">
        {/* Full-Screen Landscape Background Image with subtle atmospheric overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-canyon.jpg"
            alt="Scenic Canyon River Landscape"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />
          {/* Natural Vignette & Contrast Overlays for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />
          <div className="absolute inset-0 bg-[#072d30]/25 mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-8 sm:mt-12">
          
          {/* Airplane Trail & Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            {/* Small Flying Airplane with dashed flight path */}
            <div className="flex items-center gap-1.5 opacity-90 select-none">
              <svg 
                className="w-5 h-5 text-white transform -rotate-45 drop-shadow" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
              <span className="hidden sm:inline-block w-8 border-b-2 border-dashed border-white/50" />
            </div>

            {/* Pill Badge */}
            <span className="border border-[#D4A373]/50 bg-black/35 backdrop-blur-md text-[#E5C38C] text-[11px] sm:text-xs font-bold uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg inline-block">
              Discover Your Next Horizon
            </span>
          </motion.div>

          {/* Main Headline: "Explore the World, Your Own Way" */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading mb-6 tracking-tight drop-shadow-md text-white leading-tight"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Explore the World, <br className="hidden sm:inline" />
            <span className="text-[#E5B869] drop-shadow-lg">
              Your Own Way
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-slate-100/90 mb-10 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Discover breathtaking destinations, plan custom day-by-day itineraries, and organize every part of your trip in one premium dashboard.
          </motion.p>

          {/* Search Box Widget (White Floating Card matching Reference) */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-5 sm:p-7 max-w-4xl mx-auto text-slate-800 border border-white/40"
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              {/* 4-Column Inputs Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                {/* 1. Where To? */}
                <div className="flex flex-col text-left px-3 pt-2 sm:pt-0">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                    <MapPin size={12} className="text-slate-400 mr-1" /> WHERE TO?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bali, Paris..."
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                    className="bg-transparent border-none outline-none font-semibold text-xs sm:text-sm text-slate-800 placeholder-slate-400 py-1.5 w-full"
                  />
                </div>

                {/* 2. Start Date */}
                <div className="flex flex-col text-left px-3 pt-3 sm:pt-0 relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                    <Calendar size={12} className="text-slate-400 mr-1" /> START DATE
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-transparent border-none outline-none font-semibold text-xs sm:text-sm text-slate-700 py-1.5 cursor-pointer"
                    />
                  </div>
                </div>

                {/* 3. End Date */}
                <div className="flex flex-col text-left px-3 pt-3 sm:pt-0 relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                    <Calendar size={12} className="text-slate-400 mr-1" /> END DATE
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-transparent border-none outline-none font-semibold text-xs sm:text-sm text-slate-700 py-1.5 cursor-pointer"
                    />
                  </div>
                </div>

                {/* 4. Guests */}
                <div className="flex flex-col text-left px-3 pt-3 sm:pt-0">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                    <Users size={12} className="text-slate-400 mr-1" /> GUESTS
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className="w-full bg-transparent border-none outline-none font-semibold text-xs sm:text-sm text-slate-700 py-1.5 cursor-pointer appearance-none pr-6"
                    >
                      <option value="1">1 Traveler</option>
                      <option value="2">2 Travelers</option>
                      <option value="3">3 Travelers</option>
                      <option value="4">4+ Travelers</option>
                    </select>
                    <Users size={13} className="text-slate-400 absolute right-1 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Wide Rounded Submit Button: "Search Journeys" */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01, backgroundColor: '#165B5F' }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-[#0A3D40] text-white font-heading font-bold text-sm sm:text-base py-3.5 sm:py-4 px-6 rounded-2xl flex items-center justify-center space-x-2.5 shadow-lg shadow-[#0A3D40]/25 transition-all duration-300 cursor-pointer"
                >
                  <Search size={18} />
                  <span>Search Journeys</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. POPULAR DESTINATIONS WITH STAGGERED SCROLL ANIMATIONS                  */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headingVariants}
        >
          <span className="text-primary font-bold text-xs tracking-widest uppercase bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
            Discovery Hub
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 mt-3 tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-3">
            Explore the most breathtaking places around the globe curated by travel experts.
          </p>
        </motion.div>

        {/* Destination Cards Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeDestinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 group flex flex-col justify-between transition-shadow duration-300"
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
            >
              {/* Card Image with Reveal Zoom */}
              <div className="relative h-64 overflow-hidden shrink-0">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Favorites Toggle */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(dest.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/95 backdrop-blur-sm text-slate-600 hover:text-red-500 shadow-md transition-colors cursor-pointer"
                >
                  <Heart
                    size={18}
                    className={isFavorite(dest.id) ? "fill-red-500 text-red-500" : "text-slate-600"}
                  />
                </motion.button>
                
                {/* Region Tag */}
                <span className="absolute bottom-4 left-4 bg-accent text-primary-dark font-heading font-bold text-xs px-3 py-1 rounded-full shadow-md">
                  {dest.category}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center">
                      <MapPin size={12} className="mr-1" /> {dest.country}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-lg">
                      <Star size={12} className="fill-amber-500 mr-1" /> {dest.rating}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2 font-heading leading-tight">{dest.name}</h3>
                  <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-6">{dest.description}</p>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Starts From</span>
                    <span className="text-xl font-extrabold text-primary font-heading">
                      ${dest.price} <span className="text-xs text-slate-400 font-normal">/ pax</span>
                    </span>
                  </div>
                  <Link
                    to={`/destinations/${dest.id}`}
                    className="inline-flex items-center space-x-1 font-heading text-xs font-bold text-primary hover:text-accent transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/destinations"
            className="inline-flex items-center space-x-2 bg-stone-100 hover:bg-stone-200 text-slate-800 font-heading font-bold text-sm px-7 py-3.5 rounded-full transition-all shadow-sm hover:shadow-md hover:scale-105"
          >
            <span>View All Destinations</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED TOUR PACKAGES WITH SLIDE-UP + SCALE ANIMATIONS                 */}
      {/* ========================================================================= */}
      <section className="bg-stone-50/80 border-y border-slate-100 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={headingVariants}
          >
            <span className="text-primary font-bold text-xs tracking-widest uppercase bg-primary/5 px-3 py-1 rounded-full border border-primary/10 font-sans">
              Curated Itineraries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 mt-3 tracking-tight">
              Featured Tour Packages
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto mt-3">
              All-inclusive premium vacation packages featuring guided activities and luxury hotels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homePackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-100 flex flex-col justify-between transition-shadow duration-300"
                initial={{ opacity: 0, y: 55, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary-dark/85 backdrop-blur-md text-white font-heading font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                    {pkg.duration}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-slate-800 font-heading font-bold text-xs px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
                    <Users size={12} className="text-slate-400" />
                    <span>{pkg.travelers}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-amber-500 text-xs font-bold mb-2">
                      <Star size={12} className="fill-amber-500 mr-1" />
                      <span>{pkg.rating} Rating</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 font-heading">{pkg.name}</h3>
                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">{pkg.overview}</p>

                    {/* Included tags */}
                    <div className="mb-6">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Highlights include:</span>
                      <div className="flex flex-wrap gap-1">
                        {pkg.includedActivities.slice(0, 3).map((act) => (
                          <span key={act} className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-md">
                            {act}
                          </span>
                        ))}
                        {pkg.includedActivities.length > 3 && (
                          <span className="text-[10px] bg-slate-100 text-slate-400 font-medium px-2 py-1 rounded-md">
                            +{pkg.includedActivities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none mb-1">Starts At</span>
                      <span className="text-xl font-black text-primary font-heading">${pkg.price} <span className="text-xs text-slate-400 font-normal">total</span></span>
                    </div>
                    <Link
                      to={`/packages/${pkg.id}`}
                      className="bg-primary hover:bg-primary-light text-white font-heading font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 cursor-pointer"
                    >
                      View Package
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/packages"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-light text-white font-heading font-bold text-sm px-7 py-3.5 rounded-full transition-all shadow-lg hover:shadow-primary/25 hover:scale-105"
            >
              <span>Browse All Packages</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED HOTELS WITH SLIDE-RIGHT / STAGGER ANIMATIONS                  */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headingVariants}
        >
          <span className="text-primary font-bold text-xs tracking-widest uppercase bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
            Luxury Stays
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 mt-3 tracking-tight">
            Featured Hotels
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-3">
            Handpicked 5-star resorts and traditional stays featuring premier wellness amenities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-100 flex flex-col justify-between transition-shadow duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -35 : 35, y: 25 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
            >
              {/* Hotel image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Favorites button */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(hotel.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/95 backdrop-blur-sm text-slate-600 hover:text-red-500 shadow-md transition-colors cursor-pointer"
                >
                  <Heart
                    size={18}
                    className={isFavorite(hotel.id) ? "fill-red-500 text-red-500" : "text-slate-600"}
                  />
                </motion.button>
              </div>

              {/* Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 font-heading">{hotel.name}</h3>
                      <span className="text-xs text-slate-400 font-semibold flex items-center mt-1">
                        <MapPin size={12} className="mr-1" /> {hotel.location}
                      </span>
                    </div>
                    <div className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-lg shrink-0">
                      <Star size={12} className="fill-amber-500 mr-1" /> {hotel.rating}
                    </div>
                  </div>
                  
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4 mt-2">{hotel.description}</p>

                  {/* Amenities */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.map((am) => (
                        <span key={am} className="text-[10px] border border-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-md">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Price Per Night</span>
                    <span className="text-xl font-bold text-primary font-heading">${hotel.price} <span className="text-xs text-slate-400 font-normal">/ night</span></span>
                  </div>
                  <Link
                    to="/hotels"
                    className="text-primary hover:text-accent font-heading text-xs font-bold px-4 py-2 bg-stone-50 rounded-xl transition-all border border-stone-100 hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TRAVEL EXPERIENCES WITH ALTERNATING ZOOM & REVEAL ANIMATIONS           */}
      {/* ========================================================================= */}
      <section className="bg-[#0b2426] text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={headingVariants}
          >
            <span className="text-accent font-bold text-xs tracking-widest uppercase font-sans">
              Curated Niches
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-3 tracking-tight">
              Travel Experiences
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto mt-3">
              Find vacation packages that match your lifestyle, from mountain hikes to private beaches.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {experienceCategories.map((exp, index) => (
              <motion.div
                key={exp.name}
                className="relative h-48 rounded-3xl overflow-hidden group cursor-pointer shadow-xl border border-white/5"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
                onClick={() => navigate(`/destinations?category=${exp.name}`)}
              >
                <img
                  src={exp.image}
                  alt={exp.name}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-115 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold font-heading text-white leading-tight">{exp.name}</h3>
                  <span className="text-xs text-accent-light font-semibold block mt-0.5">{exp.count} Destinations</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BRAND ASSURANCES WITH STAGGERED ICON TILE REVEAL                       */}
      {/* ========================================================================= */}
      <section className="py-24 bg-stone-50 border-y border-stone-200/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            {
              icon: Shield,
              title: "Secure Premium Travel",
              desc: "All packages and hotel reservations are fully backed by trip protection and flexible refunds."
            },
            {
              icon: Globe,
              title: "Infinite Destinations",
              desc: "Access pre-planned routes and customized timelines for hundreds of exotic locations worldwide."
            },
            {
              icon: Award,
              title: "Expert Concierge Support",
              desc: "Enjoy premium travel planning widgets and budget trackers optimized by our professional agents."
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 35, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.55, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div 
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 shadow-sm"
                >
                  <Icon size={30} />
                </motion.div>
                <h3 className="text-lg font-bold text-slate-800 font-heading mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TESTIMONIALS WITH DYNAMIC REVEAL & INTERACTIVE ROTATION                */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headingVariants}
        >
          <span className="text-primary font-bold text-xs tracking-widest uppercase bg-primary/5 px-3 py-1 rounded-full border border-primary/10 font-sans">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 mt-3 tracking-tight">
            What Our Travelers Say
          </h2>
        </motion.div>

        <motion.div 
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 relative"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={testimonialIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <img
                src={testimonials[testimonialIdx].avatar}
                alt={testimonials[testimonialIdx].name}
                className="w-20 h-20 rounded-full border-4 border-accent object-cover mb-6 shadow-md"
              />
              <div className="flex items-center text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(testimonials[testimonialIdx].rating) ? "fill-amber-400" : ""}
                  />
                ))}
              </div>
              
              <blockquote className="text-slate-600 text-sm md:text-base leading-relaxed italic mb-6 max-w-2xl font-normal">
                "{testimonials[testimonialIdx].review}"
              </blockquote>

              <div>
                <h4 className="text-base font-bold text-slate-800 font-heading">{testimonials[testimonialIdx].name}</h4>
                <span className="text-xs text-slate-400">{testimonials[testimonialIdx].location}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination / Controls */}
          <div className="flex items-center justify-center space-x-6 mt-8 border-t border-slate-100 pt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleTestimonialPrev}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
            >
              ←
            </motion.button>
            <span className="text-xs font-semibold text-slate-400">
              {testimonialIdx + 1} / {testimonials.length}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleTestimonialNext}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
            >
              →
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 8. NEWSLETTER CTA WITH GLOW & FADE-IN ANIMATION                           */}
      {/* ========================================================================= */}
      <section className="py-24 bg-primary-dark text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#072426] opacity-95" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <motion.div 
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-accent font-heading font-bold text-xs uppercase tracking-widest block mb-3">
            Newsletter
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-white">
            Get Travel Inspiration
          </h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Discover new destinations, exclusive travel deals, and trip-planning inspiration delivered weekly.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed! Thank you."); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-slate-400 outline-none focus:border-accent transition-colors backdrop-blur-sm"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04, backgroundColor: '#f5b042' }}
              whileTap={{ scale: 0.96 }}
              className="bg-accent text-primary-dark font-heading font-bold text-sm px-7 py-3.5 rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-accent/15 cursor-pointer shrink-0"
            >
              <span>Subscribe</span>
              <Send size={14} />
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
