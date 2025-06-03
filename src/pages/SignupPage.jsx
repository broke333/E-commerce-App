import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Signup from '../components/Signup.jsx';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error: authError, isLoading } = useSelector((state) => state.auth || {});

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  // Update error from Redux state
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTermsChange = (e) => {
    setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { username, email, password, confirmPassword, termsAccepted } = formData;

    // Validation
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }

    // Dispatch signup action
    dispatch(signup({ username, email, password }))
      .unwrap()
      .then(() => {
        navigate('/profile');
      })
      .catch((err) => {
        setError(err.message || 'An error occurred during signup.');
      });
  };

  return (
    <div className="auth-page">
      <Signup
        formData={formData}
        onChange={handleChange}
        onTermsChange={handleTermsChange}
        onSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
};

export default SignupPage;