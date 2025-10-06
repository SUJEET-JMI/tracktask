import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/authcontext.jsx';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/dashboard';
import MyTasks from './pages/mytasks';
import TaskDetails from './pages/taskdetails';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/my-tasks"
            element={
              <RequireAuth>
                <MyTasks />
              </RequireAuth>
            }
          />
          <Route
            path="/task/:id"
            element={
              <RequireAuth>
                <TaskDetails />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// A wrapper to protect private routes
import { useContext } from 'react';
import AuthContext from './contexts/authcontext.jsx';

function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
