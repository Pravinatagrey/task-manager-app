import React from 'react';

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex gap-1 bg-slate-200 p-1 rounded-lg">
      {['all', 'pending', 'completed'].map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`py-1.5 px-4 text-xs font-semibold capitalize rounded-md transition ${
            filter === type ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}