import React from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => (
    const navigate = useNavigate();
    const handle
  <form className="max-w-sm mx-auto">
    <h2 className="text-lg font-bold text-center mb-5">Login to Your Account</h2>
    <div className="mb-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input
        type="email"
        id="email"
        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
        placeholder="name@example.com"
        required
      />
    </div>
    <div className="mb-5">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input
        type="password"
        id="password"
        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
        placeholder="Enter your password"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Login
    </button>
    <p className="text-sm text-gray-500 mt-4 text-center">
      Don't have an account? <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
    </p>
  </form>
);

export default Login;
