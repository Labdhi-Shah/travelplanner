import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plane, Hotel, Compass, Calendar, RefreshCw, XCircle } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function Bookings() {
  const { bookings, cancelBooking } = useTravel();
  const [filterCat, setFilterCat] = useState('All');

  const filteredBookings = bookings.filter(b => {
    if (filterCat === 'All') return true;
    return b.category === filterCat;
  });

  const getIcon = (category) => {
    if (category === 'Flights') return Plane;
    if (category === 'Hotels') return Hotel;
    return Compass;
  };

  const handleCancel = (id, title) => {
    if (window.confirm(`Are you sure you want to cancel the reservation for "${title}"?`)) {
      cancelBooking(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Filter Category Chips */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-slate-400 text-xs font-semibold">Dashboard / Booking Manager</p>
          <span className="text-xs text-slate-400 font-medium">Review confirmations and active booking receipts.</span>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-white border border-slate-100 rounded-2xl w-full sm:w-fit">
          {['All', 'Flights', 'Hotels', 'Activities'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                filterCat === cat
                  ? 'bg-primary text-white'
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
            const Icon = getIcon(book.category);
            const isCancelled = book.status === 'Cancelled';
            return (
              <motion.div
                key={book.id}
                className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                {/* Left side details */}
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${
                    isCancelled 
                      ? 'bg-red-50 border-red-100 text-red-400' 
                      : 'bg-primary/5 border-primary/10 text-primary'
                  }`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{book.category} Confirmation</span>
                    <h3 className="font-heading font-bold text-sm text-slate-800 mt-0.5">{book.title}</h3>
                    
                    <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-semibold mt-1">
                      <span>Ref: <strong>{book.reference}</strong></span>
                      <span className="flex items-center"><Calendar size={10} className="mr-0.5" /> Date: {book.date}</span>
                      <span>Location: {book.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right side status & cost */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 gap-2 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none mb-1">Invoice Total</span>
                    <span className="text-base font-bold text-slate-800">${book.price}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                      isCancelled 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {book.status}
                    </span>

                    {!isCancelled && (
                      <button
                        onClick={() => handleCancel(book.id, book.title)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition-colors"
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
            Choose custom vacation packages or click direct hotel reservations to add confirmations to your dashboard ledger.
          </p>
        </div>
      )}

    </div>
  );
}
