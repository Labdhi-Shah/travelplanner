import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, Users, Star, ArrowRight, ShieldCheck, 
  MapPin, Clock, Hotel, Plane, Compass, Sparkles, Filter, 
  X, SlidersHorizontal, CheckCircle2, DollarSign 
} from 'lucide-react';
import { packages } from '../data/packages';

// City and region labels corresponding to the Home Page destinations
const CITY_LABELS = {
  bali: 'Bali, Indonesia',
  dubai: 'Dubai, UAE',
  paris: 'Paris, France',
  switzerland: 'Switzerland',
  maldives: 'Maldives',
  london: 'London, UK',
  kyoto: 'Kyoto, Japan',
  goa: 'Goa, India'
};

export default function Packages() {
  // Filter States
  const [searchVal, setSearchVal] = useState('');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [durationDays, setDurationDays] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [hotelFilter, setHotelFilter] = useState(false);
  const [flightFilter, setFlightFilter] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active filters count for badge display
  const activeFiltersCount = 
    (searchVal ? 1 : 0) +
    (maxPrice < 3000 ? 1 : 0) +
    (durationDays ? 1 : 0) +
    (hotelFilter ? 1 : 0) +
    (flightFilter ? 1 : 0);

  // Apply filters
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = 
      pkg.name.toLowerCase().includes(searchVal.toLowerCase()) || 
      pkg.overview.toLowerCase().includes(searchVal.toLowerCase()) ||
      pkg.includedActivities.some(a => a.toLowerCase().includes(searchVal.toLowerCase())) ||
      (CITY_LABELS[pkg.destinationId] || '').toLowerCase().includes(searchVal.toLowerCase());
    
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
    <div className="bg-slate-50/60 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* 1. HERO / HEADER SECTION                                                  */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-[#072d30] text-white p-8 sm:p-12 mb-10 shadow-xl border border-white/10">
          {/* Subtle Ambient Backdrops */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0a3d40] rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#cfa864]/15 rounded-full blur-3xl opacity-70 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[#E5C38C] text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Sparkles size={13} className="text-[#CFA864]" />
              <span>All-Inclusive Curated Journeys</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight"
            >
              Featured Tour <span className="text-[#E5B869]">Packages</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-200/90 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl font-normal"
            >
              Handpicked premium holiday packages combining luxury accommodations, seamless transit, and curated guided experiences across world-class destinations.
            </motion.p>

            {/* Quick Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 text-xs text-slate-300 font-medium"
            >
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 size={14} className="text-[#E5B869]" />
                <span>Handcrafted Itineraries</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 size={14} className="text-[#E5B869]" />
                <span>Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 size={14} className="text-[#E5B869]" />
                <span>Trip Protection Included</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MOBILE FILTER TOGGLE BAR (TABLET / MOBILE)                             */}
        {/* ========================================================================= */}
        <div className="lg:hidden mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex-1 bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between font-heading font-bold text-sm text-slate-800 active:scale-98 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-primary" />
              <span>Filter Packages</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <span className="text-xs text-primary font-semibold">
              {mobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </span>
          </button>

          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3.5 rounded-2xl border border-red-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. MAIN CONTENT: SIDEBAR + CARDS GRID                                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* --------------------------------------------------------------------- */}
          {/* SIDEBAR FILTER PANEL                                                  */}
          {/* --------------------------------------------------------------------- */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-md space-y-6 lg:sticky lg:top-24 transition-all duration-300`}>
            
            {/* Filter Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-primary" />
                <h3 className="font-heading font-bold text-slate-800 text-sm tracking-wide">
                  Filter Packages
                </h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <X size={13} />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Search Box */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Search Keyword
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Bali, Overwater, Alps..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 rounded-xl pl-9 pr-8 py-2.5 text-xs text-slate-800 outline-none transition-all"
                />
                <Search size={14} className="text-slate-400 absolute left-3 top-3 pointer-events-none" />
                {searchVal && (
                  <button 
                    type="button"
                    onClick={() => setSearchVal('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Max Budget
                </label>
                <span className="text-xs font-extrabold text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg font-heading">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="700"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
                <span>$700</span>
                <span>$1,850</span>
                <span>$3,000+</span>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Trip Duration
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: '', label: 'Any' },
                  { id: 'short', label: '3-5 Days' },
                  { id: 'medium', label: '6-8 Days' },
                  { id: 'long', label: '9+ Days' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDurationDays(d.id)}
                    className={`py-2 px-2.5 text-xs font-semibold rounded-xl border transition-all text-center cursor-pointer ${
                      durationDays === d.id
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inclusions Checkboxes */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Package Inclusions
              </label>
              
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                  hotelFilter 
                    ? 'bg-primary/5 border-primary/30 text-primary font-semibold' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={hotelFilter}
                    onChange={(e) => setHotelFilter(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Hotel size={13} className="text-slate-500" />
                    <span>Includes 5-Star Hotel Stay</span>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                  flightFilter 
                    ? 'bg-primary/5 border-primary/30 text-primary font-semibold' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/70'
                }`}>
                  <input
                    type="checkbox"
                    checked={flightFilter}
                    onChange={(e) => setFlightFilter(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Plane size={13} className="text-slate-500" />
                    <span>Includes Flight Transit</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Assurance Trust Tile */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/60 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-primary font-bold">
                <ShieldCheck size={14} className="text-[#CFA864]" />
                <span>Verified Travel Guarantee</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                All packages include 100% verified hotels, certified tour guides, and customer care.
              </p>
            </div>

          </aside>

          {/* --------------------------------------------------------------------- */}
          {/* DISPLAY PANEL: SORT BAR + PACKAGE CARDS                               */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar Bar */}
            <div className="bg-white px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">
                  Showing {sortedPackages.length} {sortedPackages.length === 1 ? 'Package' : 'Packages'}
                </span>
                {activeFiltersCount > 0 && (
                  <span className="text-[11px] text-slate-400 font-normal">
                    (Filtered from {packages.length})
                  </span>
                )}
              </div>

              {/* Sorting Control */}
              <div className="flex items-center space-x-2.5">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <SlidersHorizontal size={12} />
                  <span>Sort by:</span>
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-primary cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <option value="rating">Highest Rated ★</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Cards Grid */}
            {sortedPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {sortedPackages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: (idx % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Top Image Banner */}
                    <div className="relative h-56 overflow-hidden shrink-0">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      
                      {/* Atmospheric Contrast Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Top Badges: Duration & Travelers */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="bg-[#072d30]/90 backdrop-blur-md text-white font-heading font-bold text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-white/10">
                          <Clock size={11} className="text-[#CFA864]" />
                          <span>{pkg.duration}</span>
                        </span>
                        <span className="bg-white/95 backdrop-blur-md text-slate-800 font-heading font-bold text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Users size={11} className="text-slate-500" />
                          <span>{pkg.travelers}</span>
                        </span>
                      </div>

                      {/* Bottom Image Info: City Name Tag & Rating */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className="bg-[#CFA864] text-[#072D30] font-heading font-bold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                          <MapPin size={12} className="shrink-0" />
                          <span>{CITY_LABELS[pkg.destinationId] || pkg.destinationId}</span>
                        </span>

                        <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold text-amber-600">
                          <Star size={12} className="fill-amber-500 text-amber-500" />
                          <span>{pkg.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-800 font-heading group-hover:text-primary transition-colors leading-snug line-clamp-1">
                          {pkg.name}
                        </h3>

                        {/* Overview snippet */}
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mt-2 font-normal">
                          {pkg.overview}
                        </p>

                        {/* Highlight Activities Chips */}
                        <div className="mt-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Highlights:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {pkg.includedActivities.slice(0, 3).map((act) => (
                              <span 
                                key={act} 
                                className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-lg border border-slate-200/50"
                              >
                                {act}
                              </span>
                            ))}
                            {pkg.includedActivities.length > 3 && (
                              <span className="text-[10px] bg-slate-100 text-slate-400 font-medium px-2 py-1 rounded-lg">
                                +{pkg.includedActivities.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Feature Badges: Hotel, Flight, Transport */}
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-[10px] font-bold">
                          {pkg.hasHotel && (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
                              <Hotel size={11} /> Hotel Stay
                            </span>
                          )}
                          {pkg.hasFlight && (
                            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
                              <Plane size={11} /> Flight Transit
                            </span>
                          )}
                          {pkg.hasTransport && (
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-100">
                              <Compass size={11} /> Transfers
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Price & Action */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block leading-none mb-1">
                            Starting Price
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-extrabold text-primary font-heading">
                              ${pkg.price}
                            </span>
                            <span className="text-[11px] text-slate-400 font-normal">
                              / person
                            </span>
                          </div>
                        </div>

                        <Link
                          to={`/packages/${pkg.id}`}
                          className="inline-flex items-center gap-1.5 bg-[#0A3D40] hover:bg-[#165B5F] text-white font-heading font-bold text-xs px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all group-hover:scale-102 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white p-12 sm:p-16 rounded-3xl border border-slate-200/80 shadow-sm text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center">
                  <Compass size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 font-heading">
                    No Matching Packages Found
                  </h3>
                  <p className="text-slate-400 text-xs max-w-sm mt-1 leading-relaxed">
                    We couldn't find any packages matching your search filters. Try expanding your maximum budget or clearing search keywords.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="bg-primary hover:bg-primary-light text-white font-heading font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
