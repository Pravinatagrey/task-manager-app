import React, { useState, useEffect } from 'react';

export default function TaskForm({ editTask, onAdd, onUpdate, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || '');
      setDescription(editTask.description || '');
      setPriority(editTask.priority || 'Medium');
      setDueDate(editTask.dueDate ? editTask.dueDate.substring(0, 10) : '');
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
    }
    setError('');
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title field is required');
      return;
    }

    const taskData = { title, description, priority, dueDate: dueDate || undefined };

    if (editTask) {
      onUpdate(editTask._id, taskData);
    } else {
      onAdd(taskData);
    }
    
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
        {editTask ? 'Modify Target Task' : 'Create System Task'}
      </h3>
      
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Task Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Acme Deployment Schedule..."
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="3"
          placeholder="Detailed implementation operational roadmap notes..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Priority Metric</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none bg-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Due Target Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white font-semibold rounded-md text-sm hover:bg-indigo-700 transition">
          {editTask ? 'Update Accounted Task' : 'Add Task to Ledger'}
        </button>
        {editTask && (
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-md text-sm hover:bg-slate-200 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}