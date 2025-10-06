const { Task } = require('../models');

const getAllTasks = async (req, res) => {
  try {
    const { status, tags } = req.query;
    const where = { userId: req.user.id };
    if (status) where.status = status;
    if (tags) where.tags = { [require('sequelize').Op.like]: `%${tags}%` }; // simple like for tags

    const tasks = await Task.findAll({ where });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createTask = async (req, res) => {
  const { title, description, status, tags, dueDate } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      tags,
      dueDate,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status, tags, dueDate } = req.body;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await task.update({ title, description, status, tags, dueDate });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.userId !== req.user.id) {
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
  deleteTask,
  getTaskById
};
