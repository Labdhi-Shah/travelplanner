import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Bell, Search, Settings } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function DashboardHeader({ setSidebarOpen }) {
  const { user } = useTravel();
  const location = useLocation();

  // Compute page title based on path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard Home';
    if (path === '/dashboard/my-trips') return 'My Trips';
    if (path === '/dashboard/create-trip') return 'Plan a New Journey';
    if (path === '/dashboard/saved-places') return 'Saved Places';
    if (path === '/dashboard/bookings') return 'My Bookings';
    if (path === '/dashboard/favorites') return 'Favorites List';
    if (path === '/dashboard/budget') return 'Budget Tracker';
    if (path === '/dashboard/profile') return 'Account Profile';
    if (path.startsWith('/dashboard/trip/')) return 'Trip Details';
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center shadow-sm">
      {/* Left side: Hamburger (mobile) + Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-slate-500 hover:text-slate-700 focus:outline-none p-1 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-800 tracking-tight leading-none">
            {getPageTitle()}
          </h1>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-medium mt-1">
            TripSphere Travel Hub
          </span>
        </div>
      </div>

      {/* Right side: Search + Notifications + Profile shortcut */}
      <div className="flex items-center space-x-4">
        {/* Search Input (Desktop Only) */}
        <div className="hidden md:flex items-center bg-slate-100 hover:bg-slate-200/70 border border-transparent hover:border-slate-300 rounded-full px-3.5 py-1.5 transition-all">
          <Search size={16} className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="bg-transparent border-none outline-none text-xs text-slate-600 w-44 placeholder-slate-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border border-white" />
        </button>

        {/* Vertical divider */}
        <div className="w-[1px] h-6 bg-slate-200" />

        {/* Profile Avatar Shortcut */}
        <Link to="/dashboard/profile" className="flex items-center space-x-2.5 hover:opacity-85 transition-opacity">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full border border-slate-300 shadow-sm object-cover"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-700 leading-tight">{user.name}</span>
            <span className="text-[10px] text-slate-400 font-medium">Traveler</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
