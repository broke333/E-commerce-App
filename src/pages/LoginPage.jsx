import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login.jsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error: authError, isLoading } = useSelector((state) => state.auth || {});

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Fallback if Yup is not loaded correctly
  if (!Yup || typeof Yup.object !== 'function') {
    return <div>Error: Yup library failed to load. Please try refreshing the page or contact support.</div>;
  }

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
        await dispatch(login(values)).unwrap();
        // Navigation is handled by useEffect above
      } catch (err) {
        setStatus(err.message || 'An error occurred during login.');
        setSubmitting(false);
      }
    },
  });

  // Sync Redux error with Formik status
  useEffect(() => {
    if (authError) {
      formik.setStatus(authError);
    }
  }, [authError, formik]);

  return (
    <div className="auth-page">
      <Login
        formik={formik} // Pass the entire formik object
        isLoading={isLoading}
      />
    </div>
  );
};

export default LoginPage;