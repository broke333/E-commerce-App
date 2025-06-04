import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, updateQuantity, removeFromCart, clearCart } from '../features/cart/cartSlice';
import { addOrderToHistory } from '../features/auth/authSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth || {});

  // Redirect to login if not authenticated
  if (!isAuthenticated || !currentUser) {
    navigate('/login');
    return <div>Redirecting to login...</div>;
  }

  // State for selected address and payment method
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  const handleIncreasedQuantity = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecreasedQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const totalprice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleCheckout = () => {
    // Defensive check: Ensure user is still authenticated
    if (!isAuthenticated || !currentUser) {
      console.log('Cannot checkout: User not authenticated');
      navigate('/login');
      return;
    }

    if (!selectedAddress || !selectedPayment) {
      alert('Please select an address and payment method.');
      return;
    }

    // Create order
    const order = {
      id: Date.now(), // Simple ID generation using timestamp
      date: new Date().toISOString().split('T')[0], // Current date (YYYY-MM-DD)
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalprice(),
      address: currentUser.addresses.find((addr) => addr.street === selectedAddress),
      paymentMethod: currentUser.paymentMethods.find((pm) => pm.lastFour === selectedPayment),
    };

    // Dispatch order to history
    dispatch(addOrderToHistory(order));

    // Clear the cart
    dispatch(clearCart());

    // Redirect to profile to view order history
    alert('Purchase successful! Redirecting to your profile.');
    navigate('/profile');
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td><button onClick={() => handleDecreasedQuantity(item)}>-</button><span style={{ margin: '0 10px' }}>{item.quantity}</span><button onClick={() => handleIncreasedQuantity(item)}>+</button></td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td><button onClick={() => handleRemoveItem(item)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <h3>Total: ${totalprice().toFixed(2)}</h3>
          </div>

          {/* Checkout Form */}
          <div className="checkout-form">
            <h2>Checkout</h2>

            {/* Select Address */}
            <div className="form-group">
              <label>Select Address:</label>
              {(currentUser.addresses || []).length === 0 ? (
                <p>No saved addresses. Please add one in your profile.</p>
              ) : (
                <select
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                >
                  <option value="">-- Select an address --</option>
                  {(currentUser.addresses || []).map((address, index) => (
                    <option key={index} value={address.street}>
                      {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Select Payment Method */}
            <div className="form-group">
              <label>Select Payment Method:</label>
              {(currentUser.paymentMethods || []).length === 0 ? (
                <p>No saved payment methods. Please add one in your profile.</p>
              ) : (
                <select
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                >
                  <option value="">-- Select a payment method --</option>
                  {(currentUser.paymentMethods || []).map((payment, index) => (
                    <option key={index} value={payment.lastFour}>
                      {payment.cardType} - Ending in {payment.lastFour} - Expires {payment.expiry}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Confirm Purchase */}
            <button onClick={handleCheckout}>Confirm Purchase</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;