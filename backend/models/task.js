const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    defaultValue: 'pending'
  },
  tags: DataTypes.STRING, // comma-separated or JSON array
  dueDate: DataTypes.DATE
}, {
  tableName: 'tasks'
});

// Relations:
Task.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });

module.exports = Task;
