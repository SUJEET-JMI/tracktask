const { BookRequest, Book } = require('../models');

const createRequest = async (req, res) => {
  const { bookId } = req.body;
  try {
    const existing = await BookRequest.findOne({
      where: { bookId, requesterId: req.user.id }
    });
    if (existing) {
      return res.status(400).json({ message: 'You have already requested this book' });
    }
    const request = await BookRequest.create({
      bookId,
      requesterId: req.user.id
    });
    res.status(201).json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSentRequests = async (req, res) => {
  try {
    const requests = await BookRequest.findAll({
      where: { requesterId: req.user.id },
      include: ['book']
    });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getReceivedRequests = async (req, res) => {
  try {
    // find requests on books that belong to me
    const requests = await BookRequest.findAll({
      include: [
        {
          model: Book,
          as: 'book',
          where: { userId: req.user.id }
        }
      ]
    });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateRequest = async (req, res) => {
  const reqId = req.params.id;
  const { status } = req.body; // “accepted” or “declined”
  try {
    const request = await BookRequest.findByPk(reqId, {
      include: ['book']
    });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    // Check if current user is the owner of that book
    if (request.book.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    request.status = status;
    await request.save();

    // If accepted, mark book as not available
    if (status === 'accepted') {
      request.book.isAvailable = false;
      await request.book.save();
    }

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createRequest,
  getSentRequests,
  getReceivedRequests,
  updateRequest
};
