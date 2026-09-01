import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Users, Star, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { packages } from '../data/packages';

export default function Packages() {
  // Filters
  const [searchVal, setSearchVal] = useState('');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [durationDays, setDurationDays] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [hotelFilter, setHotelFilter] = useState(false);
  const [flightFilter, setFlightFilter] = useState(false);

  // Apply filters
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchVal.toLowerCase()) || 
                          pkg.overview.toLowerCase().includes(searchVal.toLowerCase()) ||
                          pkg.includedActivities.some(a => a.toLowerCase().includes(searchVal.toLowerCase()));
    const matchesPrice = pkg.price <= maxPrice;
    
    // Duration in days matching
    const matchesDuration = durationDays === '' ||
      (durationDays === 'short' && pkg.durationDays <= 5) ||
      (durationDays === 'medium' && pkg.durationDays > 5 && pkg.durationDays <= 8) ||
      (durationDays === 'long' && pkg.durationDays > 8);

    const matchesHotel = !hotelFilter || pkg.hasHotel;
    const matchesFlight = !flightFilter || pkg.hasFlight;

    return matchesSearch && matchesPrice && matchesDuration && matchesHotel && matchesFlight;
  });

  // Apply sorting
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const clearFilters = () => {
    setSearchVal('');
    setMaxPrice(3000);
    setDurationDays('');
    setSortBy('rating');
    setHotelFilter(false);
    setFlightFilter(false);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center md:text-left mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 tracking-tight">
          Featured Tour Packages
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Experience stress-free travel. Choose from our hand-curated all-inclusive packages combining premium hotels, flights, and activities.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filter Panel */}
        <aside className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="font-heading font-bold text-slate-800 text-sm">Filter Packages</h3>
            <button
              onClick={clearFilters}
              className="text-xs text-slate-400 hover:text-primary font-semibold"
            >
              Reset
            </button>
          </div>

          {/* Search Box */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Search Keyword</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Wellness, Wine..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl pl-9 pr-3 py-2 text-xs outline-none"
              />
              <Search size={14} className="text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-400 uppercase tracking-wider">Max Price</label>
              <span className="font-bold text-primary">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="800"
              max="3000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Duration Selector */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</label>
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none"
            >
              <option value="">Any Duration</option>
              <option value="short">Short (3-5 Days)</option>
              <option value="medium">Medium (6-8 Days)</option>
              <option value="long">Long (9+ Days)</option>
            </select>
          </div>

          {/* Amenities checkboxes */}
          <div className="flex flex-col space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inclusions</label>
            
            <label className="flex items-center space-x-2.5 text-xs text-slate-600 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={hotelFilter}
                onChange={(e) => setHotelFilter(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
              />
              <span>Includes 5-star Hotel Stay</span>
            </label>

            <label className="flex items-center space-x-2.5 text-xs text-slate-600 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={flightFilter}
                onChange={(e) => setFlightFilter(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
              />
              <span>Includes Flights</span>
            </label>
          </div>
        </aside>

        {/* Dynamic Display Panel */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Info sorting bar */}
          <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Found {sortedPackages.length} packages
            </span>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none font-semibold text-xs text-slate-700"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Cards Display */}
          {sortedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedPackages.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 flex flex-col justify-between transition-all duration-300"
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: (idx % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-primary-dark/85 backdrop-blur-sm text-white font-heading font-bold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                      {pkg.duration}
                    </span>
                    <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-800 font-heading font-bold text-[10px] px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1">
                      <Users size={10} className="text-slate-400" />
                      <span>{pkg.travelers}</span>
                    </span>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-amber-500 text-[10px] font-bold mb-2">
                        <Star size={10} className="fill-amber-500 mr-0.5" />
                        <span>{pkg.rating} Rating</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-800 font-heading mb-1 line-clamp-1">{pkg.name}</h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">{pkg.overview}</p>

                      {/* Inclusions features */}
                      <div className="flex space-x-3 mb-6">
                        {pkg.hasHotel && <span className="text-[9px] bg-green-50 border border-green-100 text-green-700 font-bold px-2 py-0.5 rounded-md">✓ Hotel</span>}
                        {pkg.hasFlight && <span className="text-[9px] bg-blue-50 border border-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-md">✓ Flights</span>}
                        {pkg.hasTransport && <span className="text-[9px] bg-amber-50 border border-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-md">✓ Transport</span>}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none mb-1">Starting Price</span>
                        <span className="text-lg font-bold text-primary font-heading">${pkg.price} <span className="text-[10px] text-slate-400 font-normal">total</span></span>
                      </div>
                      <Link
                        to={`/packages/${pkg.id}`}
                        className="bg-primary hover:bg-primary-light text-white font-heading font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm hover:scale-105"
                      >
                        View Package
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white p-16 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-heading">No Packages Found</h3>
              <p className="text-slate-400 text-xs max-w-sm mt-2">
                Try expanding your maximum budget slider or clearing keywords.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-6 py-2.5 rounded-full"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
