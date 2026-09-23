import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Compass, AlertCircle, CheckCircle2, Bookmark, 
  RotateCcw, ArrowDown, MapPin, Calendar, Users, Plane, Hotel 
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

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium border border-white/10"
          >
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-primary-dark text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Interactive Travel Planner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Plan Your Dream Vacation
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Customize every leg of your journey — from worldwide destinations and flights to luxury hotels, curated activities, and budget validation.
          </p>

          {/* Quick Actions Bar */}
          <div className="mt-4 flex items-center justify-center gap-3 text-xs font-semibold">
            {hasSavedTrip && (
              <button
                type="button"
                onClick={handleRestoreTrip}
                className="text-primary hover:text-primary-dark underline flex items-center gap-1 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                Restore Saved Trip
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer ml-3"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          </div>
        </div>

        {/* Validation Errors Notice */}
        {validationErrors.length > 0 && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Please complete the following required items:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-rose-700">
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* Responsive Two-Column Layout */}
        {/* ---------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Planning Controls & Configuration */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Step 1: Destination Selection */}
            <DestinationSelector
              selectedDestination={selectedDestination}
              onSelectDestination={handleSelectDestination}
            />

            {/* Step 2: Dates */}
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

            {/* Step 3: Travelers & Trip Type */}
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

            {/* Step 4: Budget */}
            <BudgetSelector
              budget={budget}
              onBudgetChange={setBudget}
            />

            {/* Step 5: Preferences */}
            <PreferenceSelector
              preferences={preferences}
              onTogglePreference={handleTogglePreference}
            />

            {/* Step 6: Transport Preference */}
            <TransportSelector
              transport={transport}
              onTransportChange={(t) => {
                setTransport(t);
                setValidationErrors((prev) => prev.filter((e) => !e.includes('flight')));
              }}
            />

            {/* Step 7: Flight Selection (Conditional on Flight) */}
            {transport === 'Flight' && (
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
            )}

            {/* Step 8: Hotel Selection */}
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

            {/* Step 9: Activities */}
            <ActivitySelector
              selectedDestination={selectedDestination}
              selectedActivities={selectedActivities}
              onToggleActivity={handleToggleActivity}
              adults={adults}
              children={children}
            />

            {/* Generate My Trip Prominent Button in Left Flow */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Ready to see your tailored journey?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Validates all details, tabulates costs, and generates a day-by-day plan.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGenerateTrip}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Generate My Trip</span>
              </button>
            </div>

            {/* Day-by-Day Itinerary Section (Rendered when generated or when viewing) */}
            <div ref={itineraryRef}>
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
            <div ref={paymentRef} className="pt-2">
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

          {/* RIGHT COLUMN: Sticky Trip Preview, Cost Summary & Actions */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
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
