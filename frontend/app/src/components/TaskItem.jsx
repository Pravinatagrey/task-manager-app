import React from 'react';

export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <tr className={`border-b transition duration-150 ${task.completed ? 'bg-emerald-50/60 hover:bg-emerald-50' : 'bg-amber-50/30 hover:bg-amber-50/60'}`}>
      <td className="px-6 py-4">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => onToggle(task._id, !task.completed)}
          className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
        />
      </td>
      <td className="px-6 py-4">
        <div className={`text-sm font-semibold text-slate-900 ${task.completed ? 'line-through text-slate-400' : ''}`}>
          {task.title}
        </div>
        {task.description && <div className="text-xs text-slate-500 max-w-xs truncate">{task.description}</div>}
      </td>
      <td className="px-6 py-4">
        <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${getPriorityStyle(task.priority)}`}>
          {task.priority}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${task.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
      </td>
      <td className="px-6 py-4 space-x-3 text-right whitespace-nowrap">
        <button onClick={() => onEdit(task)} className="text-xs font-bold text-blue-600 hover:text-blue-800 transition">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="text-xs font-bold text-red-600 hover:text-red-800 transition">
          Delete
        </button>
      </td>
    </tr>
  );
}