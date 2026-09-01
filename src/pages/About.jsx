import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe2, Sparkles, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 overflow-hidden">
      
      {/* Hero section */}
      <motion.section 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-primary font-bold text-xs uppercase tracking-widest bg-accent/20 px-3.5 py-1 rounded-full inline-block">
          Our Story
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
          Redefining Modern Travel Planning
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
          At TripSphere, we believe travel planning shouldn't be stressful. We build premium, clean interfaces that combine hotel bookings, tour itineraries, and budget tracking into one unified personal dashboard.
        </p>
      </motion.section>

      {/* Grid of stats */}
      <motion.section 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {[
          { stat: '45K+', label: 'Happy Travelers' },
          { stat: '120+', label: 'Global Destinations' },
          { stat: '500+', label: 'Luxury Hotels' },
          { stat: '4.9', label: 'Average Star Rating' },
        ].map((item, idx) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <h3 className="text-3xl font-extrabold font-heading text-primary">{item.stat}</h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">{item.label}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* Core Values */}
      <section className="space-y-10">
        <motion.h2 
          className="text-2xl font-bold font-heading text-slate-800 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Our Core Values
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Complete Integrity",
              desc: "We display transparent pricing and offer verified hotel partnerships with zero hidden booking charges."
            },
            {
              icon: Sparkles,
              title: "Premium Aesthetics",
              desc: "Our dashboards and itinerary managers are clean, modern, and highly visual, utilizing gorgeous photography."
            },
            {
              icon: Globe2,
              title: "Eco-conscious Travel",
              desc: "We promote local, cultural, and eco-friendly stays and guides to support indigenous communities."
            }
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div 
                key={val.title} 
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-slate-800">{val.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{val.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
