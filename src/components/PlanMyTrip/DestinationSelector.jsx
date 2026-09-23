import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Check } from 'lucide-react';
import { DESTINATIONS, CATEGORIES } from '../../data/tripData';

export default function DestinationSelector({ selectedDestination, onSelectDestination }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = activeCategory === 'All' || dest.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-primary-dark font-semibold text-sm flex items-center justify-center">
              1
            </span>
            <h2 className="text-xl font-bold text-slate-800 font-heading">
              Select Destination
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Choose where your next journey begins across curated worldwide locations.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search destination or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Destinations Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDestinations.map((dest) => {
          const isSelected = selectedDestination?.id === dest.id;
          return (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 shadow-md transform -translate-y-0.5'
                  : 'border-slate-200/80 hover:border-primary/40'
              }`}
            >
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-2.5 left-2.5 text-[11px] font-medium bg-black/50 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full">
                  {dest.category}
                </span>

                {/* Selected Checkmark */}
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 bg-primary text-white p-1 rounded-full shadow-md flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}

                {/* Rating Badge */}
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-xs font-semibold text-slate-800">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{dest.rating}</span>
                </div>

                {/* City & Country on Overlay */}
                <div className="absolute bottom-2.5 left-2.5 text-white">
                  <h3 className="font-bold text-lg leading-tight font-heading drop-shadow-sm">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-accent" />
                    {dest.country}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white">
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Airport: <strong className="text-slate-600 font-semibold">{dest.airportCode}</strong></span>
                  <span className={`font-semibold ${isSelected ? 'text-primary' : 'text-slate-500 group-hover:text-primary'}`}>
                    {isSelected ? 'Selected' : 'Click to Select →'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="py-12 text-center text-slate-400">
          <p className="text-sm">No destinations found matching "{searchTerm}". Try a different filter or search term.</p>
        </div>
      )}
    </div>
  );
}
