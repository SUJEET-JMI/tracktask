import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/authcontext.jsx';

const Home = () => {
  const { logout, user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get('/books').then(resp => {
      setBooks(resp.data);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  const handleRequest = async (bookId) => {
    try {
      await API.post('/requests', { bookId });
      alert('Request sent!');
    } catch (err) {
      console.error(err);
      alert('Error sending request');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600"> BookSwap Marketplace</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.username}!</span>
              <Link to="/my-books" className="text-indigo-600 hover:text-indigo-800 font-medium">My Books</Link>
              <Link to="/requests" className="text-indigo-600 hover:text-indigo-800 font-medium">Requests</Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>How it works:</strong> Browse available books from other users. Click "Request Book" to send a request. The book owner will review your request and can accept or decline it.
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(b => (
              <div key={b.id} className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                {b.imageUrl && <img src={b.imageUrl} alt={b.title} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <Link to={`/book/${b.id}`} className="text-xl font-semibold text-indigo-600 hover:text-indigo-800 mb-2 block">
                    {b.title}
                  </Link>
                  <p className="text-gray-600 mb-2">by {b.author}</p>
                  <p className="text-sm text-gray-500 mb-4">Condition: {b.condition}</p>
                  <button
                    onClick={() => handleRequest(b.id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Request Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
