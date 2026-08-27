import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Check, Compass, Calendar, 
  Users, Heart, DollarSign, ListTodo, Sparkles 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { destinations } from '../data/destinations';

export default function CreateTrip() {
  const navigate = useNavigate();
  const { addTrip } = useTravel();
  const [searchParams] = useSearchParams();

  // Multi-step Wizard state
  const [step, setStep] = useState(1);
  
  // Form States
  const [destinationId, setDestinationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [preferences, setPreferences] = useState([]);
  const [budgetRange, setBudgetRange] = useState('Medium');
  const [budgetLimit, setBudgetLimit] = useState(3000);

  // Pre-fill destination if passed via query param
  useEffect(() => {
    const prefillDest = searchParams.get('destination');
    if (prefillDest) {
      setDestinationId(prefillDest);
    }
  }, [searchParams]);

  const togglePreference = (pref) => {
    setPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleNext = () => {
    if (step === 1 && !destinationId) {
      alert("Please select a destination to continue.");
      return;
    }
    if (step === 2 && (!startDate || !endDate)) {
      alert("Please choose both start and end dates.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleCreate = () => {
    const selectedDest = destinations.find(d => d.id === destinationId);
    
    const tripId = addTrip({
      name: `${selectedDest.name} Exploration`,
      destinationId,
      destinationName: selectedDest.name,
      country: selectedDest.country,
      image: selectedDest.image,
      startDate,
      endDate,
      travelers: { adults, children },
      preferences,
      budgetRange,
      budgetLimit: Number(budgetLimit)
    });

    navigate('/dashboard/my-trips');
  };

  // Preference tags options
  const prefOptions = ["Adventure", "Relaxation", "Culture", "Food", "Shopping", "Nature", "Luxury", "Photography"];

  const stepsList = [
    { num: 1, label: 'Destination' },
    { num: 2, label: 'Dates' },
    { num: 3, label: 'Travelers' },
    { num: 4, label: 'Preferences' },
    { num: 5, label: 'Budget' },
    { num: 6, label: 'Summary' }
  ];

  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Step Indicators */}
      <div className="mb-10 mt-2">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
          />

          {stepsList.map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full font-heading font-semibold text-xs flex items-center justify-center border-2 transition-all ${
                  step > s.num 
                    ? 'bg-primary border-primary text-white' 
                    : step === s.num
                      ? 'bg-accent border-accent text-primary-dark shadow-md'
                      : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {step > s.num ? <Check size={14} /> : s.num}
              </div>
              <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2 bg-slate-50 px-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main card box */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-lg min-h-[380px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Destination */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-heading text-slate-800 flex items-center gap-1.5"><Compass size={20} className="text-primary" /> Where are you going?</h3>
                <p className="text-slate-400 text-xs">Choose a destination from our catalog of premium getaways.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {destinations.map(d => (
                  <div
                    key={d.id}
                    onClick={() => setDestinationId(d.id)}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${
                      destinationId === d.id
                        ? 'border-accent shadow-md shadow-accent/5 scale-102'
                        : 'border-slate-100 opacity-80 hover:opacity-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="h-28 relative">
                      <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-2.5 left-3 text-white font-heading font-bold text-sm">{d.name}</span>
                    </div>
                    {destinationId === d.id && (
                      <div className="absolute top-2.5 right-2.5 bg-accent text-primary-dark w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Dates */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-heading text-slate-800 flex items-center gap-1.5"><Calendar size={20} className="text-primary" /> Select Travel Dates</h3>
                <p className="text-slate-400 text-xs">Set your start and end dates. Custom itineraries will be generated accordingly.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-4 py-3 text-xs text-slate-700 outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-4 py-3 text-xs text-slate-700 outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Travelers */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-heading text-slate-800 flex items-center gap-1.5"><Users size={20} className="text-primary" /> Who is Traveling?</h3>
                <p className="text-slate-400 text-xs">Specify the number of adults and children in your travel party.</p>
              </div>

              <div className="space-y-6 pt-4 max-w-sm">
                {/* Adults Counter */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Adults</h4>
                    <span className="text-[10px] text-slate-400">Ages 13 or older</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-full border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 flex items-center justify-center select-none"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{adults}</span>
                    <button 
                      onClick={() => setAdults(prev => prev + 1)}
                      className="w-8 h-8 rounded-full border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 flex items-center justify-center select-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children Counter */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Children</h4>
                    <span className="text-[10px] text-slate-400">Ages 2 to 12</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-full border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 flex items-center justify-center select-none"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{children}</span>
                    <button 
                      onClick={() => setChildren(prev => prev + 1)}
                      className="w-8 h-8 rounded-full border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 flex items-center justify-center select-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Preferences */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-heading text-slate-800 flex items-center gap-1.5"><Heart size={20} className="text-primary" /> Travel Preferences</h3>
                <p className="text-slate-400 text-xs">Select travel tags that reflect your style and interests.</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {prefOptions.map(pref => (
                  <button
                    key={pref}
                    onClick={() => togglePreference(pref)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-semibold tracking-wide transition-all ${
                      preferences.includes(pref)
                        ? 'bg-primary border-primary text-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Budget */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-heading text-slate-800 flex items-center gap-1.5"><DollarSign size={20} className="text-primary" /> Budget Level</h3>
                <p className="text-slate-400 text-xs">Indicate your desired spending level and maximum budget limit.</p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                {['Low', 'Medium', 'Luxury'].map(lvl => (
                  <div
                    key={lvl}
                    onClick={() => {
                      setBudgetRange(lvl);
                      setBudgetLimit(lvl === 'Low' ? 1500 : lvl === 'Medium' ? 3000 : 7000);
                    }}
                    className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                      budgetRange === lvl
                        ? 'border-accent bg-accent/5 text-primary shadow-sm'
                        : 'border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="text-xs font-bold font-heading block">{lvl}</span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1">
                      {lvl === 'Low' ? '$' : lvl === 'Medium' ? '$$' : '$$$'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-1.5 pt-4 max-w-xs">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Set Limit ($)</label>
                <input
                  type="number"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-slate-700 outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 6: Summary */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-heading text-slate-800 flex items-center gap-1.5"><Sparkles size={20} className="text-accent" /> Confirm Travel Plan</h3>
                <p className="text-slate-400 text-xs">Verify your selections before compiling your travel itinerary database.</p>
              </div>

              {/* Summary details */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Destination</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                      {destinations.find(d => d.id === destinationId)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Guests</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                      {adults} Adults {children > 0 && `, ${children} Children`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-200/50 pt-3">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Schedule</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">{startDate} to {endDate}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Budget Cap</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">${budgetLimit} ({budgetRange})</span>
                  </div>
                </div>

                {preferences.length > 0 && (
                  <div className="border-t border-slate-200/50 pt-3">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Preferences</span>
                    <div className="flex flex-wrap gap-1">
                      {preferences.map(pref => (
                        <span key={pref} className="bg-white border border-slate-200 text-slate-600 font-medium px-2.5 py-0.5 rounded-md text-[10px]">
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Wizard Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="flex items-center space-x-1 font-heading text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              onClick={handleNext}
              className="bg-primary hover:bg-primary-light text-white font-heading font-semibold text-xs px-6 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="bg-accent hover:bg-accent-light text-primary-dark font-heading font-semibold text-xs px-6 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-md shadow-accent/15 transition-transform hover:-translate-y-0.5"
            >
              <span>Compile Plan</span>
              <Sparkles size={14} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
