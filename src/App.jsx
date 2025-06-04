import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import Home from './pages/home.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';


const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    
    <div className="min-h-screen bg-gray-50"> 
      <nav className="navbar flex justify-between items-center p-4 bg-gray-800 text-white">
        <Link to="/" className="text-lg font-semibold hover:text-blue-300">Home</Link>
        <Link to="/cart" className="text-lg font-semibold hover:text-blue-300">Cart</Link>
        <Link to="/profile" className="text-lg font-semibold hover:text-blue-300">Profile</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-nav-button">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />

      </Routes>
    </div>
  );
};

export default App;