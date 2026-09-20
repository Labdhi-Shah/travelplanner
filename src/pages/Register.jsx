import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Phone, MapPin, Globe, Loader2 } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = useTravel();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    country: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser(formData);
      if (res && res.success) {
        localStorage.setItem('ts_saved_email', (formData.email || '').trim());
        navigate('/dashboard');
      } else {
        setErrorMsg(res?.message || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <User size={12} className="mr-1 text-slate-400" /> First Name
              </label>
              <input
                type="text"
                required
                disabled={loading}
                placeholder="e.g. Emily"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <User size={12} className="mr-1 text-slate-400" /> Last Name
              </label>
              <input
                type="text"
                required
                disabled={loading}
                placeholder="e.g. Watson"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Mail size={12} className="mr-1 text-slate-400" /> Email Address
            </label>
            <input
              type="email"
              required
              disabled={loading}
              placeholder="e.g. emily@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Phone size={12} className="mr-1 text-slate-400" /> Phone Number
            </label>
            <input
              type="tel"
              required
              disabled={loading}
              placeholder="e.g. +1 (555) 012-3456"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <MapPin size={12} className="mr-1 text-slate-400" /> City
              </label>
              <input
                type="text"
                required
                disabled={loading}
                placeholder="e.g. New York"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <Globe size={12} className="mr-1 text-slate-400" /> Country
              </label>
              <input
                type="text"
                required
                disabled={loading}
                placeholder="e.g. United States"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <Lock size={12} className="mr-1 text-slate-400" /> Password
              </label>
              <input
                type="password"
                required
                disabled={loading}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <Lock size={12} className="mr-1 text-slate-400" /> Confirm Password
              </label>
              <input
                type="password"
                required
                disabled={loading}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light text-white font-heading font-semibold py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Registering Account...</span>
              </>
            ) : (
              <>
                <UserPlus size={14} />
                <span>Register Account</span>
              </>
            )}
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
