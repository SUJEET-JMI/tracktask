import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import AuthContext from '../contexts/authcontext.jsx';
import { Link } from 'react-router-dom';

const MyTasks = () => {
  const { logout, user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const resp = await API.get('/api/tasks');
      setTasks(resp.data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.put(`/api/tasks/${id}`, { status: newStatus });
      fetchMyTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">Task Tracker</Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}!</span>
              <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">Dashboard</Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">My Tasks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(t => (
              <div key={t.id} className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <Link to={`/task/${t.id}`} className="text-xl font-semibold text-indigo-600 hover:text-indigo-800 mb-2 block">
                    {t.title}
                  </Link>
                  <p className="text-gray-600 mb-2">{t.description}</p>
                  <p className="text-sm text-gray-500 mb-2">Status: {t.status}</p>
                  {t.tags && <p className="text-sm text-gray-500 mb-2">Tags: {t.tags}</p>}
                  {t.dueDate && <p className="text-sm text-gray-500 mb-2">Due: {new Date(t.dueDate).toLocaleDateString()}</p>}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                    <select
                      value={t.status}
                      onChange={(e) => handleStatusUpdate(t.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyTasks;
