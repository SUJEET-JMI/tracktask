const express = require('express');
const { signup, login, getUsers } = require('../controllers/authcontroller');
const authMiddleware = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/users', authMiddleware, getUsers);

module.exports = router;
