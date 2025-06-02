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
    <div className="container">
      <h1>My Profile</h1>

      <div className="profile-info">
        <h2>Welcome, {currentUser.username || 'User'}!</h2>
        <p>Email: {currentUser.email || 'N/A'}</p>
      </div>

      <div className="profile-section">
        <h2>Order History</h2>
        {(currentUser.orderHistory || []).length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul>
            {(currentUser.orderHistory || []).map((order, index) => (
              <li key={index}>
                Order #{order.id} - Date: {order.date} - Total: ${order.total}
                <ul>
                  {(order.items || []).map((item, i) => (
                    <li key={i}>{item.name} - ${item.price} x {item.quantity}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="profile-section">
        <h2>Saved Addresses</h2>
        {(currentUser.addresses || []).length === 0 ? (
          <p>No saved addresses.</p>
        ) : (
          <ul>
            {(currentUser.addresses || []).map((address, index) => (
              <li key={index}>
                {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}
                <button onClick={() => handleDeleteAddress(index)}>Delete</button>
              </li>
            ))}
          </ul>
        )}

        <h3>Add New Address</h3>
        <form onSubmit={handleAddAddress}>
          <div className="form-group">
            <label>Street:</label>
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

      <div className="profile-section">
        <h2>Payment Methods</h2>
        {(currentUser.paymentMethods || []).length === 0 ? (
          <p>No saved payment methods.</p>
        ) : (
          <ul>
            {(currentUser.paymentMethods || []).map((payment, index) => (
              <li key={index}>
                {payment.cardType} - Ending in {payment.lastFour} - Expires {payment.expiry}
                <button onClick={() => handleDeletePayment(index)}>Delete</button>
              </li>
            ))}
          </ul>
        )}

        <h3>Add New Payment Method</h3>
        <form onSubmit={handleAddPayment}>
          <div className="form-group">
            <label>Card Type:</label>
            <input
              type="text"
              name="cardType"
              value={newPayment.cardType}
              onChange={handlePaymentChange}
              placeholder="e.g., Visa, MasterCard"
            />
          </div>
          <div className="form-group">
            <label>Last 4 Digits:</label>
            <input
              type="text"
              name="lastFour"
              value={newPayment.lastFour}
              onChange={handlePaymentChange}
              placeholder="Last 4 digits"
            />
          </div>
          <div className="form-group">
            <label>Expiry Date:</label>
            <input
              type="text"
              name="expiry"
              value={newPayment.expiry}
              onChange={handlePaymentChange}
              placeholder="MM/YY"
            />
          </div>
          <button type="submit">Add Payment Method</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;