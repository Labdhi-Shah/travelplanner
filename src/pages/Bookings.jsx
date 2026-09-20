import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, Plane, Hotel, Compass, Calendar, RefreshCw, 
  XCircle, Printer, ShieldCheck, ArrowRight, CheckCircle2, Clock 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { formatINR } from '../utils/pricing';
import BookingPrintVoucher from '../components/BookingPrintVoucher';

const getIcon = (category) => {
  if (category === 'Flights') return Plane;
  if (category === 'Hotels') return Hotel;
  return Compass;
};

export default function Bookings() {
  const navigate = useNavigate();
  const { bookings, cancelBooking, setCurrentCheckout } = useTravel();
  const [filterCat, setFilterCat] = useState('All');
  const [selectedVoucherBooking, setSelectedVoucherBooking] = useState(null);

  const filteredBookings = bookings.filter(b => {
    if (filterCat === 'All') return true;
    return b.category === filterCat || b.type === filterCat;
  });

  const handleCancel = (id, title) => {
    if (window.confirm(`Are you sure you want to cancel the reservation for "${title}"?`)) {
      cancelBooking(id);
    }
  };

  const handleResumePayment = (booking) => {
    setCurrentCheckout(booking);
    navigate('/payment', { state: { booking } });
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Filter Category Chips */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-slate-400 text-xs font-semibold">Dashboard / Booking Manager</p>
          <h2 className="text-xl font-bold font-heading text-slate-800 tracking-tight mt-0.5">
            Confirmed Bookings & Receipts
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Review confirmations, manage reservations, and download official booking vouchers.
          </span>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-white border border-slate-100 rounded-2xl w-full sm:w-fit shadow-xs">
          {['All', 'Flights', 'Hotels', 'Activities'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                filterCat === cat
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-transparent text-slate-500 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((book, idx) => {
            const Icon = getIcon(book.category || book.type);
            const isCancelled = book.status === 'Cancelled';
            const isPending = book.status === 'Pending Payment';
            const isConfirmed = book.status === 'Confirmed' || (!isCancelled && !isPending);

            const displayAmount = book.amountPaid || book.totalAmountINR || (book.price ? book.price * 85 : 45000);

            return (
              <motion.div
                key={book.id}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-slate-300 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                {/* Left side details */}
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 mt-0.5 ${
                    isCancelled 
                      ? 'bg-red-50 border-red-100 text-red-400' 
                      : isPending
                      ? 'bg-amber-50 border-amber-200 text-amber-600'
                      : 'bg-primary/5 border-primary/10 text-primary'
                  }`}>
                    <Icon size={22} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        {book.category || book.type} Confirmation
                      </span>
                      {book.paymentId && (
                        <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                          <ShieldCheck size={10} className="text-emerald-600" />
                          <span>{book.paymentId}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-sm sm:text-base text-slate-800">{book.title}</h3>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
                      <span>Ref: <strong className="font-mono text-slate-700">{book.reference || book.id}</strong></span>
                      <span className="flex items-center"><Calendar size={11} className="mr-1 text-slate-400" /> Date: {book.date || book.startDate}</span>
                      <span>Location: {book.location || book.destination}</span>
                    </div>
                  </div>
                </div>

                {/* Right side status, actions & cost */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 border-slate-100 pt-3 lg:pt-0 gap-3 shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none mb-1">
                      {isConfirmed ? 'Amount Paid' : 'Payable Total'}
                    </span>
                    <span className="text-lg font-black font-heading text-primary">
                      {formatINR(displayAmount)}
                    </span>
                  </div>
                  
                  <div className="flex items-center flex-wrap gap-2">
                    {/* Status badge */}
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                      isCancelled 
                        ? 'bg-red-100 text-red-800' 
                        : isPending
                        ? 'bg-amber-100 text-amber-800 flex items-center gap-1'
                        : 'bg-emerald-100 text-emerald-800 flex items-center gap-1'
                    }`}>
                      {isPending && <Clock size={10} />}
                      {isConfirmed && <CheckCircle2 size={10} />}
                      <span>{book.status}</span>
                    </span>

                    {/* Action button if pending */}
                    {isPending && (
                      <button
                        onClick={() => handleResumePayment(book)}
                        className="px-3 py-1.5 bg-primary hover:bg-primary-light text-white text-[11px] font-heading font-bold rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Complete Payment</span>
                        <ArrowRight size={12} />
                      </button>
                    )}

                    {/* Printable Voucher if Confirmed */}
                    {isConfirmed && (
                      <button
                        onClick={() => setSelectedVoucherBooking(book)}
                        className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-semibold px-2.5"
                        title="Print / View Confirmation Voucher"
                      >
                        <Printer size={13} />
                        <span className="hidden sm:inline">Voucher</span>
                      </button>
                    )}

                    {!isCancelled && (
                      <button
                        onClick={() => handleCancel(book.id, book.title)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        title="Cancel Booking"
                      >
                        <XCircle size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center min-h-[300px]">
          <CreditCard size={36} className="text-slate-300 mb-3" />
          <h4 className="font-heading font-bold text-slate-850">No Booking Confirmations Listed</h4>
          <p className="text-slate-400 text-xs mt-1.5 max-w-xs leading-relaxed">
            Book flight tickets, boutique hotel stays, or vacation packages to view confirmations and booking receipts here.
          </p>
        </div>
      )}

      {/* Printable Confirmation Voucher Modal */}
      {selectedVoucherBooking && (
        <BookingPrintVoucher
          booking={selectedVoucherBooking}
          onClose={() => setSelectedVoucherBooking(null)}
        />
      )}

    </div>
  );
}
