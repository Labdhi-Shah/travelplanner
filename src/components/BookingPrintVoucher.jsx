import React from 'react';
import { 
  Printer, X, CheckCircle2, ShieldCheck, Plane, Hotel, 
  Compass, Calendar, MapPin, Users, Phone, Mail, Hash, CreditCard 
} from 'lucide-react';
import { formatINR } from '../utils/pricing';

const getCategoryIcon = (cat) => {
  if (cat === 'Flights') return Plane;
  if (cat === 'Hotels') return Hotel;
  return Compass;
};

export default function BookingPrintVoucher({ booking, onClose }) {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const CategoryIcon = getCategoryIcon(booking.category || booking.type);

  const basePrice = booking.baseAmount || Math.round((booking.amountPaid || booking.price || 5000) * 0.88);
  const taxes = booking.taxesAndFees || Math.round(basePrice * 0.12);
  const fee = booking.platformFee || 499;
  const totalAmount = booking.amountPaid || (basePrice + taxes + fee);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-slate-100 relative my-8 print:border-none print:shadow-none print:m-0 print:p-6 print:rounded-none">
        
        {/* Modal Action Header (Hidden during actual print) */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-100 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Booking Voucher</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <Printer size={14} />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Voucher Content */}
        <div className="space-y-8 pt-4">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-heading font-extrabold text-sm">
                  TP
                </div>
                <h2 className="text-2xl font-black font-heading tracking-tight text-slate-900">TRAVEL PLANNER</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Boutique Travel & Reservation E-Ticket</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>CONFIRMED & PAID</span>
              </span>
              <p className="text-[11px] text-slate-400 font-mono mt-1.5">
                Issued: {new Date(booking.paidAt || booking.createdAt || Date.now()).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>
          </div>

          {/* Reference & Transaction Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Booking Reference</span>
              <span className="text-base font-extrabold font-mono text-primary mt-0.5 block">{booking.reference || booking.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Transaction Reference</span>
              <span className="text-xs font-mono font-bold text-slate-800 mt-1 block truncate" title={booking.paymentId || booking.reference}>
                {booking.paymentId || `TXN-${booking.reference || '8492'}`}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Verification Status</span>
              <span className="text-xs font-semibold text-slate-700 mt-1 flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Verified Online Booking</span>
              </span>
            </div>
          </div>

          {/* Booking Summary Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-heading text-slate-400 uppercase tracking-wider">Reservation Details</h3>
            
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CategoryIcon size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] bg-primary-dark/10 text-primary font-bold px-2 py-0.5 rounded uppercase">
                      {booking.category || booking.type || 'Travel Experience'}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 font-heading mt-1">{booking.title || 'Custom Tour Booking'}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-slate-400" />
                      <span>{booking.location || booking.destination || 'Global'}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-semibold block">Total Travelers</span>
                  <span className="text-sm font-bold text-slate-800 flex items-center justify-end gap-1 mt-0.5">
                    <Users size={14} className="text-slate-400" />
                    <span>{booking.travelersCount || booking.guestsCount || booking.guests || 2} Person(s)</span>
                  </span>
                </div>
              </div>

              {/* Specific metadata chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] font-bold block uppercase">Travel / Check-in</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{booking.date || booking.startDate || 'Upcoming'}</span>
                </div>
                {booking.checkOutDate && (
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold block uppercase">Check-out</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">{booking.checkOutDate}</span>
                  </div>
                )}
                {booking.flightDetails?.flightNumber && (
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold block uppercase">Flight No.</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block font-mono">{booking.flightDetails.flightNumber}</span>
                  </div>
                )}
                {booking.cabinClass && (
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold block uppercase">Class / Room</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">{booking.cabinClass}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 text-[10px] font-bold block uppercase">Status</span>
                  <span className="font-bold text-emerald-600 mt-0.5 block">Confirmed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Traveler Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 font-heading uppercase text-[11px] tracking-wider">Primary Passenger / Guest</h4>
              <div className="space-y-1 text-slate-600">
                <p className="font-bold text-slate-800">{booking.travelerName || booking.guestName || 'Emily Watson'}</p>
                <p className="flex items-center gap-1.5 text-slate-500">
                  <Mail size={12} /> {booking.travelerEmail || 'traveler@example.com'}
                </p>
                <p className="flex items-center gap-1.5 text-slate-500">
                  <Phone size={12} /> {booking.travelerPhone || '+91 98765 43210'}
                </p>
              </div>
            </div>

            {/* Itemized Price Breakdown */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 font-heading uppercase text-[11px] tracking-wider">Payment Breakdown (INR)</h4>
              <div className="space-y-1.5 text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Base Rate / Fare:</span>
                  <span className="font-semibold text-slate-800">{formatINR(basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Tourism Taxes (12%):</span>
                  <span className="font-semibold text-slate-800">{formatINR(taxes)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform & Processing:</span>
                  <span className="font-semibold text-slate-800">{formatINR(fee)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-300 pt-2 font-bold text-sm text-slate-900">
                  <span>Total Amount Paid:</span>
                  <span className="text-primary font-extrabold">{formatINR(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Barcode & Stamp */}
          <div className="border-t border-dashed border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-semibold text-slate-600">Important Instructions:</p>
              <p>• Please present this e-ticket and a valid government photo ID upon arrival / check-in.</p>
              <p>• For 24/7 priority customer support, contact support@travelplanner.com or +91 (800) 555-0199.</p>
            </div>
            
            {/* Simulated Barcode Visual */}
            <div className="text-center shrink-0">
              <div className="font-mono text-2xl tracking-[0.25em] font-black text-slate-800 select-none">
                |||||| | |||| ||| ||||| || |
              </div>
              <span className="font-mono text-[9px] text-slate-400 block tracking-widest mt-0.5">
                AUTH-{booking.reference || 'TS-8492'}-CONF
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
