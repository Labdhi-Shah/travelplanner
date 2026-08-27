import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, ArrowRight } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { destinations } from '../data/destinations';
import { hotels } from '../data/hotels';
import { packages } from '../data/packages';

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useTravel();

  // Filter out favorited destinations, hotels, and packages
  const favoritedDestinations = destinations.filter(d => favorites.includes(d.id));
  const favoritedHotels = hotels.filter(h => favorites.includes(h.id));
  const favoritedPackages = packages.filter(p => favorites.includes(p.id));

  const totalFavs = favoritedDestinations.length + favoritedHotels.length + favoritedPackages.length;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <p className="text-slate-400 text-xs font-semibold">Dashboard / Favorites List</p>
        <span className="text-xs text-slate-400 font-medium">Your customized shortlist of liked destinations, stays, and tour packages.</span>
      </div>

      {totalFavs > 0 ? (
        <div className="space-y-10">
          
          {/* 1. Favorited Destinations */}
          {favoritedDestinations.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-slate-800 text-base border-b border-slate-200 pb-2">Saved Destinations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritedDestinations.map(dest => (
                  <div key={dest.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div className="h-44 overflow-hidden relative">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleFavorite(dest.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-red-500 shadow-sm"
                      >
                        <Heart size={14} className="fill-red-500" />
                      </button>
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-wider block">{dest.country}</span>
                        <h4 className="font-heading font-bold text-sm text-slate-800 mt-0.5">{dest.name}</h4>
                      </div>
                      <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs font-semibold text-primary">
                        <Link to={`/destinations/${dest.id}`} className="hover:text-accent flex items-center space-x-0.5">
                          <span>Explore Details</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Favorited Tour Packages */}
          {favoritedPackages.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-slate-800 text-base border-b border-slate-200 pb-2">Tour Packages</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritedPackages.map(pkg => (
                  <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div className="h-44 overflow-hidden relative">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleFavorite(pkg.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-red-500 shadow-sm"
                      >
                        <Heart size={14} className="fill-red-500" />
                      </button>
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 block">{pkg.duration} • {pkg.travelers}</span>
                        <h4 className="font-heading font-bold text-sm text-slate-800 mt-0.5">{pkg.name}</h4>
                      </div>
                      <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs font-semibold text-primary">
                        <span className="text-slate-800 font-bold">${pkg.price}</span>
                        <Link to={`/packages/${pkg.id}`} className="hover:text-accent flex items-center space-x-0.5">
                          <span>View Package</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Favorited Hotels */}
          {favoritedHotels.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-slate-800 text-base border-b border-slate-200 pb-2">Stays & Resorts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritedHotels.map(hotel => (
                  <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div className="h-44 overflow-hidden relative">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleFavorite(hotel.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-red-500 shadow-sm"
                      >
                        <Heart size={14} className="fill-red-500" />
                      </button>
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 block flex items-center"><MapPin size={10} className="mr-0.5" /> {hotel.location}</span>
                        <h4 className="font-heading font-bold text-sm text-slate-800 mt-0.5">{hotel.name}</h4>
                      </div>
                      <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs font-semibold text-primary">
                        <span className="text-slate-850 font-bold">${hotel.price} <span className="text-[10px] text-slate-400 font-normal">/ night</span></span>
                        <Link to="/hotels" className="hover:text-accent flex items-center space-x-0.5">
                          <span>Details</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Empty favorites template */
        <div className="bg-white p-16 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center min-h-[300px]">
          <Heart size={36} className="text-slate-300 mb-3" />
          <h4 className="font-heading font-bold text-slate-850">Favorites List is Empty</h4>
          <p className="text-slate-400 text-xs mt-1.5 max-w-xs leading-relaxed">
            Click heart symbols on popular destination cards, tour packages, or resort listings to compile a customized quicklist.
          </p>
        </div>
      )}

    </div>
  );
}
