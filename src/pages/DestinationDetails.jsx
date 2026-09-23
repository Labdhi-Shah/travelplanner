import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Star, Calendar, DollarSign, Clock, CloudSun, 
  Map, Compass, Heart, ArrowLeft, Info, HelpCircle, CheckCircle 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { destinations } from '../data/destinations';
import { DESTINATIONS } from '../data/tripData';
import { hotels } from '../data/hotels';
import { packages } from '../data/packages';

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useTravel();
  const [activeTab, setActiveTab] = useState('attractions');

  // Find destination details from destinations or single source of truth DESTINATIONS
  const foundInDest = destinations.find(d => d.id === id);
  const foundInTripData = DESTINATIONS.find(d => d.id === id);
  const destination = foundInDest || (foundInTripData ? {
    ...foundInTripData,
    gallery: [foundInTripData.image],
    bestTime: "Year-round",
    averageBudget: "Medium",
    duration: "7 Days",
    weather: { temp: "22°C", condition: "Pleasant", humidity: "65%", wind: "10 km/h" },
    attractions: (foundInTripData.highlights || []).map(h => ({ name: h, image: foundInTripData.image })),
    tips: ["Book popular experiences in advance.", "Use public transit passes for seamless city travel.", "Sample local culinary specialties."]
  } : null);

  if (!destination) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold font-heading text-slate-800">Destination Not Found</h2>
        <p className="text-slate-500 text-sm mt-2">The destination you are looking for does not exist or has been removed.</p>
        <Link to="/destinations" className="mt-6 inline-block bg-primary text-white text-xs px-6 py-2.5 rounded-full font-semibold">
          Back to Destinations
        </Link>
      </div>
    );
  }

  // Filter hotels and packages matching this destination
  const matchedHotels = hotels.filter(h => h.destinationId === destination.id);
  const matchedPackages = packages.filter(p => p.destinationId === destination.id);

  // Define tabs
  const tabs = [
    { id: 'attractions', label: 'Top Attractions', icon: Compass },
    { id: 'hotels', label: 'Premium Hotels', icon: Clock },
    { id: 'tips', label: 'Travel Guide & Map', icon: Info },
  ];

  return (
    <div className="bg-stone-50 pb-20">
      
      {/* 1. Header Banner */}
      <section className="relative h-[450px] bg-primary-dark">
        <div className="absolute inset-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-black/35" />
        </div>

        <div className="absolute top-6 left-4 sm:left-6 lg:left-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1 bg-white/95 text-slate-700 text-xs px-4 py-2 rounded-full shadow-md font-semibold transition-all hover:bg-white"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
        </div>

        {/* Title overlays */}
        <div className="absolute bottom-10 left-0 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-primary uppercase bg-accent/90 px-3 py-1 rounded-full w-fit mb-2 shadow-sm">
                <MapPin size={12} />
                <span>{destination.country}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-slate-800 tracking-tight leading-none drop-shadow-sm">
                {destination.name}
              </h1>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => toggleFavorite(destination.id)}
                className="p-3.5 rounded-full bg-white/90 shadow-md text-slate-600 hover:text-red-500 transition-colors"
              >
                <Heart
                  size={20}
                  className={isFavorite(destination.id) ? "fill-red-500 text-red-500" : ""}
                />
              </button>

              <Link
                to={`/plan-my-trip?dest=${destination.id}`}
                className="bg-primary hover:bg-primary-light text-white font-heading font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Plan a Trip to {destination.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details and Weather */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center">
              <Star className="text-amber-500 mb-2" size={24} />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rating</span>
              <span className="text-base font-bold text-slate-800 mt-1">{destination.rating} / 5</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center">
              <Calendar className="text-primary mb-2" size={24} />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Best Visit Time</span>
              <span className="text-sm font-bold text-slate-800 mt-1 line-clamp-1">{destination.bestTime}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center">
              <DollarSign className="text-accent mb-2" size={24} />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Budget Level</span>
              <span className="text-base font-bold text-slate-800 mt-1">{destination.averageBudget}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center">
              <Clock className="text-secondary mb-2" size={24} />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Duration</span>
              <span className="text-base font-bold text-slate-800 mt-1">{destination.duration}</span>
            </div>
          </div>

          {/* Destination Description */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xl font-bold font-heading text-slate-800">About the Destination</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{destination.description}</p>
          </div>

          {/* Tabbed Content Navigation */}
          <div className="border-b border-slate-200">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-heading font-medium text-sm transition-all ${
                      isActive 
                        ? 'border-primary text-primary font-bold' 
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <TabIcon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content panel */}
          <div className="mt-6">
            
            {/* TAB 1: Attractions */}
            {activeTab === 'attractions' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {destination.attractions.map((att, idx) => (
                  <motion.div 
                    key={att.name} 
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="h-40 overflow-hidden relative bg-slate-100">
                      <img
                        src={att.image}
                        alt={`${att.name} in ${destination.name}`}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = destination.image;
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-heading font-bold text-sm text-slate-800">{att.name}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">Recommended Sight</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* TAB 2: Hotels */}
            {activeTab === 'hotels' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {matchedHotels.length > 0 ? (
                  matchedHotels.map((hotel, idx) => (
                    <motion.div 
                      key={hotel.id} 
                      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl p-4 flex space-x-4 transition-all duration-300"
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -4 }}
                    >
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        loading="lazy"
                        className="w-24 h-24 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex flex-col justify-between overflow-hidden">
                        <div>
                          <h4 className="font-heading font-bold text-sm text-slate-800 truncate">{hotel.name}</h4>
                          <span className="text-[10px] text-slate-400 flex items-center mt-1"><MapPin size={10} className="mr-0.5" /> {hotel.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                          <span className="text-xs font-bold text-primary font-heading">${hotel.price} <span className="text-[10px] text-slate-400 font-normal">/ night</span></span>
                          <div className="flex items-center text-amber-500 text-[10px] font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                            <Star size={10} className="fill-amber-500 mr-0.5" /> {hotel.rating}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-slate-400 text-xs py-4">No specific hotels listed for this destination yet.</p>
                )}
              </div>
            )}

            {/* TAB 3: Tips & Map */}
            {activeTab === 'tips' && (
              <div className="space-y-6">
                {/* Guidelines */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-heading font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" /> Essential Travel Advice
                  </h4>
                  <ul className="space-y-3 pl-2">
                    {destination.tips.map((tip, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-500 leading-relaxed flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Map Mock UI */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-heading font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center">
                    <Map size={16} className="text-primary mr-2" /> Route Connectivity Map
                  </h4>
                  <div className="relative aspect-video rounded-2xl bg-stone-100/50 border border-slate-200 overflow-hidden flex items-center justify-center">
                    {/* SVG Map Path Grid Mock */}
                    <svg className="w-full h-full absolute inset-0 z-0 opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="10" y1="10" x2="90" y2="90" stroke="#0a3d40" strokeWidth="0.5" strokeDasharray="2" />
                      <line x1="10" y1="90" x2="90" y2="10" stroke="#0a3d40" strokeWidth="0.5" strokeDasharray="2" />
                      <circle cx="50" cy="50" r="40" stroke="#0a3d40" strokeWidth="0.5" fill="none" strokeDasharray="1" />
                    </svg>

                    <div className="relative z-10 text-center p-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-2 shadow-sm animate-pulse">
                        <Compass size={22} />
                      </div>
                      <h5 className="font-heading font-bold text-xs text-slate-700">Interactive Map Preview</h5>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">
                        This flight connects from key transit hubs into {destination.name}. Book package details to see detailed pins.
                      </p>
                      
                      {/* Styled Pin Overlays */}
                      <div className="absolute top-[20%] left-[30%] flex items-center space-x-1.5">
                        <span className="w-3 h-3 bg-red-500 border-2 border-white rounded-full shadow-md animate-bounce" />
                        <span className="text-[8px] bg-slate-800 text-white px-1.5 py-0.5 rounded font-bold">{destination.name} Airport</span>
                      </div>
                      <div className="absolute top-[60%] left-[65%] flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 bg-primary border border-white rounded-full shadow-md" />
                        <span className="text-[8px] bg-slate-800 text-white px-1.5 py-0.5 rounded font-bold">Transit Hub</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Sidebar Info Panels */}
        <div className="space-y-8">
          
          {/* Weather Widget */}
          <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <h3 className="font-heading font-bold text-base mb-4 flex items-center">
              <CloudSun size={18} className="mr-2 text-accent" /> Destination Weather
            </h3>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-4xl font-extrabold font-heading">{destination.weather.temp}</span>
                <span className="text-xs text-slate-300 block font-semibold mt-1">{destination.weather.condition}</span>
              </div>
              <CloudSun size={52} className="text-accent-light" />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 text-xs">
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[9px]">Humidity</span>
                <span className="font-bold text-sm mt-0.5 block">{destination.weather.humidity}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[9px]">Wind Speed</span>
                <span className="font-bold text-sm mt-0.5 block">{destination.weather.wind}</span>
              </div>
            </div>
          </div>

          {/* Quick Package Card Recommendation */}
          {matchedPackages.length > 0 && (
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <span className="text-[9px] bg-accent/20 text-primary font-bold px-2 py-0.5 rounded uppercase tracking-wider">Recommended Package</span>
              <h4 className="font-heading font-bold text-base text-slate-800 mt-2">{matchedPackages[0].name}</h4>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed line-clamp-3">{matchedPackages[0].overview}</p>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <span className="text-sm font-bold text-primary">${matchedPackages[0].price} <span className="text-[10px] text-slate-400 font-normal">total</span></span>
                <Link
                  to={`/packages/${matchedPackages[0].id}`}
                  className="text-xs font-bold text-primary hover:text-accent flex items-center space-x-0.5"
                >
                  <span>Details</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          )}

          {/* FAQ Planner Widget */}
          <div className="bg-stone-100/60 p-6 rounded-3xl border border-slate-200/50">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-700 mb-4 flex items-center">
              <HelpCircle size={14} className="mr-1.5 text-primary animate-pulse" /> Need Assistance?
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">
              Our travel specialists are here to design custom private packages, group deals, or honeymoon suites.
            </p>
            <Link
              to="/contact"
              className="block w-full text-center py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
            >
              Contact Support Agent
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}
