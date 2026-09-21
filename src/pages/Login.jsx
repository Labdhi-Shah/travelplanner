import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

const LOGIN_API_URL = 'https://hackthon-dgcm.onrender.com/api/auth/login';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, syncLoginState } = useTravel();

  const [email, setEmail] = useState(() => {
    return location.state?.email || localStorage.getItem('ts_saved_email') || '';
  });
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('ts_remember_me') === 'true';
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg(null);
    const cleanEmail = (email || '').trim();
    if (!cleanEmail || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          password: password,
        }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok && data?.success) {
        if (typeof syncLoginState === 'function') {
          syncLoginState(data, cleanEmail);
        } else if (typeof loginUser === 'function') {
          await loginUser(cleanEmail, password);
        }

        if (rememberMe) {
          localStorage.setItem('ts_remember_me', 'true');
          localStorage.setItem('ts_saved_email', cleanEmail);
        } else {
          localStorage.removeItem('ts_remember_me');
          localStorage.removeItem('ts_saved_email');
        }

        const destination = location.state?.from?.pathname || location.state?.redirectTo || '/';
        navigate(destination, { replace: true });
      } else {
        const errorMsg = data?.message || (response.statusText ? `Error ${response.status}: ${response.statusText}` : 'Invalid email or password');
        setErrorMsg(errorMsg);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Unable to connect to server. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return;
    setErrorMsg(null);
    setLoading(true);
    try {
      const res = await loginUser('travel@123.com', 'Travel@123');
      if (res && res.success) {
        const destination = location.state?.from?.pathname || location.state?.redirectTo || '/';
        navigate(destination, { replace: true });
      } else {
        setErrorMsg(res?.message || 'Invalid email or password');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Google sign in failed');
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
          <h2 className="text-2xl font-bold font-heading text-slate-800">Welcome Back</h2>
          <p className="text-slate-400 text-xs font-medium">Access your personal travel dashboard</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-red-800">
              <AlertCircle size={14} className="shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
            {errorMsg.toLowerCase().includes('invalid') && (
              <p className="text-[11px] text-red-600 pl-5">
                Haven't created an account yet?{' '}
                <Link to="/register" className="font-bold underline text-red-800 hover:text-red-950">
                  Register here
                </Link>{' '}
                first.
              </p>
            )}
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
              disabled={loading}
              placeholder="e.g. emily.watson@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Lock size={12} className="mr-1 text-slate-400" /> Password
            </label>
            <input
              type="password"
              required
              disabled={loading}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Remember me & Forgot Pass */}
          <div className="flex items-center justify-between text-xs font-semibold">
            <label className="flex items-center space-x-2 text-slate-500 cursor-pointer select-none">
              <input
                type="checkbox"
                disabled={loading}
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
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light text-white font-heading font-semibold py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn size={14} />
                <span>Sign In</span>
              </>
            )}
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
          disabled={loading}
          className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4 text-red-500 mr-1 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.27-3.144C18.252 1.964 15.44 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.743-.08-1.3-.176-1.859H12.24z" />
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
