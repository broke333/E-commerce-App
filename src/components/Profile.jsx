
import React from 'react';

const Profile = ({ formik, currentUser }) => {
  // Generate initials for avatar fallback
  const getInitials = (username) => {
    if (!username) return 'U';
    return username
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        {currentUser.profileImage ? (
          <img
            src={currentUser.profileImage}
            alt="Profile"
            className="h-12 w-12 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold mr-4">
            {getInitials(currentUser.username)}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Welcome, {currentUser.username || 'User'}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Email: {currentUser.email || 'N/A'}
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {formik.status && (
          
          <p className="text-red-500 text-center">{formik.status}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username:
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                formik.touched.username && formik.errors.username
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter username"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs">{formik.errors.username}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
