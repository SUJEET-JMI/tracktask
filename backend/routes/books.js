const express = require('express');
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getMyBooks,
  getBookById
} = require('../controllers/bookscontroller');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/my', authMiddleware, getMyBooks);
router.get('/:id', getBookById);
router.post('/', authMiddleware, createBook);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
