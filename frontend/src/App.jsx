import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/authcontext.jsx';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/home';
import MyBooks from './pages/mybooks';
import Requests from './pages/requests';
import BookDetails from './pages/bookdetails';

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
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/my-books"
            element={
              <RequireAuth>
                <MyBooks />
              </RequireAuth>
            }
          />
          <Route
            path="/requests"
            element={
              <RequireAuth>
                <Requests />
              </RequireAuth>
            }
          />
          <Route
            path="/book/:id"
            element={
              <RequireAuth>
                <BookDetails />
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
