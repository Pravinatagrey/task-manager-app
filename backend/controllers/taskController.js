const Task = require('../models/Task');
/* This file defines the controller functions for handling task-related operations in the backend. */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching tasks' });
  }
};

/* The getAllTasks function retrieves all tasks associated with the authenticated user from the database. */
exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  
  try {
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      userId: req.user.userId
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error creating task' });
  }
};

/*  The createTask function handles the creation of a new task.*/
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating task' });
  }
};

/* The toggleComplete function handles toggling the completion status of a task. */
exports.toggleComplete = async (req, res) => {
  const { completed } = req.body;
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    task.completed = completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error toggling task status' });
  }
};

/* The deleteTask function handles the deletion of a task. */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error deleting task' });
  }
};