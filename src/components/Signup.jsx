import React from 'react';
import { Link } from 'react-router-dom';

const Signup = ({ formData, onChange, onSubmit, error, onTermsChange }) => {
  return (
    <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
      <h2 className="text-lg font-bold text-center mb-5">Create an Account</h2>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <div className="mb-5">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          placeholder="Choose a username"
          value={formData.username}
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          placeholder="name@example.com"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          placeholder="Create a password"
          value={formData.password}
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          placeholder="Confirm your password"
          value={formData.confirmPassword || ''}
          onChange={onChange}
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            name="termsAccepted"
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            checked={formData.termsAccepted || false}
            onChange={onTermsChange}
            required
          />
        </div>
        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          I agree to the{' '}
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">Terms and Conditions</a>
        </label>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sign Up
      </button>
      <p className="text-center mt-4 text-sm text-gray-900 dark:text-gray-300">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
      </p>
    </form>
  );
};

export default Signup;