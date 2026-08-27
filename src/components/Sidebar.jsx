import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Compass, Map, PlusCircle, Bookmark, 
  CreditCard, Heart, DollarSign, User, LogOut, ChevronLeft, ChevronRight, X 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) {
  const { logoutUser, user } = useTravel();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Compass },
    { name: 'My Trips', path: '/dashboard/my-trips', icon: Map },
    { name: 'Create Trip', path: '/dashboard/create-trip', icon: PlusCircle },
    { name: 'Saved Places', path: '/dashboard/saved-places', icon: Bookmark },
    { name: 'Bookings', path: '/dashboard/bookings', icon: CreditCard },
    { name: 'Favorites', path: '/dashboard/favorites', icon: Heart },
    { name: 'Budget Tracker', path: '/dashboard/budget', icon: DollarSign },
    { name: 'My Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 z-45 bg-primary-dark text-slate-300 border-r border-primary/20 flex flex-col justify-between transition-all duration-300 ${
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {/* Header Logo */}
        <div>
          <div className={`p-4 border-b border-primary/20 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <Link to="/" className="flex items-center space-x-2 text-white">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary-dark font-extrabold text-xl shadow-lg shrink-0">
                T
              </div>
              {!isCollapsed && (
                <span className="font-heading font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-accent-light">
                  TripSphere
                </span>
              )}
            </Link>
            
            {/* Close button for Mobile Drawer */}
            <button 
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Profile Summary (Hidden when collapsed) */}
          {!isCollapsed && (
            <div className="p-4 mx-4 my-3 rounded-xl bg-primary-light/30 border border-primary-light/20 flex items-center space-x-3">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full border border-accent/60 object-cover"
              />
              <div className="overflow-hidden">
                <h4 className="text-white font-medium text-sm truncate">{user.name}</h4>
                <span className="text-xs text-slate-400">Premium Explorer</span>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <nav className="px-3 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) => 
                    `flex items-center rounded-xl py-3 px-4 text-sm font-medium transition-all group ${
                      isActive 
                        ? 'bg-accent text-primary-dark shadow-md shadow-accent/10' 
                        : 'text-slate-300 hover:bg-primary-light/40 hover:text-white'
                    } ${isCollapsed ? 'justify-center' : ''}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} className="shrink-0" />
                  {!isCollapsed && <span className="ml-3 font-heading tracking-wide">{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Collapsible toggle (Desktop only) and Logout */}
        <div className="p-4 border-t border-primary/20 space-y-2">
          {/* Toggle Collapsed Desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-primary-light/20 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <div className="flex items-center space-x-2 text-xs"><ChevronLeft size={18} /> <span>Collapse Sidebar</span></div>}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center rounded-xl py-3 px-4 text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="ml-3 font-heading">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
