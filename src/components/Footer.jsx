import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#041a1b] text-slate-300 border-t border-primary-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 text-white mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary-dark font-extrabold text-xl shadow-lg">
                T
              </div>
              <span className="font-heading font-bold text-2xl tracking-wider text-white">
                TripSphere
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              Discover breathtaking destinations, plan custom day-by-day itineraries, track your budget, and organize every detail of your travels in one place.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-slate-300 hover:bg-accent hover:text-primary-dark transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-slate-300 hover:bg-accent hover:text-primary-dark transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-slate-300 hover:bg-accent hover:text-primary-dark transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-slate-300 hover:bg-accent hover:text-primary-dark transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm tracking-wider uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/destinations" className="text-slate-400 hover:text-accent transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/packages" className="text-slate-400 hover:text-accent transition-colors">Tour Packages</Link>
              </li>
              <li>
                <Link to="/flights" className="text-slate-400 hover:text-accent transition-colors">Flights</Link>
              </li>
              <li>
                <Link to="/hotels" className="text-slate-400 hover:text-accent transition-colors">Hotels</Link>
              </li>
              <li>
                <Link to="/experiences" className="text-slate-400 hover:text-accent transition-colors">Experiences</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Plan */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm tracking-wider uppercase mb-4">Plan Your Journey</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/dashboard/create-trip" className="text-slate-400 hover:text-accent transition-colors">Plan A Trip</Link>
              </li>
              <li>
                <Link to="/dashboard/my-trips" className="text-slate-400 hover:text-accent transition-colors">My Trips</Link>
              </li>
              <li>
                <Link to="/dashboard/bookings" className="text-slate-400 hover:text-accent transition-colors">My Bookings</Link>
              </li>
              <li>
                <Link to="/dashboard/budget" className="text-slate-400 hover:text-accent transition-colors">Budget Tracker</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm tracking-wider uppercase mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-accent transition-colors">Contact</Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-accent transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-accent transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-12 border-t border-primary-dark/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {currentYear} TripSphere Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
