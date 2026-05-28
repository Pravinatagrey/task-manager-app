import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-sm text-slate-400">
        No records found matching this configuration pipeline layout.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider sticky top-0">
            <tr>
              <th className="px-6 py-3 w-12">Status</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">State</th>
              <th className="px-6 py-3">Due Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskItem 
                key={task._id} 
                task={task} 
                onEdit={onEdit} 
                onDelete={onDelete} 
                onToggle={onToggle} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}