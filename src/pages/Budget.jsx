import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, PlusCircle, Trash2, Edit3, 
  HelpCircle, BarChart2, PieChart, Info, X, Save 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function Budget() {
  const { trips, addExpenseToTrip, updateExpenseInTrip, deleteExpenseFromTrip } = useTravel();

  // Selected Trip state (default to first trip)
  const [selectedTripId, setSelectedTripId] = useState(() => {
    return trips.length > 0 ? trips[0].id : '';
  });

  const trip = trips.find(t => t.id === selectedTripId);

  // Modal / Form States
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState(null); // Holds expense object if editing
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('0');
  const [expCategory, setExpCategory] = useState('Flights');
  const [expDate, setExpDate] = useState(new Date().toISOString().split('T')[0]);

  if (trips.length === 0) {
    return (
      <div className="bg-white p-16 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center min-h-[350px]">
        <HelpCircle size={40} className="text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-slate-800 font-heading">No Travel Trips Found</h3>
        <p className="text-slate-400 text-xs mt-2 max-w-sm">
          Please plan a travel trip using the planner wizard to populate your budget calculator boards.
        </p>
      </div>
    );
  }

  // Get active trip details
  const expenses = trip?.expenses || [];
  const budgetLimit = trip?.budget?.limit || 1000;
  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const remaining = Math.max(0, budgetLimit - totalSpent);
  const spentPercent = Math.min(100, Math.round((totalSpent / budgetLimit) * 100));

  // Category breakdown calculation
  const categories = ["Flights", "Hotels", "Food", "Activities", "Shopping", "Transportation", "Other"];
  const categoryTotals = categories.reduce((acc, cat) => {
    acc[cat] = expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + Number(exp.amount), 0);
    return acc;
  }, {});

  const handleOpenAddModal = () => {
    setEditingExp(null);
    setExpTitle('');
    setExpAmount('0');
    setExpCategory('Flights');
    setExpDate(new Date().toISOString().split('T')[0]);
    setShowModal(true);
  };

  const handleOpenEditModal = (exp) => {
    setEditingExp(exp);
    setExpTitle(exp.title);
    setExpAmount(exp.amount.toString());
    setExpCategory(exp.category);
    setExpDate(exp.date);
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const expData = {
      title: expTitle,
      amount: Number(expAmount),
      category: expCategory,
      date: expDate
    };

    if (editingExp) {
      updateExpenseInTrip(selectedTripId, editingExp.id, expData);
    } else {
      addExpenseToTrip(selectedTripId, expData);
    }
    setShowModal(false);
  };

  const handleDeleteExpense = (expId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this expense line item?")) {
      deleteExpenseFromTrip(selectedTripId, expId);
    }
  };

  // Color mapping helper for category meters
  const getCategoryColor = (cat) => {
    if (cat === 'Flights') return 'bg-blue-500';
    if (cat === 'Hotels') return 'bg-emerald-500';
    if (cat === 'Food') return 'bg-amber-500';
    if (cat === 'Activities') return 'bg-purple-500';
    if (cat === 'Shopping') return 'bg-pink-500';
    if (cat === 'Transportation') return 'bg-indigo-500';
    return 'bg-slate-500';
  };

  return (
    <div className="space-y-6">
      
      {/* Selector Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-slate-400 text-xs font-semibold">Dashboard / Budget Tracker</p>
          <span className="text-xs text-slate-400 font-medium">Record invoices and cost breakdowns for travel trips.</span>
        </div>

        {/* Trip Dropdown Selector */}
        <div className="flex items-center space-x-2 w-full sm:w-fit">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Trip:</span>
          <select
            value={selectedTripId}
            onChange={(e) => setSelectedTripId(e.target.value)}
            className="flex-grow sm:flex-grow-0 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none"
          >
            {trips.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Limit */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border flex items-center justify-center text-slate-500 shrink-0">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Budget Cap</span>
            <span className="text-xl font-bold text-slate-800 mt-0.5 block">${budgetLimit}</span>
          </div>
        </div>

        {/* Spent */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Spent</span>
            <span className="text-xl font-bold text-red-600 mt-0.5 block">${totalSpent} ({spentPercent}%)</span>
          </div>
        </div>

        {/* Remaining */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shrink-0">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Remaining Balance</span>
            <span className="text-xl font-bold text-green-600 mt-0.5 block">${remaining}</span>
          </div>
        </div>

      </div>

      {/* Categories Breakdown & Spreadsheet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Category charts & progress bars */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm h-fit space-y-6">
          <h3 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-1.5">
            <BarChart2 size={16} className="text-primary" /> Spending by Category
          </h3>
          
          <div className="space-y-4">
            {categories.map(cat => {
              const spent = categoryTotals[cat] || 0;
              const ratio = totalSpent > 0 ? Math.round((spent / totalSpent) * 100) : 0;
              return (
                <div key={cat} className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-slate-500 font-semibold">
                    <span className="flex items-center">
                      <span className={`w-2.5 h-2.5 rounded-full mr-2 ${getCategoryColor(cat)}`} />
                      {cat}
                    </span>
                    <span>${spent} ({ratio}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 rounded-full ${getCategoryColor(cat)}`}
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Ledger Spreadsheet */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-800">Expense Ledger</h3>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{expenses.length} transaction entries</span>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="bg-primary hover:bg-primary-light text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <PlusCircle size={14} />
              <span>Add Expense</span>
            </button>
          </div>

          {/* Ledger Table */}
          {expenses.length > 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="px-5 py-3">Expense Name</th>
                      <th className="px-5 py-3">Category</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3 text-right">Amount</th>
                      <th className="px-5 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                    {expenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-slate-850 font-bold">{exp.title}</td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-1.5 ${getCategoryColor(exp.category)}`} />
                            {exp.category}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-400">{exp.date}</td>
                        <td className="px-5 py-3.5 text-right font-extrabold text-slate-800">${exp.amount}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-center space-x-1">
                            <button
                              onClick={() => handleOpenEditModal(exp)}
                              className="p-1 text-slate-400 hover:text-slate-600 rounded"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button
                              onClick={(e) => handleDeleteExpense(exp.id, e)}
                              className="p-1 text-red-400 hover:text-red-600 rounded"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-center min-h-[220px]">
              <DollarSign size={32} className="text-slate-300 mb-3" />
              <h4 className="font-heading font-bold text-sm text-slate-850">Ledger spreadsheet is empty</h4>
              <p className="text-slate-400 text-[11px] mt-1.5 max-w-xs leading-relaxed">
                Add flight invoices, taxi receipts, or meals to coordinate your vacation pricing budgets.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Add / Edit Expense Dialog Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-heading font-bold text-base text-slate-800">
                {editingExp ? 'Edit Expense Item' : 'Add Expense Record'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs text-slate-600 font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={expAmount}
                    onChange={(e) => setExpAmount(e.target.value)}
                    className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</label>
                  <select
                    value={expCategory}
                    onChange={(e) => setExpCategory(e.target.value)}
                    className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3 py-2 text-xs text-slate-700 outline-none"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expense Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Airport taxi, Dinner at cafe"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</label>
                <input
                  type="date"
                  required
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-primary hover:bg-primary-light text-white rounded-xl font-semibold shadow-sm"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
