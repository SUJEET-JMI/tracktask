const sequelize = require('../config/db');

const User = require('./user');
const Book = require('./book');
const BookRequest = require('./bookrequest');

// (The associations were defined inside each model file already)

// Sync function
const syncModels = async () => {
  await sequelize.sync({ alter: true });  // or { force: true } in dev
};

module.exports = {
  sequelize,
  syncModels,
  User,
  Book,
  BookRequest
};
