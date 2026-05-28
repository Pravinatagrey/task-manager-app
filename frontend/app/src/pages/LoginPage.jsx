import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login as loginCall } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  /*State variables for form inputs */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  /* validateForm function checks the email and password inputs for validity.  */
  const validateForm = () => {
    const localErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      localErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      localErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      localErrors.password = 'Password is required';
    }
    
    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };
  
/* handleSubmit function is called when the login form is submitted. */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const { data } = await loginCall({ email, password });
      loginUser(data);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Invalid email or password key');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4 antialiased">
      <div className="max-w-[400px] w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200/60 transform transition duration-300 hover:shadow-2xl">
        
        {/* Header/Branding */}
        <div className="text-left mb-8">
          <div className="inline-flex items-center justify-center w-40 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl shadow-md shadow-indigo-400 mb-3">
            Task Manager
          </div>
         
          <p className="text-sm text-slate-500 mt-1">Enter your details to continue</p>
        </div>

        {/* Server Error Alert Block */}
        {serverError && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-xs font-semibold text-center rounded-lg border border-rose-200 animate-shake">
            {serverError}
          </div>
        )}

        {/* Form Group */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="text"
              placeholder="name@company.com"
              className={`w-full px-3.5 py-2 border rounded-xl text-sm transition duration-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 ${
                errors.email 
                  ? 'border-rose-400 focus:ring-rose-200' 
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-rose-500 text-xs font-medium mt-1.5 flex items-center gap-1">
                ⚠️ {errors.email}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-3.5 py-2 border rounded-xl text-sm transition duration-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 ${
                errors.password 
                  ? 'border-rose-400 focus:ring-rose-200' 
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-rose-500 text-xs font-medium mt-1.5 flex items-center gap-1">
                ⚠️ {errors.password}
              </p>
            )}
          </div>
  <div className="flex justify-center items-center">
          <button 
            type="submit" 
            className="w-40 mt-4 py-2.5 align-center bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-100 hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Need an account? Register?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-800 underline font-bold transition">
             Register Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}