import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createSelector } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'; // Added import
import Login from '../components/Login.jsx';

// Memoized selector for auth state
const selectAuth = createSelector(
  [(state) => state.auth || {}],
  (auth) => ({
    isAuthenticated: auth.isAuthenticated || false,
  })
);

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Define Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Email is required.'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long.')
      .required('Password is required.'),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await dispatch(login(values));
        toast.success('Logged in successfully'); // Fixed typo
        navigate('/');
      } catch (err) {
        setStatus(err.message || 'An error occurred during login.');
        toast.error(err.message || 'An error occurred during login.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-page">
      <Login formik={formik} />
    </div>
  );
};

export default LoginPage;