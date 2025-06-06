import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../features/auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Profile from '../components/Profile.jsx';

const ProfilePage = () => {
  const dispatch = useDispatch(); // Hook 1
  const navigate = useNavigate(); // Hook 2
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth || {}); // Hook 3
  const state = useSelector((state) => state); // Hook 4
  const [isLoading, setIsLoading] = useState(true); // Hook 5

  useEffect(() => { // Hook 6
    console.log('ProfilePage useEffect - State:', { isAuthenticated, currentUser });
    if (!isAuthenticated || !currentUser) {
      console.log('User not authenticated, redirecting to /login');
      navigate('/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Move all useFormik calls before early returns
  const profileFormik = useFormik({ // Hook 7
    initialValues: {
      username: currentUser?.username || '',
      email: currentUser?.email || '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      console.log('Profile Form Submit - currentUser:', currentUser);
      try {
        const emailExists = state.auth.users.some(
          (user) =>
            user.email.toLowerCase() === values.email.toLowerCase() &&
            user.id !== currentUser?.id
        );
        if (emailExists) {
          throw new Error('Email is already in use by another account.');
        }
        dispatch(
          updateProfile({ username: values.username, email: values.email })
        );
        toast.success('Profile updated successfully!');
      } catch (err) {
        setStatus(err.message || 'Failed to update profile.');
        toast.error(err.message || 'Failed to update profile.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const addressFormik = useFormik({ // Hook 8
    initialValues: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    validationSchema: Yup.object({
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      postalCode: Yup.string().required('Postal code is required'),
      country: Yup.string().required('Country is required'),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log('Address Form Submit - currentUser:', currentUser);
      try {
        if (!currentUser) {
          throw new Error('User is undefined. Please log in again.');
        }
        const updatedAddresses = [...(currentUser.addresses || []), values];
        dispatch(updateProfile({ addresses: updatedAddresses }));
        toast.success('Address added successfully!');
        resetForm();
      } catch (err) {
        toast.error(err.message || 'Failed to add address.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const paymentFormik = useFormik({ // Hook 9
    initialValues: {
      cardType: '',
      lastFour: '',
      expiry: '',
    },
    validationSchema: Yup.object({
      cardType: Yup.string().required('Card type is required'),
      lastFour: Yup.string()
        .matches(/^\d{4}$/, 'Must be exactly 4 digits')
        .required('Last 4 digits are required'),
      expiry: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Must be MM/YY format')
        .required('Expiry date is required'),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log('Payment Form Submit - currentUser:', currentUser);
      try {
        if (!currentUser) {
          throw new Error('User is undefined. Please log in again.');
        }
        const updatedPaymentMethods = [
          ...(currentUser.paymentMethods || []),
          values,
        ];
        dispatch(updateProfile({ paymentMethods: updatedPaymentMethods }));
        toast.success('Payment method added successfully!');
        resetForm();
      } catch (err) {
        toast.error(err.message || 'Failed to add payment method.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Now perform early returns after all hooks are called
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  console.log('Rendering ProfilePage content for user:', currentUser.username);

  const handleDeleteAddress = (index) => {
    console.log('Delete Address - currentUser:', currentUser);
    if (!currentUser) {
      toast.error('User is undefined. Please log in again.');
      navigate('/login');
      return;
    }
    const updatedAddresses = currentUser.addresses.filter((_, i) => i !== index);
    dispatch(updateProfile({ addresses: updatedAddresses }));
    toast.success('Address deleted successfully!');
  };

  const handleDeletePayment = (index) => {
    console.log('Delete Payment - currentUser:', currentUser);
    if (!currentUser) {
      toast.error('User is undefined. Please log in again.');
      navigate('/login');
      return;
    }
    const updatedPaymentMethods = currentUser.paymentMethods.filter(
      (_, i) => i !== index
    );
    dispatch(updateProfile({ paymentMethods: updatedPaymentMethods }));
    toast.success('Payment method deleted successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
      <Profile formik={profileFormik} currentUser={currentUser} />

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
        {(currentUser.orderHistory || []).length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {(currentUser.orderHistory || []).map((order, index) => (
              <li
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Order #{order.id}</span>
                  <span className="text-gray-600">{order.date}</span>
                </div>
                <ul className="space-y-2">
                  {(order.items || []).map((item, i) => (
                    <li key={i} className="flex justify-between text-gray-600">
                      <span>{item.name}</span>
                      <span>${item.price} x {item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 pt-2 border-t text-right">
                  <span className="font-semibold text-blue-600">
                    Total: ${order.total}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saved Addresses</h2>
        {(currentUser.addresses || []).length === 0 ? (
          <p className="text-gray-500">No saved addresses.</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {(currentUser.addresses || []).map((address, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-gray-700">
                  {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}
                </span>
                <button
                  onClick={() => handleDeleteAddress(index)}
                  className="px-3 py-1 text-red-600 hover:text-red-800 transition-colors rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Address</h3>
        <form onSubmit={addressFormik.handleSubmit} className="space-y-4">
          {addressFormik.status && (
            <p className="text-red-500 text-center">{addressFormik.status}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Street:
              </label>
              <input
                id="street"
                type="text"
                name="street"
                value={addressFormik.values.street}
                onChange={addressFormik.handleChange}
                onBlur={addressFormik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  addressFormik.touched.street && addressFormik.errors.street
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Enter street"
              />
              {addressFormik.touched.street && addressFormik.errors.street && (
                <p className="text-red-500 text-xs">{addressFormik.errors.street}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                City:
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={addressFormik.values.city}
                onChange={addressFormik.handleChange}
                onBlur={addressFormik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  addressFormik.touched.city && addressFormik.errors.city
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Enter city"
              />
              {addressFormik.touched.city && addressFormik.errors.city && (
                <p className="text-red-500 text-xs">{addressFormik.errors.city}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                State:
              </label>
              <input
                id="state"
                type="text"
                name="state"
                value={addressFormik.values.state}
                onChange={addressFormik.handleChange}
                onBlur={addressFormik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  addressFormik.touched.state && addressFormik.errors.state
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Enter state"
              />
              {addressFormik.touched.state && addressFormik.errors.state && (
                <p className="text-red-500 text-xs">{addressFormik.errors.state}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Postal Code:
              </label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                value={addressFormik.values.postalCode}
                onChange={addressFormik.handleChange}
                onBlur={addressFormik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  addressFormik.touched.postalCode && addressFormik.errors.postalCode
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Enter postal code"
              />
              {addressFormik.touched.postalCode && addressFormik.errors.postalCode && (
                <p className="text-red-500 text-xs">{addressFormik.errors.postalCode}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country:
              </label>
              <input
                id="country"
                type="text"
                name="country"
                value={addressFormik.values.country}
                onChange={addressFormik.handleChange}
                onBlur={addressFormik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  addressFormik.touched.country && addressFormik.errors.country
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Enter country"
              />
              {addressFormik.touched.country && addressFormik.errors.country && (
                <p className="text-red-500 text-xs">{addressFormik.errors.country}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              addressFormik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={addressFormik.isSubmitting}
          >
            {addressFormik.isSubmitting ? 'Adding...' : 'Add Address'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
        {(currentUser.paymentMethods || []).length === 0 ? (
          <p className="text-gray-500">No saved payment methods.</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {(currentUser.paymentMethods || []).map((payment, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-gray-700">
                  {payment.cardType} - Ending in {payment.lastFour} - Expires {payment.expiry}
                </span>
                <button
                  onClick={() => handleDeletePayment(index)}
                  className="px-3 py-1 text-red-600 hover:text-red-800 transition-colors rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Payment Method</h3>
        <form onSubmit={paymentFormik.handleSubmit} className="space-y-4">
          {paymentFormik.status && (
            <p className="text-red-500 text-center">{paymentFormik.status}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="cardType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Card Type:
              </label>
              <input
                id="cardType"
                type="text"
                name="cardType"
                value={paymentFormik.values.cardType}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  paymentFormik.touched.cardType && paymentFormik.errors.cardType
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="e.g., Visa, MasterCard"
              />
              {paymentFormik.touched.cardType && paymentFormik.errors.cardType && (
                <p className="text-red-500 text-xs">{paymentFormik.errors.cardType}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="lastFour" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last 4 Digits:
              </label>
              <input
                id="lastFour"
                type="text"
                name="lastFour"
                value={paymentFormik.values.lastFour}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  paymentFormik.touched.lastFour && paymentFormik.errors.lastFour
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Last 4 digits"
              />
              {paymentFormik.touched.lastFour && paymentFormik.errors.lastFour && (
                <p className="text-red-500 text-xs">{paymentFormik.errors.lastFour}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Expiry Date:
              </label>
              <input
                id="expiry"
                type="text"
                name="expiry"
                value={paymentFormik.values.expiry}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  paymentFormik.touched.expiry && paymentFormik.errors.expiry
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="MM/YY"
              />
              {paymentFormik.touched.expiry && paymentFormik.errors.expiry && (
                <p className="text-red-500 text-xs">{paymentFormik.errors.expiry}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              paymentFormik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={paymentFormik.isSubmitting}
          >
            {paymentFormik.isSubmitting ? 'Adding...' : 'Add Payment Method'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;