import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      <h1 className="text-lg font-bold tracking-tight"> Task Manager Portal</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300">Welcome, {user.name}</span>
          <button 
            onClick={logoutUser} 
            className="bg-red-600 hover:bg-red-700 px-3 py-1.5 text-xs font-semibold rounded transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}