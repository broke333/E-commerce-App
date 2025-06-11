import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createSelector } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Memoized selector for auth state
const selectAuth = createSelector([(state) => state.auth || {}], (auth) => ({
  isAuthenticated: auth.isAuthenticated || false,
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Define Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required."),
  });

  return (
    <div className="auth-page">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            await dispatch(login(values));
            toast.success("Logged in successfully");
            navigate("/");
          } catch (err) {
            setStatus(err.message || "An error occurred during login.");
            toast.error(err.message || "An error occurred during login.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting, status }) => (
          <Form className="max-w-sm mx-auto">
            <h2 className="text-lg font-bold text-center mb-5">
              Login to your Account
            </h2>

            {/* Display general form errors */}
            {/* {status && <p className="text-red-500 text-center mb-4">{status}</p>} */}

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                placeholder="name@example.com"
              />
              {/* {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />{" "}
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                placeholder="Enter your password"
              />
              {/* {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null} */}
              <ErrorMessage name="password" />{" "}
            </div>

            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <Field
                  id="remember"
                  type="checkbox"
                  name="remember"
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember Me
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-500"
                >
                  {" "}
                  Forgot Password?
                </a>
              </label>
            </div>

            <button
              type="submit"
              className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <p className="text-center mt-4 text-sm text-gray-900 dark:text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Signup here
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
