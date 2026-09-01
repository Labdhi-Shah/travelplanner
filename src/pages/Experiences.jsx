import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Star, Compass } from 'lucide-react';
import { experienceCategories } from '../data/hotels';

export default function Experiences() {
  const navigate = useNavigate();

  // Add rich descriptions to each category for a premium feel
  const categoryDetails = {
    'Adventure': 'High-octane activities including water rafting, hiking glaciers, and zip-lining across forest canopies.',
    'Beaches': 'Pristine shores, crystal-clear turquoise waters, private overwater bungalows, and relaxing coral lagoons.',
    'Mountains': 'Majestic high-altitude peaks, snowy ski trails, pine-forest retreats, and challenging panoramic climbs.',
    'Cultural': 'Historic ancient shrines, sacred temples, local cooking academies, and traditional artistic neighborhood tours.',
    'Food & Dining': 'Gourmet street markets, Michelin-starred tasting menus, cooking classes, and vineyard wine tours.',
    'Luxury': 'Premium ocean yacht charters, VIP helicopter excursions, five-star resorts, and private limousine transit.',
    'Wildlife': 'Exotic wildlife reserves, scuba diving along marine coral reefs, and guided safari expeditions.',
    'Photography': 'Breathtaking viewpoints, dramatic volcanic landscapes, neon city skylines, and golden sunset horizons.'
  };

  const handleCategoryClick = (name) => {
    // Standardize query tags
    const query = name.includes('&') ? name.split(' ')[0] : name;
    navigate(`/destinations?category=${encodeURIComponent(query)}`);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <motion.div 
        className="text-center max-w-2xl mx-auto mb-16"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-primary font-bold text-sm tracking-wider uppercase font-sans">Tailored Niches</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 tracking-tight mt-2">
          Travel Experiences
        </h1>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed">
          Filter your next vacation based on your personal lifestyle and hobbies. Select a travel niche below to browse matching destinations.
        </p>
      </motion.div>

      {/* Grid of Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experienceCategories.map((exp, index) => (
          <motion.div
            key={exp.name}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 group cursor-pointer transition-all duration-300 flex flex-col justify-between"
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            onClick={() => handleCategoryClick(exp.name)}
          >
            {/* Image banner */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={exp.image}
                alt={exp.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm flex items-center space-x-1">
                <Compass size={10} />
                <span>{exp.count} Destinations</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 font-heading mb-2 flex items-center">
                  <Sparkles size={14} className="text-accent mr-1.5 shrink-0" /> {exp.name}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {categoryDetails[exp.name] || 'Curated boutique travel experiences built around stunning scenic locations.'}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-accent transition-colors font-heading">
                <span>Discover Packages</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5 duration-200" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
