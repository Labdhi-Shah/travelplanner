import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useTravel();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser(email, password);
      navigate('/dashboard');
    } else {
      setErrorMsg('Please enter both email and password.');
    }
  };

  const handleGoogleLogin = () => {
    loginUser('emily.watson@example.com', 'google_sso');
    navigate('/dashboard');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary text-white font-heading font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
            T
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-800">Welcome Back</h2>
          <p className="text-slate-400 text-xs font-medium">Access your personal travel dashboard</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-xs px-3 py-2 rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Mail size={12} className="mr-1 text-slate-400" /> Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. emily.watson@example.com"
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

          {/* Remember me & Forgot Pass */}
          <div className="flex items-center justify-between text-xs font-semibold">
            <label className="flex items-center space-x-2 text-slate-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary accent-primary"
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-primary hover:text-accent">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-light text-white font-heading font-semibold py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <LogIn size={14} />
            <span>Sign In</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200" />
          <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase">Or</span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        {/* Google SSO */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 transition-colors"
        >
          <svg className="w-4 h-4 text-red-500 mr-1 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.27-3.144C18.252 1.964 15.44 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.743-.08-1.3-.176-1.859H12.24z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Link to Register */}
        <div className="text-center text-xs text-slate-400 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Register now
          </Link>
        </div>

      </div>
    </div>
  );
}
