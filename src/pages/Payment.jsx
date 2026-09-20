import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, CreditCard, CheckCircle2, AlertTriangle, 
  ArrowLeft, RefreshCw, Calendar, MapPin, Users, Plane, Hotel, 
  Compass, Copy, Check, Printer, ChevronRight, Sparkles, HelpCircle, 
  Info, ArrowRight, ShieldAlert 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { calculatePriceBreakdown, formatINR, generateBookingReference } from '../utils/pricing';
import BookingPrintVoucher from '../components/BookingPrintVoucher';

const getCategoryIcon = (cat) => {
  if (cat === 'Flights') return Plane;
  if (cat === 'Hotels') return Hotel;
  return Compass;
};

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    user, 
    currentCheckout, 
    setCurrentCheckout, 
    confirmBookingPayment, 
    createPendingBooking, 
    bookings,
    addTrip
  } = useTravel();

  // Load booking from location state, URL param, currentCheckout, or fallback
  const [booking, setBooking] = useState(() => {
    const stateBooking = location.state?.booking;
    if (stateBooking) return stateBooking;

    if (currentCheckout) return currentCheckout;

    const saved = localStorage.getItem('ts_current_checkout');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }

    // Default fallback demo booking if someone visits /payment directly
    return {
      id: `booking-${Date.now()}`,
      reference: generateBookingReference('FL'),
      category: 'Flights',
      type: 'Flights',
      title: 'Air France Flight AF-023 (Economy)',
      destination: 'Paris, France',
      location: 'JFK → CDG',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      travelersCount: 2,
      baseAmountINR: 58000,
      status: 'Pending Payment',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
    };
  });

  // Traveler form state
  const [travelerInfo, setTravelerInfo] = useState(() => ({
    name: user?.name || booking?.travelerName || 'Emily Watson',
    email: user?.email || booking?.travelerEmail || 'emily.watson@example.com',
    phone: user?.phone || booking?.travelerPhone || '+91 98765 43210',
    specialRequests: ''
  }));

  // Status view state: 'review' | 'processing' | 'success' | 'failed'
  const [paymentState, setPaymentState] = useState(() => {
    if (booking?.status === 'Confirmed') {
      return 'success';
    }
    return 'review';
  });

  const [paymentDetails, setPaymentDetails] = useState(() => {
    if (booking?.paymentId) {
      return {
        payment_id: booking.paymentId,
        amountPaidINR: booking.amountPaid || booking.totalAmountINR,
        paymentDate: booking.paidAt || new Date().toISOString()
      };
    }
    return null;
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Price calculations in INR
  const pricing = calculatePriceBreakdown({
    baseAmountUSD: booking?.priceUSD || (booking?.price && !booking?.baseAmountINR ? booking.price : 0),
    baseAmountINR: booking?.baseAmountINR || (booking?.totalAmountINR ? booking.totalAmountINR * 0.88 : (booking?.price ? booking.price * 85 : 45000)),
    travelers: booking?.travelersCount || booking?.guestsCount || booking?.travelers || 2
  });

  // Keep state synchronized with storage and pending record
  useEffect(() => {
    if (booking && paymentState === 'review') {
      const enrichedBooking = {
        ...booking,
        totalAmountINR: pricing.totalAmountINR,
        baseAmount: pricing.baseAmount,
        taxesAndFees: pricing.taxesAndFees,
        platformFee: pricing.platformFee,
        travelerName: travelerInfo.name,
        travelerEmail: travelerInfo.email,
        travelerPhone: travelerInfo.phone
      };
      setCurrentCheckout(enrichedBooking);
    }
  }, [pricing.totalAmountINR, travelerInfo, paymentState]);

  // Copy to clipboard helper
  const handleCopy = (text, fieldName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  // Complete Booking & Payment
  const handlePayNow = () => {
    setErrorMessage('');
    setPaymentState('processing');

    const totalINR = pricing.totalAmountINR;
    const currentBookingData = {
      ...booking,
      totalAmountINR: totalINR,
      baseAmount: pricing.baseAmount,
      taxesAndFees: pricing.taxesAndFees,
      platformFee: pricing.platformFee,
      travelerName: travelerInfo.name,
      travelerEmail: travelerInfo.email,
      travelerPhone: travelerInfo.phone
    };

    // Ensure pending booking is saved
    const pending = createPendingBooking(currentBookingData);
    setBooking(pending);

    setTimeout(() => {
      const transactionId = `TXN-${Date.now()}`;
      const response = {
        payment_id: transactionId,
        amountPaidINR: totalINR,
        paymentDate: new Date().toISOString(),
        travelerName: travelerInfo.name,
        travelerEmail: travelerInfo.email,
        travelerPhone: travelerInfo.phone
      };

      const confirmed = confirmBookingPayment(pending.id, {
        paymentId: transactionId,
        amountPaidINR: totalINR,
        paymentDate: response.paymentDate,
        travelerName: travelerInfo.name,
        travelerEmail: travelerInfo.email,
        travelerPhone: travelerInfo.phone
      });

      // Also if it was a tour package, ensure trip is registered in My Trips
      if (booking.isPackageTrip && booking.packageData) {
        addTrip({
          name: booking.packageData.name || booking.title,
          destinationId: booking.packageData.destinationId || 'custom',
          destinationName: booking.destination || 'Custom Tour',
          image: booking.image || booking.packageData.image,
          startDate: booking.date,
          endDate: booking.endDate || booking.date,
          travelers: { adults: booking.travelersCount || 2, children: 0 },
          budgetLimit: totalINR,
          status: 'Upcoming',
          route: [booking.destination]
        });
      }

      setBooking(confirmed || { ...pending, status: 'Confirmed', paymentId: transactionId });
      setPaymentDetails(response);
      setPaymentState('success');
    }, 600);
  };

  const handleRetryPayment = () => {
    handlePayNow();
  };

  const CategoryIcon = getCategoryIcon(booking?.category || booking?.type);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-[85vh]">
      
      {/* Top Back Navigation (Visible in review/failed states) */}
      {(paymentState === 'review' || paymentState === 'failed') && (
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Booking Details</span>
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* ==================================================================== */}
        {/* 1. REVIEW & PAY VIEW                                                */}
        {/* ==================================================================== */}
        {paymentState === 'review' && (
          <motion.div
            key="review-step"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Header Title */}
            <div className="text-center sm:text-left space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/15 text-primary text-[11px] font-bold tracking-wide uppercase">
                <ShieldCheck size={14} />
                <span>Secure Checkout • Instant Confirmation</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                Review & Confirm Booking
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Verify your travel itinerary and guest information before completing your reservation.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Traveler Info & Payment Methods Info (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Traveler Contact Details Form */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                      <Users size={18} className="text-primary" />
                      <span>Traveler & Contact Information</span>
                    </h3>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Primary Passenger</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 block">Full Name</label>
                      <input
                        type="text"
                        value={travelerInfo.name}
                        onChange={(e) => setTravelerInfo({ ...travelerInfo, name: e.target.value })}
                        placeholder="e.g. Emily Watson"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Email Address (for e-ticket)</label>
                      <input
                        type="email"
                        value={travelerInfo.email}
                        onChange={(e) => setTravelerInfo({ ...travelerInfo, email: e.target.value })}
                        placeholder="e.g. emily@example.com"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Phone Number (SMS updates)</label>
                      <input
                        type="tel"
                        value={travelerInfo.phone}
                        onChange={(e) => setTravelerInfo({ ...travelerInfo, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 block">Special Requests / Notes (Optional)</label>
                      <textarea
                        rows={2}
                        value={travelerInfo.specialRequests}
                        onChange={(e) => setTravelerInfo({ ...travelerInfo, specialRequests: e.target.value })}
                        placeholder="Dietary preferences, airport wheelchair assistance, high floor room, etc."
                        className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Gateway Assurance & Payment Protection */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-slate-900">TripSphere Booking Protection</h4>
                      <p className="text-xs text-slate-500">256-bit SSL encrypted • Instant Booking Confirmation</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span>Instant Voucher</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span>Free Cancellation</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span>24/7 Concierge</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span>Best Rate Guarantee</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary & Pay Action (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Reservation Summary Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Booking ID</span>
                      <span className="font-mono text-sm font-black text-primary block mt-0.5">
                        {booking.reference || booking.id}
                      </span>
                    </div>
                    <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-lg uppercase">
                      {booking.category || booking.type || 'Travel'} Booking
                    </span>
                  </div>

                  {/* Item preview */}
                  <div className="space-y-3.5">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <CategoryIcon size={20} />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-slate-900 leading-tight">
                          {booking.title}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                          <MapPin size={12} className="text-slate-400" />
                          <span><strong>Destination:</strong> {booking.destination || booking.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2.5 bg-slate-50 rounded-2xl p-3.5 text-xs text-slate-600 border border-slate-100">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Booking / Travel Date</span>
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          <span>{booking.date || booking.startDate}</span>
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Travelers / Guests</span>
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <Users size={12} className="text-slate-400" />
                          <span>{pricing.travelers} Guest(s)</span>
                        </span>
                      </div>

                      {booking.checkOutDate && (
                        <div className="space-y-0.5 sm:col-span-2 pt-1 border-t border-slate-200/50">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Check-out Date</span>
                          <span className="font-semibold text-slate-800">{booking.checkOutDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Itemized Price Breakdown */}
                  <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Booking Amount (Base Fare/Rate):</span>
                      <span className="font-semibold text-slate-900">{pricing.formattedBase}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Taxes & GST (12%):</span>
                      <span className="font-semibold text-slate-900">{pricing.formattedTaxes}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Platform & Convenience Fee:</span>
                      <span className="font-semibold text-slate-900">{pricing.formattedFee}</span>
                    </div>

                    <div className="flex justify-between items-baseline border-t border-slate-200 pt-3 text-slate-900">
                      <div>
                        <span className="font-heading font-extrabold text-sm block">Total Amount</span>
                        <span className="text-[10px] text-slate-400 font-semibold">Includes all taxes & fees in INR (₹)</span>
                      </div>
                      <span className="text-2xl font-black font-heading text-primary">
                        {pricing.formattedTotal}
                      </span>
                    </div>
                  </div>

                  {/* Pay Now Action Button */}
                  <button
                    onClick={handlePayNow}
                    className="w-full bg-primary hover:bg-primary-light text-white font-heading font-bold text-sm py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <Lock size={16} />
                    <span>Confirm & Pay Now • {pricing.formattedTotal}</span>
                  </button>

                  <div className="text-center space-y-1">
                    <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-600" />
                      <span>256-Bit SSL Encrypted • 100% Safe Checkout</span>
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* 2. PROCESSING VIEW                                                  */}
        {/* ==================================================================== */}
        {paymentState === 'processing' && (
          <motion.div
            key="processing-step"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-lg mx-auto bg-white rounded-3xl p-10 border border-slate-200 shadow-xl text-center space-y-6 my-12"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto animate-spin">
              <RefreshCw size={32} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold font-heading text-slate-900">Processing Your Booking...</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Confirming reservation details and securing your booking voucher. Please do not close or refresh this tab.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-xs font-semibold text-slate-600 space-y-1.5 text-left border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-400">Booking Ref:</span>
                <span className="font-mono text-slate-800">{booking.reference || booking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Amount:</span>
                <span className="text-primary font-bold">{pricing.formattedTotal}</span>
              </div>
            </div>

            <button
              onClick={() => setPaymentState('review')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 underline cursor-pointer"
            >
              Cancel and return to review
            </button>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* 3. PAYMENT SUCCESSFUL / BOOKING CONFIRMED VIEW                       */}
        {/* ==================================================================== */}
        {paymentState === 'success' && (
          <motion.div
            key="success-step"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Celebration Header */}
            <div className="text-center space-y-3 max-w-2xl mx-auto pt-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25 ring-8 ring-emerald-100"
              >
                <CheckCircle2 size={44} />
              </motion.div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                  <Sparkles size={13} />
                  <span>Payment Verified & Confirmed</span>
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                  Payment Successful!
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  Your reservation is confirmed. We have sent the confirmation e-ticket to{' '}
                  <strong className="text-slate-800">{travelerInfo.email || user?.email || 'your email'}</strong>.
                </p>
              </div>
            </div>

            {/* Details & Voucher Card */}
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              
              {/* Receipt Top Status Band */}
              <div className="bg-primary px-6 sm:px-8 py-5 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold block">Transaction Status</span>
                  <span className="text-lg font-bold font-heading flex items-center gap-1.5">
                    <Check size={18} className="text-accent" />
                    <span>Paid in Full ({formatINR(paymentDetails?.amountPaidINR || pricing.totalAmountINR)})</span>
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold block">Confirmation</span>
                  <span className="text-xs font-mono bg-white/15 px-2.5 py-1 rounded-lg">Instant Confirmation</span>
                </div>
              </div>

              {/* Transaction Key Value Pairs */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* ID Copy Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Payment Transaction ID */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Transaction ID</span>
                      <span className="font-mono text-xs font-bold text-slate-900 mt-0.5 block truncate max-w-[200px]">
                        {paymentDetails?.payment_id || booking.paymentId || `TXN-${booking.reference || '8492'}`}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(paymentDetails?.payment_id || booking.paymentId || `TXN-${booking.reference || '8492'}`, 'payId')}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all shadow-xs cursor-pointer"
                      title="Copy Transaction ID"
                    >
                      {copiedField === 'payId' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Booking ID */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Booking Reference ID</span>
                      <span className="font-mono text-xs font-bold text-primary mt-0.5 block">
                        {booking.reference || booking.id}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(booking.reference || booking.id, 'bookId')}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all shadow-xs cursor-pointer"
                      title="Copy Booking ID"
                    >
                      {copiedField === 'bookId' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    </button>
                  </div>

                </div>

                {/* Booking Information Breakdown */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <CategoryIcon size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded uppercase">
                          {booking.category || booking.type || 'Experience'}
                        </span>
                        <h3 className="font-heading font-bold text-base text-slate-900 mt-1">{booking.title}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                          <MapPin size={12} className="text-slate-400" />
                          <span>{booking.destination || booking.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 font-semibold block">Total Amount Paid</span>
                      <span className="text-lg font-extrabold font-heading text-primary">
                        {formatINR(paymentDetails?.amountPaidINR || pricing.totalAmountINR)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Travel Date</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">{booking.date || booking.startDate}</span>
                    </div>
                    {booking.checkOutDate && (
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Check-out</span>
                        <span className="font-semibold text-slate-800 mt-0.5 block">{booking.checkOutDate}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Guests</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">{pricing.travelers} Guest(s)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Payment Status</span>
                      <span className="font-bold text-emerald-600 mt-0.5 block">Confirmed</span>
                    </div>
                  </div>
                </div>

                {/* Post-Payment Action Buttons */}
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* View My Booking */}
                    <button
                      onClick={() => navigate('/dashboard/bookings')}
                      className="py-3 px-4 bg-primary hover:bg-primary-light text-white rounded-2xl font-heading font-semibold text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <CreditCard size={15} />
                      <span>View My Bookings</span>
                    </button>

                    {/* Go to My Trips */}
                    <button
                      onClick={() => navigate('/dashboard/my-trips')}
                      className="py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-heading font-semibold text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Compass size={15} />
                      <span>Go to My Trips</span>
                    </button>

                    {/* Print / Download Booking Confirmation */}
                    <button
                      onClick={() => setShowPrintModal(true)}
                      className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-2xl font-heading font-semibold text-xs transition-all border border-slate-200 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Printer size={15} />
                      <span>Print Confirmation</span>
                    </button>

                  </div>

                  <div className="text-center pt-2">
                    <Link
                      to="/"
                      className="text-xs text-slate-400 hover:text-primary font-semibold transition-colors"
                    >
                      ← Back to Travel Planner Home
                    </Link>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* 4. PAYMENT FAILED / CANCELLED VIEW                                  */}
        {/* ==================================================================== */}
        {paymentState === 'failed' && (
          <motion.div
            key="failed-step"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-6 pt-4"
          >
            {/* Alert Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <AlertTriangle size={32} />
              </div>
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-bold text-xs uppercase tracking-wider">
                  Payment Unsuccessful
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                  Payment Failed or Cancelled
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  {errorMessage || 'The payment transaction could not be completed. Your booking details are saved and on hold.'}
                </p>
              </div>
            </div>

            {/* Preserved Booking Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold font-heading text-slate-900">Saved Booking Details</h3>
                <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2 py-0.5 rounded uppercase">
                  Pending Payment
                </span>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CategoryIcon size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">{booking.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-slate-400" />
                    <span>{booking.destination || booking.location}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-2xl p-3.5 text-xs text-slate-600 border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Travel Date</span>
                  <span className="font-semibold text-slate-800">{booking.date || booking.startDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Amount</span>
                  <span className="font-bold text-primary">{pricing.formattedTotal}</span>
                </div>
              </div>

              {/* Troubleshooting Tips */}
              <div className="bg-stone-50 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5 border border-stone-200/70">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Info size={14} className="text-primary" />
                  <span>Reservation assistance:</span>
                </p>
                <ul className="list-disc list-inside text-slate-500 space-y-1 pl-1 text-[11px]">
                  <li>Click <strong>Try Again</strong> to re-process your booking confirmation.</li>
                  <li>Verify all traveler contact information.</li>
                  <li>Reach out to TripSphere 24/7 concierge support if issues persist.</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleRetryPayment}
                  className="w-full py-3.5 bg-primary hover:bg-primary-light text-white rounded-2xl font-heading font-bold text-xs shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <RefreshCw size={15} />
                  <span>Try Again / Retry Payment</span>
                </button>

                <button
                  onClick={() => setPaymentState('review')}
                  className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-heading font-semibold text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Edit Details & Review</span>
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* Printable Confirmation Modal */}
      {showPrintModal && (
        <BookingPrintVoucher
          booking={{
            ...booking,
            ...paymentDetails,
            travelerName: travelerInfo.name,
            travelerEmail: travelerInfo.email,
            travelerPhone: travelerInfo.phone,
            amountPaid: paymentDetails?.amountPaidINR || pricing.totalAmountINR,
            baseAmount: pricing.baseAmount,
            taxesAndFees: pricing.taxesAndFees,
            platformFee: pricing.platformFee,
            paymentId: paymentDetails?.payment_id || booking.paymentId
          }}
          onClose={() => setShowPrintModal(false)}
        />
      )}

    </div>
  );
}
