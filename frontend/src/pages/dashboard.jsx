import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/authcontext.jsx';

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending', tags: '', dueDate: '', assignedTo: '' });
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  useEffect(() => {
    fetchTasks();
    if (user?.role === 'admin') {
      fetchEmployees();
    }
  }, [statusFilter, tagFilter, user]);

  const fetchTasks = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (tagFilter) params.tags = tagFilter;
      const resp = await API.get('/api/tasks', { params });
      setTasks(resp.data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const resp = await API.get('/api/auth/users');
      setEmployees(resp.data.filter(u => u.role === 'employee'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/tasks', newTask);
      setNewTask({ title: '', description: '', status: 'Pending', tags: '', dueDate: '', assignedTo: '' });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/auth/register', newEmployee);
      setNewEmployee({ name: '', email: '', password: '', role: 'employee' });
      setShowEmployeeForm(false);
      fetchEmployees();
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
              <h1 className="text-2xl font-bold text-indigo-600">Task Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}!</span>
              {user?.role === 'employee' && <Link to="/my-tasks" className="text-indigo-600 hover:text-indigo-800 font-medium">My Tasks</Link>}
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {user?.role === 'admin' && (
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <button onClick={() => setShowForm(!showForm)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium">Add Task</button>
                <button onClick={() => setShowEmployeeForm(!showEmployeeForm)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium">Add Employee</button>
              </div>
              {showForm && (
                <form onSubmit={handleCreateTask} className="bg-white p-6 rounded-lg shadow-md mb-4">
                  <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-md" required />
                    <input type="text" placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-md" />
                    <select value={newTask.status} onChange={(e) => setNewTask({...newTask, status: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-md">
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <input type="text" placeholder="Tags" value={newTask.tags} onChange={(e) => setNewTask({...newTask, tags: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-md" />
                    <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-md" />
                    <select value={newTask.assignedTo} onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-md" required>
                      <option value="">Assign to Employee</option>
                      {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium">Create Task</button>
                </form>
              )}
              {showEmployeeForm && (
                <form onSubmit={handleCreateEmployee} className="bg-white p-6 rounded-lg shadow-md mb-4">
                  <h3 className="text-lg font-semibold mb-4">Add New Employee</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" value={newEmployee.name} onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-md" required />
                    <input type="email" placeholder="Email" value={newEmployee.email} onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-md" required />
                    <input type="password" placeholder="Password" value={newEmployee.password} onChange={(e) => setNewEmployee({...newEmployee, password: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-md" required />
                    <select value={newEmployee.role} onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-md">
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium">Add Employee</button>
                </form>
              )}
            </div>
          )}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Manage Your Tasks:</strong> View and filter your tasks by status or tags. Click on a task to view details.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{user?.role === 'admin' ? 'All Tasks' : 'My Tasks'}</h2>
            <div className="flex space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="text"
                placeholder="Filter by tags"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
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
                  {t.dueDate && <p className="text-sm text-gray-500">Due: {new Date(t.dueDate).toLocaleDateString()}</p>}
                  {user?.role === 'admin' && t.assignee && <p className="text-sm text-gray-500">Assigned to: {t.assignee.name}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
