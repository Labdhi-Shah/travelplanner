import React, { useState } from 'react';
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
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-primary font-bold text-xs uppercase tracking-widest bg-accent/20 px-3.5 py-1 rounded-full">Contact Support</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-800 mt-2">
          We'd Love to Hear From You
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-3">
          Have questions about a tour package, customized itineraries, or platform billing? Send our agency a message.
        </p>
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm px-4 py-3 rounded-2xl mb-8 shadow-sm flex items-center space-x-2">
          <CheckCircle2 size={16} />
          <span>Your message was sent successfully! Our concierge support will reach out in 24 hours.</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Info Sidebar */}
        <div className="bg-[#0b2426] text-white p-6 sm:p-8 rounded-3xl space-y-8 shadow-lg flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-lg text-white">Contact Information</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Reach out directly to speak with an travel concierge agent.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-center space-x-3">
              <Mail size={16} className="text-accent" />
              <span>concierge@tripsphere.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-accent" />
              <span>+1 (800) 555-0199</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={16} className="text-accent" />
              <span>725 Fifth Avenue, New York, NY</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 border-t border-white/10 pt-4 mt-6">
            concierge operational hours:<br />
            Mon - Fri, 9:00 AM - 6:00 PM EST
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
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
                  className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none"
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
                  className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. Booking inquiry, technical help"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none"
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
                className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-6 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-colors shadow-md"
            >
              <span>Send Message</span>
              <Send size={12} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
