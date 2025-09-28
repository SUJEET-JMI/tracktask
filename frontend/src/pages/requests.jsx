import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/authcontext.jsx';

const Requests = () => {
  const { logout, user } = useContext(AuthContext);
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const [sentResp, receivedResp] = await Promise.all([
        API.get('/requests/sent'),
        API.get('/requests/received')
      ]);
      setSent(sentResp.data);
      setReceived(receivedResp.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await API.put(`/requests/${id}`, { status });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  <strong>Request Management:</strong> View requests you've sent to borrow books and requests you've received for your books. Accept or decline incoming requests to manage your book sharing.
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Book Requests</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sent Requests</h3>
              {sent.length === 0 ? (
                <p className="text-gray-500">No sent requests yet.</p>
              ) : (
                <div className="space-y-4">
                  {sent.map(r => (
                    <div key={r.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{r.book?.title}</h4>
                          <p className="text-sm text-gray-600">by {r.book?.author}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(r.status)}`}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Received Requests</h3>
              {received.length === 0 ? (
                <p className="text-gray-500">No received requests yet.</p>
              ) : (
                <div className="space-y-4">
                  {received.map(r => (
                    <div key={r.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{r.book?.title}</h4>
                          <p className="text-sm text-gray-600">by {r.book?.author}</p>
                          <p className="text-sm text-gray-500">Requested by: {r.requester?.username || r.requesterId}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(r.status)}`}>
                          {r.status}
                        </span>
                      </div>
                      {r.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdate(r.id, 'accepted')}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleUpdate(r.id, 'declined')}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Requests;
