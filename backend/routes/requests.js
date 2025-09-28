const express = require('express');
const {
  createRequest,
  getSentRequests,
  getReceivedRequests,
  updateRequest
} = require('../controllers/requrestcontroller');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/', authMiddleware, createRequest);
router.get('/sent', authMiddleware, getSentRequests);
router.get('/received', authMiddleware, getReceivedRequests);
router.put('/:id', authMiddleware, updateRequest);

module.exports = router;
