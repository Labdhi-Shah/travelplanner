import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Compass, User, LogOut, ChevronDown, Heart, Map } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function Navbar() {
  const { isLoggedIn, user, logoutUser } = useTravel();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when path changes
  useEffect(() => {
    setIsOpen(false);
    setProfileDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'Flights', path: '/flights' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isHome 
          ? 'bg-primary-dark/95 shadow-xl backdrop-blur-md py-3 border-b border-white/5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 text-white group shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#CFA864] flex items-center justify-center text-[#072D30] font-heading font-extrabold text-xl shadow-md transition-transform group-hover:scale-105">
              T
            </div>
            <span className="font-heading font-bold text-2xl tracking-wide text-white">
              TripSphere
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-[15px] font-semibold tracking-normal transition-colors duration-200 py-1 ${
                    isActive ? 'text-[#E5B869]' : 'text-white/90 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-underline"
                      className="absolute bottom-[-6px] left-0 w-full h-[2.5px] bg-[#E5B869] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side User Profile / Auth */}
          <div className="hidden lg:flex items-center space-x-4 shrink-0">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2.5 text-white hover:text-[#E5B869] focus:outline-none transition-colors cursor-pointer group"
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                    alt={user?.name || "User"}
                    className="w-9 h-9 rounded-full border-2 border-[#CFA864] object-cover shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <span className="text-sm font-medium text-white group-hover:text-[#E5B869] transition-colors">
                    {user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Kevin Shah')}
                  </span>
                  <ChevronDown size={14} className={`text-white/80 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 w-52 rounded-2xl shadow-2xl bg-white ring-1 ring-black/5 divide-y divide-slate-100 overflow-hidden transform origin-top-right z-50 border border-slate-100"
                    >
                      <div className="px-4 py-3 bg-stone-50">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Signed in as</p>
                        <p className="text-xs font-bold text-slate-800 truncate">{user?.email || 'User'}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                        >
                          <Compass size={15} className="mr-2 text-slate-400" />
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/my-trips"
                          className="flex items-center px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                        >
                          <Map size={15} className="mr-2 text-slate-400" />
                          My Trips
                        </Link>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <LogOut size={15} className="mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-white hover:text-[#E5B869] font-medium text-sm transition-colors duration-200 px-3 py-1.5"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#CFA864] hover:bg-[#d8b475] text-[#072D30] font-heading font-semibold text-xs px-4 py-2 rounded-full shadow-md transition-all hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 hover:text-accent focus:outline-none p-2"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-primary-dark border-t border-primary/20 shadow-2xl py-4 transition-all duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-lg font-heading font-bold transition-colors ${
                    isActive ? 'bg-primary-light text-accent' : 'text-slate-200 hover:bg-primary-light/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 pb-2 border-t border-primary-light/40 px-5">
            {isLoggedIn ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border border-accent object-cover"
                  />
                  <div>
                    <h4 className="text-white font-medium text-sm">{user.name}</h4>
                    <p className="text-slate-400 text-xs truncate max-w-[180px]">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center bg-primary-light text-white text-xs py-2 rounded-lg font-medium hover:bg-primary"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center bg-red-950/40 text-red-400 text-xs py-2 rounded-lg font-medium hover:bg-red-900/30"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 border border-slate-400 text-white rounded-full hover:bg-white/5 font-semibold text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  state={{ redirectTo: '/dashboard/create-trip' }}
                  className="w-full text-center py-2.5 bg-accent hover:bg-accent-light text-primary-dark font-heading font-semibold text-sm rounded-full shadow-lg transition-all"
                >
                  Plan My Trip
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
