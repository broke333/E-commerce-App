import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { createSelector } from '@reduxjs/toolkit';
import * as Yup from 'yup';


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
  
    const validationSchema= Yup.object({
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
    }); 
  

  return (
    <div className="auth-page">
      <Formik 
      initialValues={{
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,        
      }}        
      validationSchema={validationSchema}
      onSubmit={async(values, { setSubmitting, setStatus }) => {
      try {
         await dispatch(signup({ username: values.username, email: values.email, password: values.password }));
        navigate('/profile');
      } catch (err) {
        setStatus(err.message || 'An error occurred during signup.');
      } finally {
        setSubmitting(false);
      }
     }}
      >
      {({ errors, touched, isSubmitting, status }) => (

      <Form className="max-w-sm mx-auto">
      <h2 className="text-lg font-bold text-center mb-5">Create an Account</h2>
      <div className="mb-5">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
        <Field
          id="username"
          name="username"
          type="text"
          // values={values.email}
          placeholder="Choose a username"
          className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light ${
            touched.username && errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          
        />
        <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      {/* Email Field */}
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light ${
            touched.email && errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      {/* Password Field */}
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
        <Field
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light ${
            touched.password && errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1"/>
      </div>

      {/* Confirm Password Field */}
      <div className="mb-5">
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
        <Field
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light ${
            touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
<ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <Field
            id="termsAccepted"
            name="termsAccepted"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label htmlFor="termsAccepted" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          I agree to the{' '}
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-500">
            Terms and Conditions
          </a>
        </label>
        <ErrorMessage name="termsAccepted" component="div" className="text-red-500 text-xs mt-1"/>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </button>

      <p className="text-center mt-4 text-sm text-gray-900 dark:text-gray-300">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
      </p>
      </Form>
      )}          
    </Formik>
    </div>
  );
}; 

export default SignupPage;