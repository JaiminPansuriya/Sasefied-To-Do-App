const express = require('express');
const { getTasks, addTask, deleteTask } = require('../controllers/taskController');

// Initialize the router
const router = express.Router();

// Define routes
router.get('/', getTasks);  // Get all tasks
router.post('/', addTask);  // Add a new task
router.delete('/:id', deleteTask);  // Delete a task by ID

// Export the router to be used in the main server file
module.exports = router;
