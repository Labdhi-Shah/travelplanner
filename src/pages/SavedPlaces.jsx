import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, MapPin, Star, Trash2, HelpCircle } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function SavedPlaces() {
  const { savedPlaces, toggleSavedPlace } = useTravel();
  const [filterTag, setFilterTag] = useState('All');

  const filteredPlaces = savedPlaces.filter(place => {
    if (filterTag === 'All') return true;
    return place.category === filterTag;
  });

  const handleRemove = (place) => {
    toggleSavedPlace(place);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Chips */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-slate-400 text-xs font-semibold">Dashboard / Saved Places</p>
          <span className="text-xs text-slate-400 font-medium">Browse hotels and destinations you've saved for future reference.</span>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2">
          {['All', 'Destinations', 'Hotels'].map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                filterTag === tag
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Saved Cards */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place, idx) => (
            <motion.div
              key={place.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-250/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {/* Photo */}
              <div className="relative h-44 overflow-hidden shrink-0">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemove(place)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-500 hover:text-red-500 hover:bg-white shadow-sm transition-colors"
                >
                  <Trash2 size={13} />
                </button>
                <span className="absolute bottom-3 left-3 bg-primary text-white font-heading font-bold text-[9px] px-2.5 py-0.5 rounded-full">
                  {place.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center">
                      <MapPin size={10} className="mr-0.5" /> {place.location}
                    </span>
                    <div className="flex items-center text-amber-500 text-[10px] font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                      <Star size={10} className="fill-amber-500 mr-0.5" /> {place.rating}
                    </div>
                  </div>
                  
                  <h3 className="font-heading font-bold text-sm text-slate-800 line-clamp-1">{place.name}</h3>
                </div>

                <div className="border-t border-slate-100 pt-3 mt-4 text-center">
                  <button
                    onClick={() => handleRemove(place)}
                    className="text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider flex items-center justify-center space-x-1 w-full"
                  >
                    <Trash2 size={12} />
                    <span>Delete Saved Place</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty template */
        <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center min-h-[300px]">
          <Bookmark size={36} className="text-slate-300 mb-3" />
          <h4 className="font-heading font-bold text-slate-850">No Saved Places Yet</h4>
          <p className="text-slate-400 text-xs mt-1.5 max-w-xs leading-relaxed">
            Click the bookmark or favorite options on destinations or hotels views to fill your quick reference boards.
          </p>
        </div>
      )}

    </div>
  );
}
