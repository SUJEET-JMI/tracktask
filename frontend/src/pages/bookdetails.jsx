import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import AuthContext from '../contexts/authcontext.jsx';

const BookDetails = () => {
  const { id } = useParams();
  const { logout, user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const resp = await API.get(`/books/${id}`);
      setBook(resp.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async () => {
    try {
      await API.post('/requests', { bookId: id });
      alert('Request sent!');
    } catch (err) {
      console.error(err);
      alert('Error sending request');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800">Go back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600"> BookSwap Marketplace</Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.username}!</span>
              <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">Home</Link>
              <Link to="/my-books" className="text-indigo-600 hover:text-indigo-800 font-medium">My Books</Link>
              <Link to="/requests" className="text-indigo-600 hover:text-indigo-800 font-medium">Requests</Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                {book.imageUrl ? (
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={book.imageUrl}
                    alt={book.title}
                  />
                ) : (
                  <div className="h-48 w-full md:w-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                  Book Details
                </div>
                <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
                  {book.title}
                </h1>
                <p className="mt-2 text-gray-500">by {book.author}</p>
                <div className="mt-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    Condition: {book.condition}
                  </span>
                </div>
                <div className="mt-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                    book.isAvailable
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}>
                    {book.isAvailable ? 'Available' : 'Not Available'}
                  </span>
                </div>
                {book.isAvailable && (
                  <div className="mt-6">
                    <button
                      onClick={handleRequest}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    >
                      Request Book
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
