import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary text-white font-heading font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
            T
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-800">Reset Password</h2>
          <p className="text-slate-400 text-xs font-medium">We'll send you recovery details</p>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              We've dispatched password recovery instructions to <strong>{email}</strong>. Please check your inbox and spam folders.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center space-x-1.5 text-xs text-primary font-bold hover:underline pt-2"
            >
              <ArrowLeft size={12} />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <Mail size={12} className="mr-1 text-slate-400" /> Registered Email Address
              </label>
              <input
                type="email"
                required
                placeholder="e.g. emily.watson@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-light text-white font-heading font-semibold py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Send Reset Instructions</span>
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-primary font-semibold"
              >
                <ArrowLeft size={12} />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
