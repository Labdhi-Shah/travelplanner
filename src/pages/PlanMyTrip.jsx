import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Compass, AlertCircle, CheckCircle2, Bookmark, 
  RotateCcw, ArrowDown, MapPin, Calendar, Users, Plane, Hotel,
  Clock, IndianRupee, Bed, ChevronRight, ArrowUpRight, Check,
  ShieldCheck, Eye, Layers
} from 'lucide-react';

// Subcomponents
import DestinationSelector from '../components/PlanMyTrip/DestinationSelector';
import DateSelector from '../components/PlanMyTrip/DateSelector';
import TravelerSelector from '../components/PlanMyTrip/TravelerSelector';
import BudgetSelector from '../components/PlanMyTrip/BudgetSelector';
import PreferenceSelector from '../components/PlanMyTrip/PreferenceSelector';
import TransportSelector from '../components/PlanMyTrip/TransportSelector';
import FlightSelector from '../components/PlanMyTrip/FlightSelector';
import HotelSelector from '../components/PlanMyTrip/HotelSelector';
import ActivitySelector from '../components/PlanMyTrip/ActivitySelector';
import TripPreview from '../components/PlanMyTrip/TripPreview';
import CostSummary from '../components/PlanMyTrip/CostSummary';
import Itinerary from '../components/PlanMyTrip/Itinerary';
import PaymentSection from '../components/PlanMyTrip/PaymentSection';
import ExtendTripModal from '../components/PlanMyTrip/ExtendTripModal';

// Data & Helpers
import { 
  DESTINATIONS, 
  MOCK_FLIGHTS, 
  MOCK_HOTELS, 
  MOCK_ACTIVITIES, 
  TRANSPORTS, 
  CABIN_CLASSES 
} from '../data/tripData';
import { formatINR } from '../utils/pricing';

const STORAGE_KEY = 'ts_saved_planned_trip';

export default function PlanMyTrip() {
  // Default dates: 14 days in future for a 7-day trip
  const getInitialDates = () => {
    const today = new Date();
    const start = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    const end = new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
  };

  const initialDates = getInitialDates();

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const initialDestQuery = searchParams.get('dest') || searchParams.get('destination') || location.state?.destinationId;

  // Find initial matching destination if specified in URL / state
  const initialDestination = useMemo(() => {
    if (initialDestQuery) {
      const match = DESTINATIONS.find(
        (d) => d.id.toLowerCase() === initialDestQuery.toLowerCase() || d.name.toLowerCase() === initialDestQuery.toLowerCase()
      );
      if (match) return match;
    }
    return DESTINATIONS[0];
  }, [initialDestQuery]);

  // 1. Destination
  const [selectedDestination, setSelectedDestination] = useState(initialDestination);

  const initialDestKey = initialDestination?.id || 'bali';

  // 2. Dates
  const [startDate, setStartDate] = useState(initialDates.startDate);
  const [endDate, setEndDate] = useState(initialDates.endDate);

  // 3. Travelers
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [tripType, setTripType] = useState('Couple');

  // 4. Budget
  const [budget, setBudget] = useState(150000);

  // 5. Preferences
  const [preferences, setPreferences] = useState(['Romantic', 'Relaxing', 'Food']);

  // 6. Transport Mode
  const [transport, setTransport] = useState('Flight');

  // 7. Flight
  const [originCity, setOriginCity] = useState('Ahmedabad');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [selectedFlight, setSelectedFlight] = useState(
    MOCK_FLIGHTS[initialDestKey]?.[0] || MOCK_FLIGHTS.bali?.[0] || null
  );

  // 8. Hotel
  const [selectedHotel, setSelectedHotel] = useState(
    MOCK_HOTELS[initialDestKey]?.[0] || MOCK_HOTELS.bali?.[0] || null
  );

  // 9. Activities
  const [selectedActivities, setSelectedActivities] = useState([
    MOCK_ACTIVITIES[initialDestKey]?.[0],
    MOCK_ACTIVITIES[initialDestKey]?.[1]
  ].filter(Boolean));

  // UI States
  const [isGenerated, setIsGenerated] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [hasSavedTrip, setHasSavedTrip] = useState(false);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);

  const itineraryRef = useRef(null);
  const paymentRef = useRef(null);

  // Check if a saved trip exists in localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHasSavedTrip(true);
      }
    } catch {
      // localStorage may be disabled or restricted
    }
  }, []);

  // Update default flight & hotel when destination changes
  const handleSelectDestination = (dest) => {
    setSelectedDestination(dest);
    
    // Set default flight for this destination
    const destFlights = MOCK_FLIGHTS[dest.id] || MOCK_FLIGHTS.bali;
    if (destFlights && destFlights.length > 0) {
      setSelectedFlight(destFlights[0]);
    } else {
      setSelectedFlight(null);
    }

    // Set default hotel for this destination
    const destHotels = MOCK_HOTELS[dest.id] || MOCK_HOTELS.bali;
    if (destHotels && destHotels.length > 0) {
      setSelectedHotel(destHotels[0]);
    } else {
      setSelectedHotel(null);
    }

    // Reset activities to recommended ones for the new destination
    const destActivities = MOCK_ACTIVITIES[dest.id] || [];
    setSelectedActivities(destActivities.slice(0, 2));

    // Clear validation error if any
    setValidationErrors((prev) => prev.filter((e) => !e.includes('destination')));
  };

  // Preselect destination if URL query changes
  useEffect(() => {
    if (initialDestQuery) {
      const match = DESTINATIONS.find(
        (d) => d.id.toLowerCase() === initialDestQuery.toLowerCase() || d.name.toLowerCase() === initialDestQuery.toLowerCase()
      );
      if (match && match.id !== selectedDestination?.id) {
        handleSelectDestination(match);
      }
    }
  }, [initialDestQuery]);

  // ----------------------------------------------------
  // Date Calculations (JavaScript Date Math)
  // ----------------------------------------------------
  const { durationDays, hotelNights, dateError } = useMemo(() => {
    if (!startDate || !endDate) {
      return { durationDays: 1, hotelNights: 1, dateError: 'Please select both start and end dates.' };
    }

    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T00:00:00');

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { durationDays: 1, hotelNights: 1, dateError: 'Invalid dates selected.' };
    }

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return { 
        durationDays: 1, 
        hotelNights: 0, 
        dateError: 'End date must be after start date.' 
      };
    }

    // Duration = difference between dates + 1
    const duration = diffDays + 1;
    // Hotel Nights = difference between end date and start date
    const nights = diffDays;

    return { durationDays: duration, hotelNights: nights, dateError: null };
  }, [startDate, endDate]);

  // Toggle Preferences
  const handleTogglePreference = (prefId) => {
    if (preferences.includes(prefId)) {
      setPreferences(preferences.filter((p) => p !== prefId));
    } else {
      setPreferences([...preferences, prefId]);
    }
  };

  // Toggle Activities
  const handleToggleActivity = (activity) => {
    if (selectedActivities.some((a) => a.id === activity.id)) {
      setSelectedActivities(selectedActivities.filter((a) => a.id !== activity.id));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // ----------------------------------------------------
  // Centralized Cost Calculation
  // ----------------------------------------------------
  const { flightTotal, hotelTotal, activitiesTotal, transportCost, finalTripCost } = useMemo(() => {
    const totalTravelers = adults + children;

    // 1. Flight Total
    let calculatedFlightTotal = 0;
    if (transport === 'Flight' && selectedFlight) {
      const cabin = CABIN_CLASSES.find((c) => c.id === cabinClass) || CABIN_CLASSES[0];
      const multiplier = cabin.multiplier;
      const adultPrice = Math.round(selectedFlight.priceAdult * multiplier);
      const childPrice = Math.round((selectedFlight.priceChild || selectedFlight.priceAdult * 0.75) * multiplier);
      calculatedFlightTotal = (adults * adultPrice) + (children * childPrice);
    }

    // 2. Hotel Total = Price per Night × Hotel Nights × Rooms
    let calculatedHotelTotal = 0;
    if (selectedHotel && hotelNights > 0 && rooms > 0) {
      calculatedHotelTotal = selectedHotel.pricePerNight * hotelNights * rooms;
    }

    // 3. Activities Total = sum(pricePerPerson × totalTravelers)
    const calculatedActivitiesTotal = selectedActivities.reduce((sum, act) => {
      return sum + (act.pricePerPerson * totalTravelers);
    }, 0);

    // 4. Transport Cost (if non-flight transport, or local transit)
    let calculatedTransportCost = 0;
    const selectedTransportObj = TRANSPORTS.find((t) => t.id === transport);
    if (selectedTransportObj) {
      if (transport === 'Car') {
        calculatedTransportCost = selectedTransportObj.baseCost; // e.g. ₹8,000
      } else if (transport === 'Train' || transport === 'Bus') {
        calculatedTransportCost = selectedTransportObj.baseCost * totalTravelers;
      }
    }

    // 5. Final Trip Cost = Flight + Hotel + Activities + Transport
    const calculatedFinalCost = calculatedFlightTotal + calculatedHotelTotal + calculatedActivitiesTotal + calculatedTransportCost;

    return {
      flightTotal: calculatedFlightTotal,
      hotelTotal: calculatedHotelTotal,
      activitiesTotal: calculatedActivitiesTotal,
      transportCost: calculatedTransportCost,
      finalTripCost: calculatedFinalCost
    };
  }, [
    transport, 
    selectedFlight, 
    cabinClass, 
    adults, 
    children, 
    selectedHotel, 
    hotelNights, 
    rooms, 
    selectedActivities
  ]);

  // Show inline message toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // ----------------------------------------------------
  // Generate Trip Handler & Validation
  // ----------------------------------------------------
  const handleGenerateTrip = () => {
    const errors = [];

    if (!selectedDestination) {
      errors.push('Please select a destination.');
    }

    if (!startDate || !endDate || dateError) {
      errors.push('Please select your travel dates (end date must be after start date).');
    }

    if (!selectedHotel) {
      errors.push('Please select a hotel.');
    }

    if (transport === 'Flight' && !selectedFlight) {
      errors.push('Please select a flight.');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    // Validation passes
    setValidationErrors([]);
    setIsGenerated(true);
    showToast('Your custom itinerary has been generated successfully!');

    // Smooth scroll down to itinerary
    setTimeout(() => {
      if (itineraryRef.current) {
        itineraryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  // View Itinerary Button Click
  const handleViewItinerary = () => {
    if (!isGenerated) {
      handleGenerateTrip();
    } else {
      if (itineraryRef.current) {
        itineraryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Proceed to Payment Shortcut
  const handleProceedToPayment = () => {
    if (paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle extending the trip duration dynamically
  const handleConfirmExtend = (newEndStr, addedDays) => {
    setEndDate(newEndStr);
    setIsGenerated(true);

    // Update saved trip in localStorage if one exists
    try {
      const savedRaw = localStorage.getItem(STORAGE_KEY);
      if (savedRaw) {
        const savedTrip = JSON.parse(savedRaw);
        savedTrip.endDate = newEndStr;
        const start = new Date(startDate + 'T00:00:00');
        const end = new Date(newEndStr + 'T00:00:00');
        const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        savedTrip.duration = diffDays + 1;
        savedTrip.hotelNights = diffDays;
        savedTrip.isExtended = true;
        savedTrip.extendedDaysAdded = (savedTrip.extendedDaysAdded || 0) + addedDays;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTrip));
      }
    } catch (err) {
      console.error('Error updating saved trip:', err);
    }

    showToast(`Trip successfully extended to ${newEndStr}! Added ${addedDays} day(s).`);

    // Smooth scroll down to itinerary to view the new days
    setTimeout(() => {
      if (itineraryRef.current) {
        itineraryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  // ----------------------------------------------------
  // Save Trip to localStorage
  // ----------------------------------------------------
  const handleSaveTrip = () => {
    const tripToSave = {
      destination: selectedDestination,
      country: selectedDestination?.country,
      startDate,
      endDate,
      duration: durationDays,
      hotelNights,
      travelers: { adults, children, rooms },
      tripType,
      budget,
      preferences,
      transport,
      flight: selectedFlight,
      cabinClass,
      originCity,
      hotel: selectedHotel,
      activities: selectedActivities,
      costBreakdown: {
        flightTotal,
        hotelTotal,
        activitiesTotal,
        transportCost
      },
      totalCost: finalTripCost,
      savedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tripToSave));
      setHasSavedTrip(true);
      showToast('Trip successfully saved to your browser! You can restore it anytime.');
    } catch {
      showToast('Unable to access browser storage.');
    }
  };

  // ----------------------------------------------------
  // Restore Trip from localStorage
  // ----------------------------------------------------
  const handleRestoreTrip = () => {
    try {
      const savedRaw = localStorage.getItem(STORAGE_KEY);
      if (!savedRaw) {
        showToast('No saved trip found.');
        return;
      }
      const data = JSON.parse(savedRaw);

      if (data.destination) setSelectedDestination(data.destination);
      if (data.startDate) setStartDate(data.startDate);
      if (data.endDate) setEndDate(data.endDate);
      if (data.travelers) {
        setAdults(data.travelers.adults || 1);
        setChildren(data.travelers.children || 0);
        setRooms(data.travelers.rooms || 1);
      }
      if (data.tripType) setTripType(data.tripType);
      if (data.budget) setBudget(data.budget);
      if (data.preferences) setPreferences(data.preferences);
      if (data.transport) setTransport(data.transport);
      if (data.flight) setSelectedFlight(data.flight);
      if (data.cabinClass) setCabinClass(data.cabinClass);
      if (data.originCity) setOriginCity(data.originCity);
      if (data.hotel) setSelectedHotel(data.hotel);
      if (data.activities) setSelectedActivities(data.activities);

      setIsGenerated(true);
      showToast('Saved trip restored successfully!');
    } catch {
      showToast('Failed to parse saved trip data.');
    }
  };

  // Reset Form to pristine defaults
  const handleReset = () => {
    const dates = getInitialDates();
    setSelectedDestination(DESTINATIONS[0]);
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
    setAdults(2);
    setChildren(0);
    setRooms(1);
    setTripType('Couple');
    setBudget(150000);
    setPreferences(['Romantic', 'Relaxing', 'Food']);
    setTransport('Flight');
    setOriginCity('Ahmedabad');
    setCabinClass('Economy');
    setSelectedFlight(MOCK_FLIGHTS.bali?.[0] || null);
    setSelectedHotel(MOCK_HOTELS.bali?.[0] || null);
    setSelectedActivities([MOCK_ACTIVITIES.bali?.[0], MOCK_ACTIVITIES.bali?.[1]].filter(Boolean));
    setIsGenerated(false);
    setValidationErrors([]);
    showToast('Planner reset to defaults.');
  };

  // Helper for quick smooth scroll to specific step
  const scrollToStep = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#072D30]/95 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-semibold border border-[#CFA864]/30"
          >
            <div className="w-5 h-5 rounded-full bg-[#CFA864] text-[#072D30] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* 1. CINEMATIC HERO HEADER CARD                                             */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-[#072d30] text-white p-7 sm:p-10 shadow-xl border border-white/10">
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0a3d40] rounded-full blur-3xl opacity-70 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#cfa864]/20 rounded-full blur-3xl opacity-60 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left Content */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[#E5C38C] text-xs font-bold uppercase tracking-widest mb-3.5">
                <Sparkles size={13} className="text-[#CFA864]" />
                <span>Interactive Journey Architect</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Plan Your <span className="text-[#E5B869]">Dream Vacation</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-3 text-slate-200/90 text-sm sm:text-base leading-relaxed font-normal">
                Customize every leg of your journey — choose curated destinations, schedule dates, select custom flights, luxury stays, and daily sightseeing with live cost validation.
              </p>
            </div>

            {/* Right Quick Controls */}
            <div className="flex flex-row md:flex-col items-start md:items-end justify-start gap-3 shrink-0">
              {hasSavedTrip && (
                <button
                  type="button"
                  onClick={handleRestoreTrip}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-[#CFA864]/40 text-[#E5C38C] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-102 cursor-pointer backdrop-blur-sm"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#CFA864]" />
                  <span>Restore Saved Trip</span>
                </button>
              )}
              
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Planner</span>
              </button>
            </div>

          </div>

          {/* Bottom Live Snapshot Strip */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Snapshot 1: Destination */}
            <div className="bg-white/5 backdrop-blur-sm px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#CFA864]/20 flex items-center justify-center text-[#E5C38C] shrink-0">
                <MapPin size={14} />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block leading-none mb-1">Destination</span>
                <span className="font-bold text-white truncate block">{selectedDestination?.name || 'Select'}</span>
              </div>
            </div>

            {/* Snapshot 2: Duration */}
            <div className="bg-white/5 backdrop-blur-sm px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#CFA864]/20 flex items-center justify-center text-[#E5C38C] shrink-0">
                <Calendar size={14} />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block leading-none mb-1">Duration</span>
                <span className="font-bold text-white truncate block">{durationDays} Days • {hotelNights} Nights</span>
              </div>
            </div>

            {/* Snapshot 3: Party */}
            <div className="bg-white/5 backdrop-blur-sm px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#CFA864]/20 flex items-center justify-center text-[#E5C38C] shrink-0">
                <Users size={14} />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block leading-none mb-1">Travelers</span>
                <span className="font-bold text-white truncate block">{adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Ch.` : ''}</span>
              </div>
            </div>

            {/* Snapshot 4: Calculated Cost */}
            <div className="bg-white/5 backdrop-blur-sm px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#CFA864]/20 flex items-center justify-center text-[#E5C38C] shrink-0">
                <IndianRupee size={14} />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block leading-none mb-1">Live Estimate</span>
                <span className="font-bold text-[#E5C38C] truncate block">{formatINR(finalTripCost)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. PLANNING MILESTONE NAVIGATOR (QUICK JUMP BAR)                           */}
        {/* ========================================================================= */}
        <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:flex">
            <Layers size={13} className="text-primary" />
            <span>Milestones:</span>
          </div>

          <div className="flex items-center gap-2 min-w-max">
            {[
              { id: 'step-destination', num: '1', title: 'Destination' },
              { id: 'step-dates', num: '2', title: 'Dates' },
              { id: 'step-travelers', num: '3', title: 'Travelers' },
              { id: 'step-budget', num: '4', title: 'Budget' },
              { id: 'step-preferences', num: '5', title: 'Mood' },
              { id: 'step-transport', num: '6', title: 'Transport' },
              { id: 'step-hotel', num: '7', title: 'Hotel' },
              { id: 'step-activities', num: '8', title: 'Activities' },
              { id: 'section-itinerary', num: '9', title: 'Itinerary' }
            ].map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => scrollToStep(step.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100/80 hover:bg-primary/10 hover:text-primary text-slate-600 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span className="w-4 h-4 rounded-full bg-white text-slate-700 text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {step.num}
                </span>
                <span>{step.title}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleGenerateTrip}
            className="hidden md:inline-flex items-center gap-1 text-xs font-bold bg-[#0A3D40] text-white px-3.5 py-1.5 rounded-xl hover:bg-[#165B5F] transition shadow-xs shrink-0 cursor-pointer ml-2"
          >
            <Sparkles size={12} className="text-[#CFA864]" />
            <span>Generate</span>
          </button>
        </div>

        {/* Validation Errors Notice */}
        {validationErrors.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-rose-50 border border-rose-200/90 rounded-2xl shadow-sm space-y-2"
          >
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Please review and complete the following requirements:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-rose-700 font-medium pl-1">
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 3. RESPONSIVE TWO-COLUMN PLANNING WORKSPACE                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --------------------------------------------------------------------- */}
          {/* LEFT COLUMN: GUIDED PLANNING SECTIONS                                 */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            
            {/* PHASE 1: CORE FOUNDATIONS (Destination & Dates) */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="text-xs font-extrabold text-[#0A3D40] bg-[#0A3D40]/10 px-2.5 py-0.5 rounded-md font-heading uppercase tracking-wider">
                  Phase 01
                </span>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider font-heading">
                  Destination & Travel Window
                </h3>
              </div>

              {/* Step 1: Destination Selection */}
              <div id="step-destination" className="scroll-mt-24">
                <DestinationSelector
                  selectedDestination={selectedDestination}
                  onSelectDestination={handleSelectDestination}
                />
              </div>

              {/* Step 2: Dates */}
              <div id="step-dates" className="scroll-mt-24">
                <DateSelector
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={(val) => {
                    setStartDate(val);
                    setValidationErrors((prev) => prev.filter((e) => !e.includes('dates')));
                  }}
                  onEndDateChange={(val) => {
                    setEndDate(val);
                    setValidationErrors((prev) => prev.filter((e) => !e.includes('dates')));
                  }}
                  durationDays={durationDays}
                  hotelNights={hotelNights}
                  dateError={dateError}
                />
              </div>
            </div>

            {/* PHASE 2: PARTY & INVESTMENT TARGET (Travelers & Budget) */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="text-xs font-extrabold text-[#0A3D40] bg-[#0A3D40]/10 px-2.5 py-0.5 rounded-md font-heading uppercase tracking-wider">
                  Phase 02
                </span>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider font-heading">
                  Party Configuration & Target Budget
                </h3>
              </div>

              {/* Step 3: Travelers & Trip Type */}
              <div id="step-travelers" className="scroll-mt-24">
                <TravelerSelector
                  adults={adults}
                  children={children}
                  rooms={rooms}
                  tripType={tripType}
                  onAdultsChange={setAdults}
                  onChildrenChange={setChildren}
                  onRoomsChange={setRooms}
                  onTripTypeChange={setTripType}
                />
              </div>

              {/* Step 4: Budget */}
              <div id="step-budget" className="scroll-mt-24">
                <BudgetSelector
                  budget={budget}
                  onBudgetChange={setBudget}
                />
              </div>
            </div>

            {/* PHASE 3: TRAVEL VIBE & TRANSIT (Preferences & Transport) */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="text-xs font-extrabold text-[#0A3D40] bg-[#0A3D40]/10 px-2.5 py-0.5 rounded-md font-heading uppercase tracking-wider">
                  Phase 03
                </span>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider font-heading">
                  Vacation Mood & Transit Mode
                </h3>
              </div>

              {/* Step 5: Preferences */}
              <div id="step-preferences" className="scroll-mt-24">
                <PreferenceSelector
                  preferences={preferences}
                  onTogglePreference={handleTogglePreference}
                />
              </div>

              {/* Step 6: Transport Preference */}
              <div id="step-transport" className="scroll-mt-24">
                <TransportSelector
                  transport={transport}
                  onTransportChange={(t) => {
                    setTransport(t);
                    setValidationErrors((prev) => prev.filter((e) => !e.includes('flight')));
                  }}
                />
              </div>

              {/* Step 7: Flight Selection (Conditional on Flight) */}
              {transport === 'Flight' && (
                <div id="step-flight" className="scroll-mt-24">
                  <FlightSelector
                    selectedDestination={selectedDestination}
                    originCity={originCity}
                    onOriginCityChange={setOriginCity}
                    departureDate={startDate}
                    returnDate={endDate}
                    adults={adults}
                    children={children}
                    cabinClass={cabinClass}
                    onCabinClassChange={setCabinClass}
                    selectedFlight={selectedFlight}
                    onSelectFlight={(fl) => {
                      setSelectedFlight(fl);
                      setValidationErrors((prev) => prev.filter((e) => !e.includes('flight')));
                    }}
                  />
                </div>
              )}
            </div>

            {/* PHASE 4: STAYS & EXPERIENCES (Hotel & Activities) */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="text-xs font-extrabold text-[#0A3D40] bg-[#0A3D40]/10 px-2.5 py-0.5 rounded-md font-heading uppercase tracking-wider">
                  Phase 04
                </span>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider font-heading">
                  Accommodations & Sightseeing
                </h3>
              </div>

              {/* Step 8: Hotel Selection */}
              <div id="step-hotel" className="scroll-mt-24">
                <HotelSelector
                  selectedDestination={selectedDestination}
                  checkInDate={startDate}
                  checkOutDate={endDate}
                  hotelNights={hotelNights}
                  rooms={rooms}
                  adults={adults}
                  children={children}
                  selectedHotel={selectedHotel}
                  onSelectHotel={(h) => {
                    setSelectedHotel(h);
                    setValidationErrors((prev) => prev.filter((e) => !e.includes('hotel')));
                  }}
                />
              </div>

              {/* Step 9: Activities */}
              <div id="step-activities" className="scroll-mt-24">
                <ActivitySelector
                  selectedDestination={selectedDestination}
                  selectedActivities={selectedActivities}
                  onToggleActivity={handleToggleActivity}
                  adults={adults}
                  children={children}
                />
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* GENERATE MY TRIP PROMINENT CALL TO ACTION BANNER     */}
            {/* ---------------------------------------------------- */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#072D30] via-[#0A3D40] to-[#165B5F] text-white p-7 sm:p-8 shadow-xl border border-white/10">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#CFA864]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#E5C38C] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles size={11} className="text-[#CFA864]" />
                    <span>Ready for Your Schedule?</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    Generate Your Custom Itinerary
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-lg">
                    Validates dates and selections, audits your total cost, and crafts a day-by-day timetable tailored to your preferences.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateTrip}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#CFA864] hover:bg-[#E5C38C] text-[#072D30] font-heading font-extrabold text-sm sm:text-base shadow-lg shadow-[#072D30]/40 transition-all hover:scale-103 active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-[#072D30]" />
                  <span>Generate My Trip</span>
                </button>
              </div>
            </div>

            {/* Day-by-Day Itinerary Section (Rendered when generated or when viewing) */}
            <div id="section-itinerary" ref={itineraryRef} className="scroll-mt-24">
              {isGenerated && (
                <Itinerary
                  destination={selectedDestination}
                  startDate={startDate}
                  durationDays={durationDays}
                  hotel={selectedHotel}
                  flight={selectedFlight}
                  originCity={originCity}
                  activities={selectedActivities}
                  preferences={preferences}
                  transport={transport}
                  onOpenExtendModal={() => setIsExtendModalOpen(true)}
                />
              )}
            </div>

            {/* Step 10: Payment & Final Checkout Section */}
            <div id="section-payment" ref={paymentRef} className="pt-2 scroll-mt-24">
              <PaymentSection
                destination={selectedDestination}
                startDate={startDate}
                endDate={endDate}
                durationDays={durationDays}
                adults={adults}
                children={children}
                tripType={tripType}
                flight={selectedFlight}
                hotel={selectedHotel}
                activities={selectedActivities}
                flightTotal={flightTotal}
                hotelTotal={hotelTotal}
                activitiesTotal={activitiesTotal}
                transportCost={transportCost}
                finalTripCost={finalTripCost}
                transportMode={transport}
                onViewItinerary={handleViewItinerary}
                onSaveTrip={handleSaveTrip}
                onOpenExtendModal={() => setIsExtendModalOpen(true)}
              />
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: STICKY TRIP PREVIEW & REAL-TIME COST AUDIT              */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24 z-20">
            
            {/* Cost Breakdown & Real-Time Budget Validator */}
            <CostSummary
              flightTotal={flightTotal}
              hotelTotal={hotelTotal}
              activitiesTotal={activitiesTotal}
              transportCost={transportCost}
              finalTripCost={finalTripCost}
              budget={budget}
              transportMode={transport}
            />

            {/* Dynamic Sticky Trip Preview Card */}
            <TripPreview
              destination={selectedDestination}
              startDate={startDate}
              endDate={endDate}
              durationDays={durationDays}
              hotelNights={hotelNights}
              adults={adults}
              children={children}
              tripType={tripType}
              flight={selectedFlight}
              hotel={selectedHotel}
              activities={selectedActivities}
              flightTotal={flightTotal}
              hotelTotal={hotelTotal}
              activitiesTotal={activitiesTotal}
              transportCost={transportCost}
              finalTripCost={finalTripCost}
              budget={budget}
              onGenerateTrip={handleGenerateTrip}
              onViewItinerary={handleViewItinerary}
              onSaveTrip={handleSaveTrip}
              onProceedToPayment={handleProceedToPayment}
              isGenerated={isGenerated}
              hasSavedTrip={hasSavedTrip}
              onRestoreTrip={handleRestoreTrip}
              onOpenExtendModal={() => setIsExtendModalOpen(true)}
            />
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. MOBILE FLOATING ACTION BAR (STICKY DOCK ON SMALL SCREENS)              */}
      {/* ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            {selectedDestination?.name || 'Trip'} • {durationDays}D
          </span>
          <span className="font-extrabold text-base text-[#0A3D40] font-heading block">
            {formatINR(finalTripCost)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isGenerated ? (
            <button
              type="button"
              onClick={handleProceedToPayment}
              className="px-4 py-2.5 rounded-xl bg-[#0A3D40] text-white text-xs font-bold hover:bg-[#165B5F] transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>Book Trip</span>
              <ArrowDown size={13} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerateTrip}
              className="px-4 py-2.5 rounded-xl bg-[#CFA864] text-[#072D30] text-xs font-bold hover:bg-[#E5C38C] transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Generate</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (itineraryRef.current && isGenerated) {
                itineraryRef.current.scrollIntoView({ behavior: 'smooth' });
              } else {
                handleViewItinerary();
              }
            }}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            title="View Itinerary"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Extend Trip Modal */}
      <ExtendTripModal
        isOpen={isExtendModalOpen}
        onClose={() => setIsExtendModalOpen(false)}
        startDate={startDate}
        endDate={endDate}
        durationDays={durationDays}
        hotelNights={hotelNights}
        selectedHotel={selectedHotel}
        rooms={rooms}
        finalTripCost={finalTripCost}
        onConfirmExtend={handleConfirmExtend}
      />
    </div>
  );
}
