// import React from 'react';
// import { Link } from 'react-router-dom';

// const Signup = ({ formik }) => {
//   return (
//     <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
//       <h2 className="text-lg font-bold text-center mb-5">Create an Account</h2>

//       {/* Display global form error */}
//       {formik.status && <p className="text-red-500 text-center mb-4">{formik.status}</p>}

//       {/* Username Field */}
//       <div className="mb-5">
//         <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
//         <input
//           id="username"
//           name="username"
//           type="text"
//           placeholder="Choose a username"
//           className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light ${
//             formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//           }`}
//           value={formik.values.username}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.username && formik.errors.username && (
//           <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
//         )}
//       </div>

//       {/* Email Field */}
//       <div className="mb-5">
//         <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           placeholder="name@example.com"
//           className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light ${
//             formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//           }`}
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.email && formik.errors.email && (
//           <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
//         )}
//       </div>

//       {/* Password Field */}
//       <div className="mb-5">
//         <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
//         <input
//           id="password"
//           name="password"
//           type="password"
//           placeholder="Create a password"
//           className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light ${
//             formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//           }`}
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.password && formik.errors.password && (
//           <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
//         )}
//       </div>

//       {/* Confirm Password Field */}
//       <div className="mb-5">
//         <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
//         <input
//           id="confirmPassword"
//           name="confirmPassword"
//           type="password"
//           placeholder="Confirm your password"
//           className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light ${
//             formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//           }`}
//           value={formik.values.confirmPassword}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//           <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
//         )}
//       </div>

//       {/* Terms and Conditions */}
//       <div className="flex items-start mb-5">
//         <div className="flex items-center h-5">
//           <input
//             id="termsAccepted"
//             name="termsAccepted"
//             type="checkbox"
//             className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
//             checked={formik.values.termsAccepted}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//         </div>
//         <label htmlFor="termsAccepted" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
//           I agree to the{' '}
//           <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-500">
//             Terms and Conditions
//           </a>
//         </label>
//         {formik.touched.termsAccepted && formik.errors.termsAccepted && (
//           <p className="text-red-500 text-xs mt-1">{formik.errors.termsAccepted}</p>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-experimental: -4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
//           formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//         }`}
//         disabled={formik.isSubmitting}
//       >
//         {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
//       </button>

//       <p className="text-center mt-4 text-sm text-gray-900 dark:text-gray-300">
//         Already have an account? <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
//       </p>
//     </form>
//   );
// };

// export default Signup;