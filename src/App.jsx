import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import Home from './pages/home.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth || {});

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Generate initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <nav className="navbar flex justify-between items-center p-4 bg-gray-800 text-white ">
    <div className="flex items-center space-x-6">
    <h1 className="text-2xl font-bold text-blue-300">Book Store</h1>
    </div>
    <div className="flex items-center space-x-6">
    
        <Link to="/" className="text-lg font-semibold hover:text-blue-300">
          Home
        </Link>
        <Link to="/cart" className="text-lg font-semibold hover:text-blue-300">
          Cart
        </Link>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-lg font-semibold hover:text-blue-300 focus:outline-none"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-lg font-semibold hover:text-blue-300">
              Login
            </Link>
            <Link to="/signup" className="text-lg font-semibold hover:text-blue-300">
              Signup
            </Link>
          </>
        )}
        <Link
          to="/profile"
          className="flex items-center space-x-2 hover:text-blue-300"
          title="Profile"
          aria-label={isAuthenticated ? `Profile for ${currentUser.email}` : 'Profile'}
        >
          {isAuthenticated ? (
            <>
              {currentUser.profileImage ? (
                <img
                  src={currentUser.profileImage}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                  {getInitials(currentUser.username)}
                </div>
              )}
              <span className="text-sm font-medium">{currentUser.email}</span>
            </>
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-semibold">
              U
            </div>
          )}
        </Link>
        </div>
      
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