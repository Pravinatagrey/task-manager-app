import React, { useState } from 'react';
import { register as registerCall } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  /* State variables for form inputs */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  /* validation function */
  const validateForm = () => {
    const localErrors = {};
    if (!name) localErrors.name = 'Full name required';
    if (!email) localErrors.email = 'email required';
    if (!password || password.length < 6) localErrors.password = 'Password requires a minimum of 6 characters';
    if (password !== confirmPassword) localErrors.confirmPassword = 'Password confirmation does not match';
    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };
/* handleSubmit function is called when the login form is submitted. */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await registerCall({ name, email, password });
      navigate('/login', { state: { msg: 'User registration successful. Please login.' } });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registraion failed exception');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-[400px] w-full bg-white p-8 rounded-2xl shadow-xl space-y-5 border border-slate-200">
        <h2 className="text-xl font-bold text-center text-slate-900 tracking-tight">User Registration</h2>
        {serverError && <p className="p-2 bg-red-50 text-red-600 text-xs text-center rounded border border-red-200">{serverError}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input type="text" placeholder="Enter Full Name" className="w-full px-3 py-2 border rounded-md text-sm" onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <input type="email" placeholder="Enter Email" className="w-full px-3 py-2 border rounded-md text-sm" onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <input type="password" placeholder="Enter Password (Min 6 chars)" className="w-full px-3 py-2 border rounded-md text-sm" onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <input type="password" placeholder="Confirm Loop Verification Key" className="w-full px-3 py-2 border rounded-md text-sm" onChange={(e) => setConfirmPassword(e.target.value)} />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="w-full py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition">
            Register
          </button>
        </form>
        <p className="text-xs text-center text-slate-500">
          Already Registered? <Link to="/login" className="text-indigo-600 underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}
