import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = useTravel();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (fullName && email && password) {
      registerUser(fullName, email, password);
      navigate('/dashboard');
    } else {
      setErrorMsg('Please fill in all required fields.');
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
          <h2 className="text-2xl font-bold font-heading text-slate-800">Create Account</h2>
          <p className="text-slate-400 text-xs font-medium">Join TripSphere and plan your next trip</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-xs px-3 py-2 rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <User size={12} className="mr-1 text-slate-400" /> Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Emily Watson"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Mail size={12} className="mr-1 text-slate-400" /> Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. emily@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Lock size={12} className="mr-1 text-slate-400" /> Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Lock size={12} className="mr-1 text-slate-400" /> Confirm Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-light text-white font-heading font-semibold py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <UserPlus size={14} />
            <span>Register Account</span>
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center text-xs text-slate-400 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login here
          </Link>
        </div>

      </div>
    </div>
  );
}
