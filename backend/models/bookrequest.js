const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Book = require('./book');

const BookRequest = sequelize.define('BookRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'declined'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'book_requests'
});

// Relations:
BookRequest.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
User.hasMany(BookRequest, { foreignKey: 'requesterId', as: 'sentRequests' });

BookRequest.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
Book.hasMany(BookRequest, { foreignKey: 'bookId', as: 'requests' });

module.exports = BookRequest;
