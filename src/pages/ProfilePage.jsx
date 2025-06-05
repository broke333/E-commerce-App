import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../features/auth/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth || {});

  console.log('ProfilePage state:', { isAuthenticated, currentUser });

  if (!isAuthenticated || !currentUser) {
    console.log('User not authenticated, redirecting to /login');
    navigate('/login');
    return <div>Redirecting to login...</div>;
  }

  console.log('Rendering ProfilePage content for user:', currentUser.username);

  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const [newPayment, setNewPayment] = useState({
    cardType: '',
    lastFour: '',
    expiry: ''
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!isAuthenticated || !currentUser) {
      console.log('Cannot add address: User not authenticated');
      navigate('/login');
      return;
    }
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode || !newAddress.country) {
      alert('Please fill all address fields.');
      return;
    }
    const updatedAddresses = [...(currentUser.addresses || []), newAddress];
    dispatch(updateProfile({ addresses: updatedAddresses }));
    setNewAddress({ street: '', city: '', state: '', postalCode: '', country: '' });
  };

  const handleDeleteAddress = (index) => {
    if (!isAuthenticated || !currentUser) {
      console.log('Cannot delete address: User not authenticated');
      navigate('/login');
      return;
    }
    const updatedAddresses = (currentUser.addresses || []).filter((_, i) => i !== index);
    dispatch(updateProfile({ addresses: updatedAddresses }));
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!isAuthenticated || !currentUser) {
      console.log('Cannot add payment method: User not authenticated');
      navigate('/login');
      return;
    }
    if (!newPayment.cardType || !newPayment.lastFour || !newPayment.expiry) {
      alert('Please fill all payment fields.');
      return;
    }
    if (newPayment.lastFour.length !== 4 || isNaN(newPayment.lastFour)) {
      alert('Last 4 digits must be a 4-digit number.');
      return;
    }
    const updatedPaymentMethods = [...(currentUser.paymentMethods || []), newPayment];
    dispatch(updateProfile({ paymentMethods: updatedPaymentMethods }));
    setNewPayment({ cardType: '', lastFour: '', expiry: '' });
  };

  const handleDeletePayment = (index) => {
    if (!isAuthenticated || !currentUser) {
      console.log('Cannot delete payment method: User not authenticated');
      navigate('/login');
      return;
    }
    const updatedPaymentMethods = (currentUser.paymentMethods || []).filter((_, i) => i !== index);
    dispatch(updateProfile({ paymentMethods: updatedPaymentMethods }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
      
      {/* user Info Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 classname="text-2xl font-semibold text-gray-800">Welcome, {currentUser.username || 'User'}!</h2>
        <p classNmae="text-gray-600">Email: {currentUser.email || 'N/A'}</p>
      </div>

      {/* Order History Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 classNmae="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
        {(currentUser.orderHistory || []).length === 0 ? (
          <p classNmae="text-gray-500">No orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {(currentUser.orderHistory || []).map((order, index) => (
              <li key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Order #{order.id}</span>
                <span className="text-gray-600">{order.date}</span>
              </div>
                <ul className="space-y-2">
                {(order.items || []).map((item, i) => (
                  <li key={i} className="text-gray-600 flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price} x {item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 pt-2 border-t text-right">
                <span className="font-semibold text-blue-600">Total: ${order.total}</span>
              </div>
            </li>
            ))}
          </ul>
        )}
      </div>

      {/* Saved Addresses Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 classname="text-2xl font-semibold text-gray-800 mb-4">Saved Addresses</h2>
        {(currentUser.addresses || []).length === 0 ? (
          <p classname="text-gray-500">No saved addresses.</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {(currentUser.addresses || []).map((address, index) => (
              <li key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <span className="text-gray-700">
                {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}
              </span>
                <button onClick={() => handleDeleteAddress(index)} className="text-red-600 hover:text-red-800 px-4 py-2 rounded">Delete</button>
              </li>
            ))}
          </ul>
        )}

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Address</h3>
        <form onSubmit={handleAddAddress} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label >Street:</label>
            <input
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleAddressChange}
              placeholder="Enter street"
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleAddressChange}
              placeholder="Enter city"
            />
          </div>
          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleAddressChange}
              placeholder="Enter state"
            />
          </div>
          <div className="form-group">
            <label>Postal Code:</label>
            <input
              type="text"
              name="postalCode"
              value={newAddress.postalCode}
              onChange={handleAddressChange}
              placeholder="Enter postal code"
            />
          </div>
          <div className="form-group">
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={newAddress.country}
              onChange={handleAddressChange}
              placeholder="Enter country"
            />
          </div>
          <button type="submit">Add Address</button>
        </form>
      </div>
      
      {/* Payment Methods Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
  {(currentUser.paymentMethods || []).length === 0 ? (
    <p className="text-gray-500">No saved payment methods.</p>
  ) : (
    <ul className="space-y-4 mb-6">
      {(currentUser.paymentMethods || []).map((payment, index) => (
        <li key={index} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
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
  <form onSubmit={handleAddPayment} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Card Type:</label>
        <input
          type="text"
          name="cardType"
          value={newPayment.cardType}
          onChange={handlePaymentChange}
          placeholder="e.g., Visa, MasterCard"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Last 4 Digits:</label>
        <input
          type="text"
          name="lastFour"
          value={newPayment.lastFour}
          onChange={handlePaymentChange}
          placeholder="Last 4 digits"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Expiry Date:</label>
        <input
          type="text"
          name="expiry"
          value={newPayment.expiry}
          onChange={handlePaymentChange}
          placeholder="MM/YY"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
    <button 
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
    >
      Add Payment Method
    </button>
  </form>
</div>
    </div>
  );
};

export default ProfilePage;