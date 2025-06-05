import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({ formik }) => {
  return (
    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
      <h2 className="text-lg font-bold text-center mb-5">Login to your Account</h2>

      {/* Display general form errors */}
      {formik.status && <p className="text-red-500 text-center mb-4">{formik.status}</p>}

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="name@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light ${
            formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
        )}
      </div>

      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Remember Me
          <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-500"> Forgot Password?</a>
        </label>
      </div>
      <button
        type="submit"
        className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
          formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Logging in...' : 'Login'}
      </button>
      <p className="text-center mt-4 text-sm text-gray-900 dark:text-gray-300">
        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-500">Signup here</Link>
      </p>
    </form>
  );
};

export default Login;