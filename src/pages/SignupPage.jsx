import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { createSelector } from '@reduxjs/toolkit';
import * as Yup from 'yup';
import Signup from '../components/Signup.jsx';

// Memoized selector for auth state
const selectAuth = createSelector(
  [(state) => state.auth || {}],
  (auth) => ({
    isAuthenticated: auth.isAuthenticated || false,
  })
);

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  // Formik's form configuration
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm your password'),
      termsAccepted: Yup.boolean()
        .oneOf([true], 'You must accept the Terms and Conditions'),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      try {
        dispatch(signup({ username: values.username, email: values.email, password: values.password }));
        navigate('/profile');
      } catch (err) {
        setStatus(err.message || 'An error occurred during signup.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-page">
      <Signup formik={formik} />
    </div>
  );
};

export default SignupPage;