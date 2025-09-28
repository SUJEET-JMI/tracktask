const { Book } = require('../models');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { isAvailable: true }
    });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createBook = async (req, res) => {
  const { title, author, condition, imageUrl } = req.body;
  try {
    const book = await Book.create({
      title,
      author,
      condition,
      imageUrl,
      userId: req.user.id
    });
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, author, condition, imageUrl, isAvailable } = req.body;
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await book.update({ title, author, condition, imageUrl, isAvailable });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await book.destroy();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { userId: req.user.id }
    });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getMyBooks,
  getBookById
};
