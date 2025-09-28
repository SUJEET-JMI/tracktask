const jwt = require('jsonwebtoken');
const config = require('../config/config');

const signJwt = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1d' });
};

const verifyJwt = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

module.exports = { signJwt, verifyJwt };
