import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Smartphone, Building2, ShieldCheck, CheckCircle2, 
  AlertCircle, Loader2, ArrowRight, Lock, Calendar, Users, 
  MapPin, Plane, Hotel, Compass, Bookmark, Eye, RefreshCw, Sparkles 
} from 'lucide-react';
import { formatINR } from '../../utils/pricing';

const POPULAR_BANKS = [
  'State Bank of India (SBI)',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Bank of Baroda',
  'Kotak Mahindra Bank',
  'Punjab National Bank'
];

const UPI_APPS = [
  { name: 'Google Pay', handle: '@okhdfcbank' },
  { name: 'PhonePe', handle: '@ybl' },
  { name: 'Paytm', handle: '@paytm' },
  { name: 'BHIM UPI', handle: '@upi' }
];

export default function PaymentSection({
  destination,
  startDate,
  endDate,
  durationDays,
  adults,
  children,
  tripType,
  flight,
  hotel,
  activities,
  flightTotal,
  hotelTotal,
  activitiesTotal,
  transportCost,
  finalTripCost,
  transportMode,
  onViewItinerary,
  onSaveTrip,
  onOpenExtendModal
}) {
  // Payment Method Selection: 'upi' | 'credit' | 'debit' | 'netbanking'
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Form Fields
  const [upiId, setUpiId] = useState('');
  
  // Card Details (Credit / Debit)
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Net Banking
  const [selectedBank, setSelectedBank] = useState(POPULAR_BANKS[0]);

  // Payment Status: 'pending' | 'processing' | 'successful' | 'failed'
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [errorMessage, setErrorMessage] = useState('');
  const [completedTransaction, setCompletedTransaction] = useState(null);

  // Read existing paid booking from localStorage
  const [existingPaidBooking, setExistingPaidBooking] = useState(() => {
    try {
      const item = localStorage.getItem('ts_paid_booking');
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  });

  // Calculate previously paid amount and additional amount due
  const previouslyPaid = existingPaidBooking?.totalPaidAmount || existingPaidBooking?.paidAmount || 0;
  const isTripExtended = previouslyPaid > 0 && finalTripCost > previouslyPaid;
  const additionalAmountDue = isTripExtended ? (finalTripCost - previouslyPaid) : 0;
  const isFullyPaid = previouslyPaid > 0 && finalTripCost <= previouslyPaid;
  const amountToCharge = isTripExtended ? additionalAmountDue : finalTripCost;

  // Helper date formatter
  const formatDateDisplay = (str) => {
    if (!str) return '—';
    try {
      return new Date(str + 'T00:00:00').toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return str;
    }
  };

  // Format card number with spaces every 4 digits
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
    setErrorMessage('');
  };

  // Format expiry date as MM/YY
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setExpiryDate(val);
    setErrorMessage('');
  };

  // Generate random transaction ID: TRIP-2026-XXXXXX
  const generateTransactionId = () => {
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    return `TRIP-2026-${randomSixDigits}`;
  };

  // Generate extension transaction ID: TRIP-EXT-2026-XXXXXX
  const generateExtensionTransactionId = () => {
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    return `TRIP-EXT-2026-${randomSixDigits}`;
  };

  // Validate form based on active payment method
  const validateForm = () => {
    if (amountToCharge <= 0) {
      return 'No payable balance due for this trip.';
    }

    if (paymentMethod === 'upi') {
      const upiRegex = /^[\w.-]+@[\w.-]+$/;
      if (!upiId.trim()) {
        return 'Please enter your UPI ID.';
      }
      if (!upiRegex.test(upiId.trim())) {
        return 'Please enter a valid UPI ID (e.g. yourname@upi or user@okhdfcbank).';
      }
    } else if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      if (!cardholderName.trim()) {
        return 'Please enter the cardholder name.';
      }
      const rawDigits = cardNumber.replace(/\s+/g, '');
      if (rawDigits.length !== 16) {
        return 'Please enter a valid 16-digit card number.';
      }
      if (!expiryDate.trim() || expiryDate.length !== 5) {
        return 'Please enter a valid expiry date (MM/YY).';
      }
      const [mm, yy] = expiryDate.split('/').map(Number);
      if (!mm || mm < 1 || mm > 12) {
        return 'Invalid expiry month. Must be between 01 and 12.';
      }
      if (!cvv.trim() || cvv.length < 3 || cvv.length > 4) {
        return 'Please enter a valid 3 or 4-digit CVV.';
      }
    } else if (paymentMethod === 'netbanking') {
      if (!selectedBank) {
        return 'Please select your bank for Net Banking.';
      }
    }

    return null;
  };

  // Handle Pay Now action
  const handlePayNow = () => {
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setPaymentStatus('failed');
      return;
    }

    setErrorMessage('');
    setPaymentStatus('processing');

    // Simulate realistic payment gateway processing with delay
    setTimeout(() => {
      // Determine safe masked method label (never store raw card or CVV!)
      let methodLabel = '';
      if (paymentMethod === 'upi') {
        methodLabel = `UPI (${upiId.trim()})`;
      } else if (paymentMethod === 'credit') {
        const lastFour = cardNumber.replace(/\s+/g, '').slice(-4);
        methodLabel = `Credit Card (•••• •••• •••• ${lastFour})`;
      } else if (paymentMethod === 'debit') {
        const lastFour = cardNumber.replace(/\s+/g, '').slice(-4);
        methodLabel = `Debit Card (•••• •••• •••• ${lastFour})`;
      } else {
        methodLabel = `Net Banking (${selectedBank})`;
      }

      if (isTripExtended && existingPaidBooking) {
        // EXTENSION PAYMENT FLOW
        const extTxId = generateExtensionTransactionId();
        const originalTxId = existingPaidBooking.originalTransactionId || existingPaidBooking.transactionId;
        const originalAmount = existingPaidBooking.originalPaidAmount || existingPaidBooking.paidAmount;

        const updatedBooking = {
          ...existingPaidBooking,
          originalTransactionId: originalTxId,
          originalPaidAmount: originalAmount,
          latestTransactionId: extTxId,
          transactionId: extTxId,
          totalPaidAmount: previouslyPaid + additionalAmountDue,
          paidAmount: finalTripCost,
          isExtended: true,
          destination: destination?.name,
          country: destination?.country,
          dates: {
            startDate,
            endDate,
            durationDays,
            hotelNights: durationDays > 1 ? durationDays - 1 : 1
          },
          travelers: {
            adults,
            children,
            total: adults + children,
            tripType
          },
          flight: flight ? {
            airline: flight.airline,
            flightNumber: flight.flightNumber,
            stops: flight.stops
          } : null,
          hotel: hotel ? {
            name: hotel.name,
            location: hotel.location,
            stars: hotel.stars
          } : null,
          activities: activities.map(a => ({ id: a.id, name: a.name, price: a.pricePerPerson })),
          costBreakdown: {
            flightTotal,
            hotelTotal,
            activitiesTotal,
            transportCost,
            grandTotal: finalTripCost
          },
          paymentMethod: methodLabel,
          paymentStatus: 'Successful',
          lastPaymentDate: new Date().toISOString(),
          extensions: [
            ...(existingPaidBooking.extensions || []),
            {
              extensionTransactionId: extTxId,
              additionalAmount: additionalAmountDue,
              paymentMethod: methodLabel,
              paidAt: new Date().toISOString(),
              addedDays: durationDays - (existingPaidBooking.dates?.durationDays || 0)
            }
          ]
        };

        try {
          localStorage.setItem('ts_paid_booking', JSON.stringify(updatedBooking));
          const existingTrip = localStorage.getItem('ts_saved_planned_trip');
          if (existingTrip) {
            const parsed = JSON.parse(existingTrip);
            parsed.paymentStatus = 'Paid (Extended)';
            parsed.transactionId = extTxId;
            parsed.originalTransactionId = originalTxId;
            parsed.totalPaid = finalTripCost;
            parsed.endDate = endDate;
            parsed.duration = durationDays;
            parsed.hotelNights = durationDays > 1 ? durationDays - 1 : 1;
            localStorage.setItem('ts_saved_planned_trip', JSON.stringify(parsed));
          }
        } catch (err) {
          console.error('Storage access error:', err);
        }

        setExistingPaidBooking(updatedBooking);
        setCompletedTransaction({
          ...updatedBooking,
          isExtensionPayment: true,
          extensionTxId: extTxId,
          originalTxId,
          additionalPaid: additionalAmountDue
        });
        setPaymentStatus('successful');
      } else {
        // INITIAL PAYMENT FLOW
        const txId = generateTransactionId();
        const bookingRecord = {
          transactionId: txId,
          originalTransactionId: txId,
          originalPaidAmount: finalTripCost,
          totalPaidAmount: finalTripCost,
          paidAmount: finalTripCost,
          destination: destination?.name,
          country: destination?.country,
          destinationImage: destination?.image,
          dates: {
            startDate,
            endDate,
            durationDays,
            hotelNights: durationDays > 1 ? durationDays - 1 : 1
          },
          travelers: {
            adults,
            children,
            total: adults + children,
            tripType
          },
          flight: flight ? {
            airline: flight.airline,
            flightNumber: flight.flightNumber,
            stops: flight.stops
          } : null,
          hotel: hotel ? {
            name: hotel.name,
            location: hotel.location,
            stars: hotel.stars
          } : null,
          activities: activities.map(a => ({ id: a.id, name: a.name, price: a.pricePerPerson })),
          costBreakdown: {
            flightTotal,
            hotelTotal,
            activitiesTotal,
            transportCost,
            grandTotal: finalTripCost
          },
          paymentMethod: methodLabel,
          paymentStatus: 'Successful',
          paymentDate: new Date().toISOString(),
          extensions: []
        };

        // Persist in localStorage safely without sensitive card data
        try {
          localStorage.setItem('ts_paid_booking', JSON.stringify(bookingRecord));
          
          // Also update ts_saved_planned_trip status
          const existingTrip = localStorage.getItem('ts_saved_planned_trip');
          if (existingTrip) {
            const parsed = JSON.parse(existingTrip);
            parsed.paymentStatus = 'Paid';
            parsed.transactionId = txId;
            parsed.totalPaid = finalTripCost;
            localStorage.setItem('ts_saved_planned_trip', JSON.stringify(parsed));
          }
        } catch (err) {
          console.error('Storage access error:', err);
        }

        setExistingPaidBooking(bookingRecord);
        setCompletedTransaction({
          ...bookingRecord,
          isExtensionPayment: false
        });
        setPaymentStatus('successful');
      }
    }, 1600);
  };

  // Reset payment state to retry
  const handleRetry = () => {
    setPaymentStatus('pending');
    setErrorMessage('');
  };

  return (
    <div id="payment-section" className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 transition-all relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-primary-dark font-semibold text-sm flex items-center justify-center">
              10
            </span>
            <h2 className="text-xl font-bold text-slate-800 font-heading">
              Payment & Final Checkout
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Secure, simulated checkout for your customized itinerary with real-time dynamic pricing.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      {/* Dynamic Booking Amount Banner */}
      <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-200/90">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/70">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Booking Amount Breakdown
          </span>
          <span className="text-xs font-semibold text-primary">
            Connected to Live Calculations
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
          <div className="bg-white p-3 rounded-xl border border-slate-200/60">
            <span className="text-[11px] text-slate-400 block font-medium">Flight Total</span>
            <strong className="text-sm font-bold text-slate-800 font-heading">
              {formatINR(flightTotal)}
            </strong>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/60">
            <span className="text-[11px] text-slate-400 block font-medium">Hotel Total</span>
            <strong className="text-sm font-bold text-slate-800 font-heading">
              {formatINR(hotelTotal)}
            </strong>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/60">
            <span className="text-[11px] text-slate-400 block font-medium">Activities Total</span>
            <strong className="text-sm font-bold text-slate-800 font-heading">
              {formatINR(activitiesTotal)}
            </strong>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/60">
            <span className="text-[11px] text-slate-400 block font-medium">Transit ({transportMode})</span>
            <strong className="text-sm font-bold text-slate-800 font-heading">
              {formatINR(transportCost)}
            </strong>
          </div>
        </div>

        {/* Grand Total Bar */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {isTripExtended ? 'Updated Grand Total' : 'Grand Total (Payable Amount)'}
            </span>
            <span className="text-xs text-slate-500">
              All taxes, bookings, and traveler fees included ({durationDays} Days / {durationDays > 1 ? durationDays - 1 : 1} Nights)
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-primary-dark font-heading">
              {formatINR(finalTripCost)}
            </span>
          </div>
        </div>

        {/* Trip Extension / Additional Payment Banner */}
        {isTripExtended && (
          <div className="mt-3 p-4 bg-amber-50/90 border border-amber-200 rounded-xl text-xs space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-amber-900 pb-2 border-b border-amber-200/60">
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Trip Extended (+{durationDays - (existingPaidBooking.dates?.durationDays || 0)} Days)</span>
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                Previously Paid: {formatINR(previouslyPaid)} (Tx: {existingPaidBooking.originalTransactionId || existingPaidBooking.transactionId})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-700 block text-xs">
                  Additional Amount Due for Extension:
                </span>
                <span className="text-[11px] text-slate-500">
                  Only additional hotel nights & extra activities are charged
                </span>
              </div>
              <strong className="text-xl font-black text-amber-900 font-heading">
                {formatINR(additionalAmountDue)}
              </strong>
            </div>
          </div>
        )}

        {/* Fully Paid Banner */}
        {isFullyPaid && (
          <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="font-bold block text-sm">Trip Booking Fully Paid & Confirmed</strong>
                <span className="text-slate-500 text-[11px]">
                  Tx ID: {existingPaidBooking.latestTransactionId || existingPaidBooking.transactionId} · Total Paid: {formatINR(previouslyPaid)}
                </span>
              </div>
            </div>
            {onOpenExtendModal && (
              <button
                type="button"
                onClick={onOpenExtendModal}
                className="px-4 py-2 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition text-xs flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Add More Days</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Payment Container: Left is Method & Inputs, Right is Payment Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* PAYMENT METHODS & INPUT FORMS (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Method Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => { setPaymentMethod('upi'); setErrorMessage(''); }}
                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'upi'
                    ? 'border-primary bg-primary/5 text-primary-dark shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                }`}
              >
                <Smartphone className="w-4 h-4 mb-2 text-primary" />
                <div>
                  <span className="font-bold text-xs font-heading block">UPI</span>
                  <span className="text-[10px] text-slate-400">GPay, PhonePe</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setPaymentMethod('credit'); setErrorMessage(''); }}
                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'credit'
                    ? 'border-primary bg-primary/5 text-primary-dark shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                }`}
              >
                <CreditCard className="w-4 h-4 mb-2 text-accent" />
                <div>
                  <span className="font-bold text-xs font-heading block">Credit Card</span>
                  <span className="text-[10px] text-slate-400">Visa, MC, RuPay</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setPaymentMethod('debit'); setErrorMessage(''); }}
                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'debit'
                    ? 'border-primary bg-primary/5 text-primary-dark shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                }`}
              >
                <CreditCard className="w-4 h-4 mb-2 text-emerald-600" />
                <div>
                  <span className="font-bold text-xs font-heading block">Debit Card</span>
                  <span className="text-[10px] text-slate-400">All Banks</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setPaymentMethod('netbanking'); setErrorMessage(''); }}
                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'netbanking'
                    ? 'border-primary bg-primary/5 text-primary-dark shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                }`}
              >
                <Building2 className="w-4 h-4 mb-2 text-purple-600" />
                <div>
                  <span className="font-bold text-xs font-heading block">Net Banking</span>
                  <span className="text-[10px] text-slate-400">Indian Banks</span>
                </div>
              </button>
            </div>
          </div>

          {/* METHOD-SPECIFIC INPUT FORMS */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
            {/* 1. UPI Section */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    UPI ID / VPA *
                  </label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="example@upi or mobilenumber@ybl"
                      value={upiId}
                      onChange={(e) => { setUpiId(e.target.value); setErrorMessage(''); }}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    A payment request will be simulated on your linked UPI application.
                  </p>
                </div>

                {/* Fast handle selection chips */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                    Quick Select App Handle:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {UPI_APPS.map((app) => (
                      <button
                        key={app.name}
                        type="button"
                        onClick={() => {
                          const base = upiId.includes('@') ? upiId.split('@')[0] : upiId || 'traveler';
                          setUpiId(`${base}${app.handle}`);
                          setErrorMessage('');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-primary text-slate-600 text-xs font-medium transition cursor-pointer"
                      >
                        {app.name} ({app.handle})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Credit / Debit Card Section */}
            {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Enter {paymentMethod === 'credit' ? 'Credit' : 'Debit'} Card details</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Frontend Mock Only
                  </span>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardholderName}
                    onChange={(e) => { setCardholderName(e.target.value); setErrorMessage(''); }}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Card Number (16 Digits) *
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="4532 8901 2345 6789"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono font-semibold text-slate-800 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono font-semibold text-slate-800 focus:outline-none focus:border-primary transition text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      CVV *
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cvv}
                      onChange={(e) => { setCvv(e.target.value.replace(/\D/g, '')); setErrorMessage(''); }}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono font-semibold text-slate-800 focus:outline-none focus:border-primary transition text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. Net Banking Section */}
            {paymentMethod === 'netbanking' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Bank for Net Banking *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={selectedBank}
                      onChange={(e) => { setSelectedBank(e.target.value); setErrorMessage(''); }}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-primary transition"
                    >
                      {POPULAR_BANKS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    You will be redirected to the secure net banking authorization portal of {selectedBank}.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Validation / Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-rose-800 text-xs font-medium">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={handleRetry}
                className="underline text-rose-900 font-bold hover:opacity-80"
              >
                Retry
              </button>
            </div>
          )}

          {/* Pay Now Button */}
          <div>
            <button
              type="button"
              disabled={paymentStatus === 'processing' || isFullyPaid}
              onClick={handlePayNow}
              className={`w-full py-4 px-6 rounded-2xl text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
                isFullyPaid
                  ? 'bg-emerald-600 opacity-90 cursor-default'
                  : 'bg-primary hover:bg-primary-light cursor-pointer hover:shadow-xl'
              } disabled:opacity-75 disabled:cursor-wait`}
            >
              {paymentStatus === 'processing' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-accent" />
                  <span>
                    {isTripExtended ? 'Processing Additional Payment securely...' : 'Processing Payment securely...'}
                  </span>
                </>
              ) : isFullyPaid ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>Trip Fully Paid ({formatINR(previouslyPaid)})</span>
                </>
              ) : isTripExtended ? (
                <>
                  <Lock className="w-4 h-4 text-accent" />
                  <span>Pay Additional {formatINR(additionalAmountDue)}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-accent" />
                  <span>Pay {formatINR(finalTripCost)} Now</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              🔒 Safe & simulated test checkout. No actual bank charges will occur.
            </p>
          </div>
        </div>

        {/* PAYMENT SUMMARY CARD (Right 5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 space-y-4 sticky top-28">
            <h3 className="text-sm font-bold text-slate-800 font-heading uppercase tracking-wider pb-2 border-b border-slate-200/60 flex items-center justify-between">
              <span>Payment Summary</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified
              </span>
            </h3>

            {/* Destination Snapshot */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                <img
                  src={destination?.image}
                  alt={destination?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-accent tracking-wider block">
                  {destination?.country}
                </span>
                <h4 className="font-bold text-slate-900 text-base font-heading leading-tight">
                  {destination?.name}
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  {durationDays} Days / {durationDays > 1 ? durationDays - 1 : 1} Nights
                </div>
              </div>
            </div>

            {/* Itemized Snapshot Details */}
            <div className="space-y-2 text-xs border-t border-slate-200/70 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Dates
                </span>
                <span className="font-semibold text-slate-800">
                  {formatDateDisplay(startDate)} → {formatDateDisplay(endDate)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  Travelers
                </span>
                <span className="font-semibold text-slate-800">
                  {adults + children} ({tripType})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-primary" />
                  Flight
                </span>
                <span className="font-semibold text-slate-800">
                  {flight ? `${flight.airline} (${flight.flightNumber})` : 'Not Selected'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5 text-amber-600" />
                  Hotel
                </span>
                <span className="font-semibold text-slate-800 line-clamp-1 max-w-[170px] text-right">
                  {hotel ? hotel.name : 'Not Selected'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-600" />
                  Activities
                </span>
                <span className="font-semibold text-slate-800">
                  {activities.length} Selected
                </span>
              </div>
            </div>

            {/* Total Callout in Summary */}
            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isTripExtended ? 'Updated Trip Total' : 'Total Trip Cost'}
                  </span>
                  <span className="text-xl font-black text-primary-dark font-heading">
                    {formatINR(finalTripCost)}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Inclusive of GST
                </span>
              </div>

              {isTripExtended && (
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Additional Due:</span>
                  <span className="font-extrabold text-amber-700 text-sm font-heading">
                    +{formatINR(additionalAmountDue)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* SUCCESS MODAL / RECEIPT SCREEN                       */}
      {/* ==================================================== */}
      <AnimatePresence>
        {paymentStatus === 'successful' && completedTransaction && (
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Decorative background circle */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -translate-y-24 translate-x-24 -z-0 pointer-events-none" />

              <div className="relative z-10 text-center">
                {/* Checkmark Icon Animation */}
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  {completedTransaction.isExtensionPayment ? 'Trip Extended & Confirmed' : 'Confirmed & Paid'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-2">
                  {completedTransaction.isExtensionPayment ? 'Additional Payment Successful!' : 'Payment Successful!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {completedTransaction.isExtensionPayment ? (
                    <>Your trip to <strong>{completedTransaction.destination}</strong> has been successfully extended to <strong>{completedTransaction.dates.durationDays} Days</strong>.</>
                  ) : (
                    <>Your bespoke journey to <strong>{completedTransaction.destination}</strong> is fully booked.</>
                  )}
                </p>

                {/* Receipt Card */}
                <div className="mt-6 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200/80 text-left text-xs space-y-2.5">
                  {completedTransaction.isExtensionPayment ? (
                    <>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="text-slate-500 font-medium">Extension Transaction ID</span>
                        <strong className="font-mono text-primary font-bold text-sm">
                          {completedTransaction.extensionTxId}
                        </strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Original Transaction ID</span>
                        <span className="font-mono text-slate-700 font-semibold text-xs">
                          {completedTransaction.originalTxId}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Additional Amount Paid</span>
                        <strong className="text-emerald-700 font-bold text-sm font-heading">
                          {formatINR(completedTransaction.additionalPaid)}
                        </strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Total Trip Amount Paid</span>
                        <strong className="text-slate-900 font-bold text-sm font-heading">
                          {formatINR(completedTransaction.totalPaidAmount || completedTransaction.paidAmount)}
                        </strong>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="text-slate-500 font-medium">Transaction ID</span>
                        <strong className="font-mono text-primary font-bold text-sm">
                          {completedTransaction.transactionId}
                        </strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Amount Paid</span>
                        <strong className="text-slate-900 font-bold text-sm font-heading">
                          {formatINR(completedTransaction.paidAmount)}
                        </strong>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Payment Method</span>
                    <span className="font-semibold text-slate-800">
                      {completedTransaction.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Destination</span>
                    <span className="font-semibold text-slate-800">
                      {completedTransaction.destination}, {completedTransaction.country}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Trip Dates</span>
                    <span className="font-semibold text-slate-800">
                      {formatDateDisplay(completedTransaction.dates.startDate)} → {formatDateDisplay(completedTransaction.dates.endDate)} ({completedTransaction.dates.durationDays} Days)
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500 font-medium">Storage Status</span>
                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      ✓ Saved to LocalStorage
                    </span>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentStatus('pending');
                      if (onViewItinerary) onViewItinerary();
                    }}
                    className="py-3 px-4 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-accent" />
                    <span>View Itinerary</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSaveTrip) onSaveTrip();
                      setPaymentStatus('pending');
                    }}
                    className="py-3 px-4 rounded-xl bg-accent/20 hover:bg-accent/30 text-slate-900 border border-accent/50 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4 text-amber-800" />
                    <span>Save Trip & Close</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
