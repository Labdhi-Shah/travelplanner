import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Heart, Shield, Save, CheckCircle2 } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function Profile() {
  const { user, updateProfile } = useTravel();

  // Tab Panel state
  const [activeTab, setActiveTab] = useState('personal');

  // Personal Info Form State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [country, setCountry] = useState(user.country);
  const [avatar, setAvatar] = useState(user.avatar);
  const [preferences, setPreferences] = useState(user.preferences || []);

  // Notification Form State
  const [emailAlerts, setEmailAlerts] = useState(user.notifications?.emailAlerts ?? true);
  const [marketing, setMarketing] = useState(user.notifications?.marketing ?? false);
  const [tripUpdates, setTripUpdates] = useState(user.notifications?.tripUpdates ?? true);

  const [success, setSuccess] = useState(false);

  const prefOptions = ["Adventure", "Relaxation", "Culture", "Food", "Shopping", "Nature", "Luxury", "Photography"];

  const togglePreference = (pref) => {
    setPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      country,
      avatar,
      preferences,
      notifications: {
        emailAlerts,
        marketing,
        tripUpdates
      }
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'preferences', label: 'Travel Styles', icon: Heart },
    { id: 'notifications', label: 'Alert Settings', icon: Bell }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <p className="text-slate-400 text-xs font-semibold">Dashboard / Profile Settings</p>
        <span className="text-xs text-slate-400 font-medium">Manage your personal information, travel tags, and alerts.</span>
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm px-4 py-3 rounded-2xl mb-4 shadow-sm flex items-center space-x-2">
          <CheckCircle2 size={16} />
          <span>Profile configuration saved successfully!</span>
        </div>
      )}

      {/* Grid: Tabs Left, Content Right */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="space-y-2">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-4">
            <img
              src={avatar}
              alt={name}
              className="w-20 h-20 rounded-full border-2 border-accent mx-auto object-cover shadow-sm"
            />
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-800">{user.name}</h3>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Premium Explorer</span>
            </div>
          </div>

          <div className="flex md:flex-col overflow-x-auto no-scrollbar gap-1.5 p-1 bg-white border border-slate-100 rounded-xl md:border-0 md:bg-transparent">
            {tabs.map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left rounded-xl py-2.5 px-4 text-xs font-bold flex items-center space-x-2.5 shrink-0 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/60 md:border-0'
                  }`}
                  style={{ minWidth: '150px' }}
                >
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Box */}
        <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* 1. PERSONAL DETAILS */}
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contact Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Country Residence</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avatar Photo Link URL</label>
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none"
                  />
                </div>
              </div>
            )}

            {/* 2. PREFERENCES STYLE */}
            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Travel Style Preferences</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Choose your personal hobbies and preferences to customize recommendations on destinations search cards.
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {prefOptions.map(pref => {
                    const isSelected = preferences.includes(pref);
                    return (
                      <button
                        type="button"
                        key={pref}
                        onClick={() => togglePreference(pref)}
                        className={`px-4 py-2 rounded-xl border text-xs font-semibold tracking-wide transition-all ${
                          isSelected
                            ? 'bg-primary border-primary text-white shadow-sm'
                            : 'bg-slate-50 border-slate-250/60 text-slate-600 hover:border-slate-350'
                        }`}
                      >
                        {pref}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. ALERTS SETTING */}
            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Notification & Safety Alerts</h3>
                
                <div className="space-y-3.5 pt-2">
                  <label className="flex items-center space-x-3 text-xs text-slate-600 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-primary accent-primary"
                    />
                    <div>
                      <span className="block text-slate-850">Email Alert Invoices</span>
                      <span className="text-[10px] text-slate-400 block font-normal mt-0.5">Send a booking billing confirmation receipt to my email.</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 text-xs text-slate-600 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tripUpdates}
                      onChange={(e) => setTripUpdates(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-primary accent-primary"
                    />
                    <div>
                      <span className="block text-slate-850">Itinerary Change Updates</span>
                      <span className="text-[10px] text-slate-400 block font-normal mt-0.5">Send instant push notifications if travel schedules shift.</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 text-xs text-slate-600 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-primary accent-primary"
                    />
                    <div>
                      <span className="block text-slate-850">Promotions & Travel Deals</span>
                      <span className="text-[10px] text-slate-400 block font-normal mt-0.5">Notify me of custom vacation discount deals.</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-6 py-3 rounded-2xl flex items-center justify-center space-x-1.5 shadow-md transition-colors"
              >
                <Save size={14} />
                <span>Save Changes</span>
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
