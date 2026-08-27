import React from 'react';
import { Shield, Globe2, Sparkles, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      
      {/* Hero section */}
      <section className="text-center space-y-4">
        <span className="text-primary font-bold text-xs uppercase tracking-widest bg-accent/20 px-3.5 py-1 rounded-full">Our Story</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
          Redefining Modern Travel Planning
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
          At TripSphere, we believe travel planning shouldn't be stressful. We build premium, clean interfaces that combine hotel bookings, tour itineraries, and budget tracking into one unified personal dashboard.
        </p>
      </section>

      {/* Grid of stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
        <div>
          <h3 className="text-3xl font-extrabold font-heading text-primary">45K+</h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Happy Travelers</span>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold font-heading text-primary">120+</h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Global Destinations</span>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold font-heading text-primary">500+</h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Luxury Hotels</span>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold font-heading text-primary">4.9</h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Average Star Rating</span>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-10">
        <h2 className="text-2xl font-bold font-heading text-slate-800 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield size={20} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-800">Complete Integrity</h3>
            <p className="text-slate-500 text-xs leading-relaxed">We display transparent pricing and offer verified hotel partnerships with zero hidden booking charges.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles size={20} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-800">Premium Aesthetics</h3>
            <p className="text-slate-500 text-xs leading-relaxed">Our dashboards and itinerary managers are clean, modern, and highly visual, utilizing gorgeous photography.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Globe2 size={20} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-800">Eco-conscious Travel</h3>
            <p className="text-slate-500 text-xs leading-relaxed">We promote local, cultural, and eco-friendly stays and guides to support indigenous communities.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
