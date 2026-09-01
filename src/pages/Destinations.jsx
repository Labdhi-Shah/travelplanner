import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Heart, SlidersHorizontal, ArrowRight, Grid3X3 } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { destinations } from '../data/destinations';
import { travelCategories } from '../data/hotels';

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleFavorite, isFavorite } = useTravel();

  // Load initial search queries from URL
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || '';

  // Filter States
  const [searchVal, setSearchVal] = useState(querySearch);
  const [categoryFilter, setCategoryFilter] = useState(queryCategory);
  const [countryFilter, setCountryFilter] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    setSearchVal(searchParams.get('search') || '');
    setCategoryFilter(searchParams.get('category') || '');
  }, [searchParams]);

  // Unique countries list for filter dropdown
  const countries = [...new Set(destinations.map(d => d.country))];

  // Filtering Logic
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchVal.toLowerCase()) || 
                          dest.country.toLowerCase().includes(searchVal.toLowerCase()) ||
                          dest.description.toLowerCase().includes(searchVal.toLowerCase());
    const matchesCategory = categoryFilter === '' || dest.tags.includes(categoryFilter) || dest.category === categoryFilter;
    const matchesCountry = countryFilter === '' || dest.country === countryFilter;
    const matchesBudget = budgetFilter === '' || dest.averageBudget === budgetFilter;

    return matchesSearch && matchesCategory && matchesCountry && matchesBudget;
  });

  // Sorting Logic
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    return 0;
  });

  const clearFilters = () => {
    setSearchVal('');
    setCategoryFilter('');
    setCountryFilter('');
    setBudgetFilter('');
    setSortBy('rating-desc');
    setSearchParams({});
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center md:text-left mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 tracking-tight">
          Discover Your Next Destination
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Browse through our curated list of exotic locales, pristine beaches, historic cities, and high alpine retreats.
        </p>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm h-fit space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="font-heading font-bold text-slate-800 flex items-center">
              <SlidersHorizontal size={16} className="mr-2 text-primary" /> Filters
            </h3>
            <button 
              onClick={clearFilters}
              className="text-xs text-slate-400 hover:text-primary font-semibold transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Search Box */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Search Keyword</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Paris, Japan..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 outline-none transition-colors"
              />
              <Search size={14} className="text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Category Chips Selector */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Travel Style</label>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => setCategoryFilter('')}
                className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
                  categoryFilter === ''
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                All Styles
              </button>
              {travelCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
                    categoryFilter === cat
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Country Selection */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Country</label>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none transition-colors"
            >
              <option value="">All Countries</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Budget tier */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Budget Range</label>
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none transition-colors"
            >
              <option value="">All Budgets</option>
              <option value="Low">Value ($)</option>
              <option value="Medium">Medium ($$)</option>
              <option value="Luxury">Premium ($$$)</option>
            </select>
          </div>
        </aside>

        {/* Dynamic Display */}
        <div className="lg:col-span-3 space-y-6">
          {/* Mobile Filter Toggle + Sorting Bar */}
          <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition-all"
            >
              <SlidersHorizontal size={14} className="mr-1.5" /> Filters
            </button>

            <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
              Showing {sortedDestinations.length} destinations
            </span>

            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none font-semibold text-xs text-slate-700"
              >
                <option value="rating-desc">Rating: Highest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Drawer (Dynamic Modal style) */}
          {showMobileFilters && (
            <div className="lg:hidden bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xl">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h4 className="font-heading font-bold text-sm text-slate-800">Mobile Filters</h4>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="text-xs text-slate-400 font-semibold"
                >
                  Close
                </button>
              </div>
              <input
                type="text"
                placeholder="Search destination..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setCategoryFilter('')} className={`text-[10px] px-2 py-1 border rounded-lg ${categoryFilter === '' ? 'bg-primary text-white' : 'bg-white text-slate-500'}`}>All</button>
                {travelCategories.map(cat => (
                  <button key={cat} onClick={() => setCategoryFilter(cat)} className={`text-[10px] px-2 py-1 border rounded-lg ${categoryFilter === cat ? 'bg-primary text-white' : 'bg-white text-slate-500'}`}>{cat}</button>
                ))}
              </div>
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              >
                <option value="">All Countries</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              >
                <option value="">All Budgets</option>
                <option value="Low">Value ($)</option>
                <option value="Medium">Medium ($$)</option>
                <option value="Luxury">Premium ($$$)</option>
              </select>
              <button 
                onClick={() => { clearFilters(); setShowMobileFilters(false); }}
                className="w-full text-center text-xs text-red-500 font-semibold pt-2"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Cards Grid */}
          {sortedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sortedDestinations.map((dest, index) => (
                <motion.div
                  key={dest.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 group flex flex-col justify-between transition-all duration-300"
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                >
                  <div className="relative h-52 overflow-hidden shrink-0">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Heart button */}
                    <button
                      onClick={() => toggleFavorite(dest.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-600 hover:text-red-500 shadow-sm cursor-pointer"
                    >
                      <Heart
                        size={16}
                        className={isFavorite(dest.id) ? "fill-red-500 text-red-500" : ""}
                      />
                    </button>
                    
                    <span className="absolute bottom-4 left-4 bg-accent text-primary-dark font-heading font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
                      {dest.category}
                    </span>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center">
                          <MapPin size={10} className="mr-0.5" /> {dest.country}
                        </span>
                        <div className="flex items-center text-amber-500 text-[10px] font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                          <Star size={10} className="fill-amber-500 mr-0.5" /> {dest.rating}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-800 font-heading mb-1">{dest.name}</h3>
                      <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-4">{dest.description}</p>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase block">Starts From</span>
                        <span className="text-base font-bold text-primary font-heading">${dest.price} <span className="text-[10px] text-slate-400 font-normal">/ pax</span></span>
                      </div>
                      <Link
                        to={`/destinations/${dest.id}`}
                        className="flex items-center space-x-0.5 font-heading text-xs font-bold text-primary hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                      >
                        <span>Explore</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white p-16 rounded-3xl border border-slate-200/80 shadow-sm text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <Grid3X3 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-heading">No Destinations Found</h3>
              <p className="text-slate-400 text-xs max-w-sm mt-2">
                We couldn't find any destinations matching your filters. Try clearing your filters or search keywords.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-6 py-2.5 rounded-full shadow-md"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
