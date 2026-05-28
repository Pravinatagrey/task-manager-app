const express = require('express');
const { getAllTasks, createTask, updateTask, toggleComplete, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Apply authMiddleware to ALL task routes dynamically
router.use(authMiddleware);

/* This file defines the routes for task-related operations, including fetching, creating, updating, toggling completion, and deleting tasks. */
router.route('/')
  .get(getAllTasks)
  .post(createTask);

  /*  The route for updating, toggling completion, and deleting a task is defined using the task ID as a URL parameter.  */
router.route('/:id')
  .put(updateTask)
  .patch(toggleComplete)
  .delete(deleteTask);

module.exports = router;