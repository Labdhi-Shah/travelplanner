import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const columnVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <footer className="bg-[#041a1b] text-slate-300 border-t border-primary-dark pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12 mb-12">
          {/* Logo & Description */}
          <motion.div 
            className="lg:col-span-2"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={columnVariants}
          >
            <div className="flex items-center space-x-2 text-white mb-4">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.08 }}
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary-dark font-extrabold text-xl shadow-lg"
              >
                T
              </motion.div>
              <span className="font-heading font-bold text-2xl tracking-wider text-white">
                TripSphere
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-sm leading-relaxed">
              Discover breathtaking destinations, plan custom day-by-day itineraries, track your budget, and organize every detail of your travels in one place.
            </p>
            <div className="flex space-x-4">
              {[
                { label: 'Instagram', svg: <><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>, rect: true },
                { label: 'Facebook', svg: <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/> },
                { label: 'Twitter / X', svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
                { label: 'LinkedIn', svg: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> }
              ].map((s, idx) => (
                <motion.a 
                  key={idx}
                  href="#" 
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-slate-300 hover:bg-accent hover:text-primary-dark transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill={s.rect ? 'none' : 'currentColor'} stroke={s.rect ? 'currentColor' : 'none'} strokeWidth={s.rect ? '2' : undefined} strokeLinecap="round" strokeLinejoin="round">
                    {s.rect && <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>}
                    {s.svg}
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 1: Explore */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={columnVariants}
          >
            <h4 className="font-heading font-semibold text-white text-sm tracking-wider uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {['Destinations', 'Tour Packages', 'Flights', 'Hotels', 'Experiences'].map((item) => {
                const path = item === 'Tour Packages' ? '/packages' : `/${item.toLowerCase()}`;
                return (
                  <li key={item}>
                    <Link to={path} className="text-slate-400 hover:text-accent hover:translate-x-1 inline-block transition-all duration-200">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Column 2: Plan */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={columnVariants}
          >
            <h4 className="font-heading font-semibold text-white text-sm tracking-wider uppercase mb-4">Plan Your Journey</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Plan A Trip', path: '/dashboard/create-trip' },
                { name: 'My Trips', path: '/dashboard/my-trips' },
                { name: 'My Bookings', path: '/dashboard/bookings' },
                { name: 'Budget Tracker', path: '/dashboard/budget' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-accent hover:translate-x-1 inline-block transition-all duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Company */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={columnVariants}
          >
            <h4 className="font-heading font-semibold text-white text-sm tracking-wider uppercase mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Careers', path: '#' },
                { name: 'Privacy Policy', path: '#' },
              ].map((link) => (
                <li key={link.name}>
                  {link.path.startsWith('/') ? (
                    <Link to={link.path} className="text-slate-400 hover:text-accent hover:translate-x-1 inline-block transition-all duration-200">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.path} className="text-slate-400 hover:text-accent hover:translate-x-1 inline-block transition-all duration-200">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 mt-12 border-t border-primary-dark/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500"
        >
          <p>© {currentYear} TripSphere Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookie Settings</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

