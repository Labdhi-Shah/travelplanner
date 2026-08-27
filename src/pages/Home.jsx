import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Users, Star, Heart, MapPin, ArrowRight, Shield, Globe, Award, Send } from 'lucide-react';
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

  // Select top 3 destinations, packages, and hotels to show on home page
  const homeDestinations = destinations.slice(0, 6);
  const homePackages = packages.slice(0, 3);
  const homeHotels = hotels.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-[100vh] min-h-[600px] flex items-center justify-center bg-primary-dark">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1920&q=80"
            alt="Scenic view of hot air balloons at sunrise"
            className="w-full h-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/40 to-primary-dark/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white mt-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-accent/25 border border-accent/40 text-accent-light px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 inline-block backdrop-blur-sm">
              Discover Your Next Horizon
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore the World, <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light">Your Own Way</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover breathtaking destinations, plan custom day-by-day itineraries, and organize every part of your trip in one premium dashboard.
          </motion.p>

          {/* Search Box */}
          <motion.div
            className="bg-white/95 p-4 sm:p-5 md:p-6 rounded-3xl shadow-2xl border border-white/20 max-w-4xl mx-auto text-slate-800 backdrop-blur-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
              {/* Destination */}
              <div className="flex flex-col text-left px-2 border-r border-slate-200 last:border-0 md:mb-0 mb-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                  <MapPin size={12} className="text-primary mr-1" /> Where to?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bali, Paris..."
                  value={searchDest}
                  onChange={(e) => setSearchDest(e.target.value)}
                  className="bg-transparent border-none outline-none font-semibold text-sm text-slate-700 placeholder-slate-400 py-1"
                />
              </div>

              {/* Start Date */}
              <div className="flex flex-col text-left px-2 border-r border-slate-200 last:border-0 md:mb-0 mb-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                  <Calendar size={12} className="text-primary mr-1" /> Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent border-none outline-none font-semibold text-sm text-slate-700 py-1"
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col text-left px-2 border-r border-slate-200 last:border-0 md:mb-0 mb-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                  <Calendar size={12} className="text-primary mr-1" /> End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent border-none outline-none font-semibold text-sm text-slate-700 py-1"
                />
              </div>

              {/* Travelers */}
              <div className="flex flex-col text-left px-2 last:border-0 md:mb-0 mb-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                  <Users size={12} className="text-primary mr-1" /> Guests
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="bg-transparent border-none outline-none font-semibold text-sm text-slate-700 py-1"
                >
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4+ Travelers</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="col-span-1 sm:col-span-2 md:col-span-4 mt-2">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-light text-white font-heading font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <Search size={18} />
                  <span>Search Journeys</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. Popular Destinations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm tracking-wider uppercase">Discovery Hub</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-800 mt-2">Popular Destinations</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-3">Explore the most breathtaking places around the globe curated by travel experts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeDestinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden shrink-0">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Favorites Toggle */}
                <button
                  onClick={() => toggleFavorite(dest.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-red-500 shadow-md transition-colors"
                >
                  <Heart
                    size={18}
                    className={isFavorite(dest.id) ? "fill-red-500 text-red-500" : "text-slate-600"}
                  />
                </button>
                
                {/* Region Tag */}
                <span className="absolute bottom-4 left-4 bg-accent text-primary-dark font-heading font-semibold text-xs px-3 py-1 rounded-full shadow-md">
                  {dest.category}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center">
                      <MapPin size={12} className="mr-1" /> {dest.country}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-lg">
                      <Star size={12} className="fill-amber-500 mr-1" /> {dest.rating}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2 font-heading">{dest.name}</h3>
                  <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-6">{dest.description}</p>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Starts From</span>
                    <span className="text-xl font-bold text-primary">${dest.price} <span className="text-xs text-slate-400 font-normal">/ pax</span></span>
                  </div>
                  <Link
                    to={`/destinations/${dest.id}`}
                    className="flex items-center space-x-1 font-heading text-xs font-semibold text-primary hover:text-accent transition-colors"
                  >
                    <span>Explore Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/destinations"
            className="inline-flex items-center space-x-2 bg-stone-100 hover:bg-stone-200 text-slate-700 font-heading font-semibold text-sm px-6 py-3 rounded-full transition-colors"
          >
            <span>View All Destinations</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 3. Featured Tour Packages */}
      <section className="bg-primary-dark/5 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-wider uppercase font-sans">Curated Itineraries</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-800 mt-2">Featured Tour Packages</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto mt-3">All-inclusive premium vacation packages featuring guided activities and luxury hotels.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homePackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary-dark/80 backdrop-blur-md text-white font-heading font-semibold text-xs px-3 py-1 rounded-full">
                    {pkg.duration}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-700 font-heading font-semibold text-xs px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
                    <Users size={12} className="text-slate-400" />
                    <span>{pkg.travelers}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-amber-500 text-xs font-semibold mb-2">
                      <Star size={12} className="fill-amber-500 mr-1" />
                      <span>{pkg.rating} Rating</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 font-heading">{pkg.name}</h3>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">{pkg.overview}</p>

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
                      <span className="text-xl font-bold text-primary">${pkg.price} <span className="text-xs text-slate-400 font-normal">total</span></span>
                    </div>
                    <Link
                      to={`/packages/${pkg.id}`}
                      className="bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors"
                    >
                      View Package
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/packages"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-light text-white font-heading font-semibold text-sm px-6 py-3 rounded-full transition-colors shadow-lg"
            >
              <span>Browse All Packages</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured Hotels */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm tracking-wider uppercase">Luxury Stays</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-800 mt-2">Featured Hotels</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-3">Handpicked 5-star resorts and traditional stays featuring premier wellness amenities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Hotel image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Favorites button */}
                <button
                  onClick={() => toggleFavorite(hotel.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-red-500 shadow-md transition-colors"
                >
                  <Heart
                    size={18}
                    className={isFavorite(hotel.id) ? "fill-red-500 text-red-500" : "text-slate-600"}
                  />
                </button>
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
                    <span className="text-xl font-bold text-primary">${hotel.price} <span className="text-xs text-slate-400 font-normal">/ night</span></span>
                  </div>
                  <Link
                    to="/hotels"
                    className="text-primary hover:text-accent font-heading text-xs font-semibold px-4 py-2 bg-stone-50 rounded-xl transition-colors border border-stone-100"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Travel Experiences Categories */}
      <section className="bg-[#0b2426] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold text-sm tracking-wider uppercase font-sans">Curated Niches</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-2">Travel Experiences</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto mt-3">Find vacation packages that match your lifestyle, from mountain hikes to private beaches.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {experienceCategories.map((exp, index) => (
              <motion.div
                key={exp.name}
                className="relative h-44 rounded-3xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => navigate(`/destinations?category=${exp.name}`)}
              >
                <img
                  src={exp.image}
                  alt={exp.name}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-bold font-heading text-white leading-tight">{exp.name}</h3>
                  <span className="text-xs text-accent-light font-semibold">{exp.count} Destinations</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Assurances */}
      <section className="py-20 bg-stone-50 border-y border-stone-200/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-sm">
              <Shield size={30} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-heading mb-2">Secure Premium Travel</h3>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">All packages and hotel reservations are fully backed by trip protection and flexible refunds.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-sm">
              <Globe size={30} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-heading mb-2">Infinite Destinations</h3>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">Access pre-planned routes and customized timelines for hundreds of exotic locations worldwide.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-sm">
              <Award size={30} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-heading mb-2">Expert Concierge Support</h3>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">Enjoy premium travel planning widgets and budget trackers optimized by our professional agents.</p>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm tracking-wider uppercase font-sans">Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-800 mt-2">What Our Travelers Say</h2>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 relative">
          <div className="flex flex-col items-center text-center">
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
            
            <blockquote className="text-slate-600 text-sm md:text-base leading-relaxed italic mb-6 max-w-2xl">
              "{testimonials[testimonialIdx].review}"
            </blockquote>

            <div>
              <h4 className="text-sm font-bold text-slate-800 font-heading">{testimonials[testimonialIdx].name}</h4>
              <span className="text-xs text-slate-400">{testimonials[testimonialIdx].location}</span>
            </div>

            {/* Pagination / Controls */}
            <div className="flex items-center space-x-6 mt-8">
              <button
                onClick={handleTestimonialPrev}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors"
              >
                ←
              </button>
              <span className="text-xs font-semibold text-slate-400">
                {testimonialIdx + 1} / {testimonials.length}
              </span>
              <button
                onClick={handleTestimonialNext}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Newsletter CTA */}
      <section className="py-20 bg-primary-dark text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#072426] opacity-95" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="text-accent font-heading font-bold text-xs uppercase tracking-widest block mb-4">Newsletter</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-white">Get Travel Inspiration</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-8">
            Discover new destinations, exclusive travel deals, and trip-planning inspiration delivered weekly.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed! Thank you."); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-accent transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent-light text-primary-dark font-heading font-semibold text-sm px-6 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-accent/10"
            >
              <span>Subscribe</span>
              <Send size={14} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
