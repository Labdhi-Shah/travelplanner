import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSuccess(false), 6000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Header */}
      <motion.div 
        className="text-center max-w-2xl mx-auto mb-16"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-primary font-bold text-xs uppercase tracking-widest bg-accent/20 px-3.5 py-1 rounded-full inline-block">
          Contact Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 mt-2 tracking-tight">
          We'd Love to Hear From You
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-3">
          Have questions about a tour package, customized itineraries, or platform billing? Send our agency a message.
        </p>
      </motion.div>

      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm px-4 py-3 rounded-2xl mb-8 shadow-sm flex items-center space-x-2"
          >
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Your message was sent successfully! Our concierge support will reach out in 24 hours.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Info Sidebar */}
        <motion.div 
          className="bg-[#0b2426] text-white p-6 sm:p-8 rounded-3xl space-y-8 shadow-lg flex flex-col justify-between"
          initial={{ opacity: 0, x: -30, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-lg text-white">Contact Information</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Reach out directly to speak with a travel concierge agent.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-center space-x-3">
              <Mail size={16} className="text-accent shrink-0" />
              <span>concierge@tripsphere.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-accent shrink-0" />
              <span>+1 (800) 555-0199</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={16} className="text-accent shrink-0" />
              <span>725 Fifth Avenue, New York, NY</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 border-t border-white/10 pt-4 mt-6">
            concierge operational hours:<br />
            Mon - Fri, 9:00 AM - 6:00 PM EST
          </div>
        </motion.div>

        {/* Message Form */}
        <motion.div 
          className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors focus:bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. Booking inquiry, custom itinerary help"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors focus:bg-white"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message Description</label>
              <textarea
                required
                rows={5}
                placeholder="Write detail on how we can assist you..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none resize-none transition-colors focus:bg-white"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-primary hover:bg-primary-light text-white font-heading font-bold text-xs px-7 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-md shadow-primary/15 cursor-pointer"
            >
              <span>Send Message</span>
              <Send size={13} />
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
