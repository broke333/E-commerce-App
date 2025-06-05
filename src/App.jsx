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
import { UserCircleIcon as UserCircleSolidIcon } from '@heroicons/react/24/solid'; // Logged-in
import { UserCircleIcon as UserCircleOutlineIcon } from '@heroicons/react/24/outline'; // Logged-out

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
      <nav className="navbar flex justify-between items-center p-4 bg-gray-800 text-white pl-[23%]">
        <Link to="/" className="text-lg font-semibold hover:text-blue-300">Home</Link>
        <Link to="/cart" className="text-lg font-semibold hover:text-blue-300">Cart</Link>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-lg font-semibold hover:text-blue-300 focus:outline-none"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-lg font-semibold hover:text-blue-300">Login</Link>
            <Link to="/signup" className="text-lg font-semibold hover:text-blue-300">Signup</Link>
          </>
        )}
        <Link to="/profile" className="text-lg font-semibold hover:text-blue-300" title="Profile">
          {isAuthenticated ? (
            <UserCircleSolidIcon className="h-8 w-8" />
          ) : (
            <UserCircleOutlineIcon className="h-8 w-8" />
          )}
        </Link>
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

// const App = () => {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// };

export default App;