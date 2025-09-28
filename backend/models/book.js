const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  condition: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'books'
});

// Relations:
Book.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
User.hasMany(Book, { foreignKey: 'userId', as: 'books' });

module.exports = Book;
