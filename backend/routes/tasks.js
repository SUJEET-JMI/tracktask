const express = require('express');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById
} = require('../controllers/taskscontroller');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllTasks);
router.get('/:id', authMiddleware, getTaskById);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
