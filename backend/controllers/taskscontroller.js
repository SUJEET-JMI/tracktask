const { Task, User } = require('../models');
const { Op } = require('sequelize');

const getAllTasks = async (req, res) => {
  try {
    const { status, assignedTo, page = 1, limit = 10 } = req.query;
    const where = {};
    if (req.user.role !== 'admin') {
      where.assignedTo = req.user.id;
    } else {
      if (assignedTo) where.assignedTo = assignedTo;
    }
    if (status) where.status = status;

    const offset = (page - 1) * limit;
    const tasks = await Task.findAll({
      where,
      include: [{ model: User, as: 'assignee', attributes: ['name', 'email'] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    const total = await Task.count({ where });
    res.json({
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createTask = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only' });
  }
  const { title, description, assignedTo, dueDate } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      assignedTo,
      dueDate
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (req.user.role !== 'admin' && task.assignedTo !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await task.update({ title, description, dueDate, status });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByPk(taskId, {
      include: [{ model: User, as: 'assignee', attributes: ['name', 'email'] }]
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (req.user.role !== 'admin' && task.assignedTo !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  getTaskById
};
