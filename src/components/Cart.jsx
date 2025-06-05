import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import { addOrderToHistory } from "../features/auth/authSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated, currentUser } = useSelector(
    (state) => state.auth || {}
  );

  // Redirect to login if not authenticated
  if (!isAuthenticated || !currentUser) {
    navigate("/login");
    return <div>Redirecting to login...</div>;
  }

  // State for selected address and payment method
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

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
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleCheckout = () => {
    // Defensive check: Ensure user is still authenticated
    if (!isAuthenticated || !currentUser) {
      console.log("Cannot checkout: User not authenticated");
      navigate("/login");
      return;
    }

    if (!selectedAddress || !selectedPayment) {
      alert("Please select an address and payment method.");
      return;
    }

    // Create order
    const order = {
      id: Date.now(), // Simple ID generation using timestamp
      date: new Date().toISOString().split("T")[0], // Current date (YYYY-MM-DD)
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalprice(),
      address: currentUser.addresses.find(
        (addr) => addr.street === selectedAddress
      ),
      paymentMethod: currentUser.paymentMethods.find(
        (pm) => pm.lastFour === selectedPayment
      ),
    };

    // Dispatch order to history
    dispatch(addOrderToHistory(order));

    // Clear the cart
    dispatch(clearCart());

    // Redirect to profile to view order history
    alert("Purchase successful! Redirecting to your profile.");
    navigate("/profile");
  };

  return (
    <div className="cart">
      <h2 className="text-2xl">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="cart-table w-full border-collapse text-left border border-gray-300  shadow-sm ">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleDecreasedQuantity(item)} className="p-1 rounded-md hover:bg-gray-100">
                          <span className="text-gray-600 font-medium">−</span>
                        </button>
                        <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                        <button onClick={() => handleIncreasedQuantity(item)} className="p-1 rounded-md hover:bg-gray-100">
                          <span className="text-gray-600 font-medium">+</span>
                        </button>
                      </div>
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Cart Total */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-900">Total: ${totalprice().toFixed(2)}</h3>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>

            {/* Select Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Select Address:</label>
              {(currentUser.addresses || []).length === 0 ? (
                <p className="text-sm text-gray-500">No saved addresses. Please add one in your profile.</p>
              ) : (
                <select
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                >
                  <option value="">-- Select an address --</option>
                  {(currentUser.addresses || []).map((address, index) => (
                    <option key={index} value={address.street}>
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.postalCode}, {address.country}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Select Payment Method */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Select Payment Method:</label>
              {(currentUser.paymentMethods || []).length === 0 ? (
                <p className="text-sm text-gray-500">No saved payment methods. Please add one in your profile.</p>
              ) : (
                <select
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"

                >
                  <option value="">-- Select a payment method --</option>
                  {(currentUser.paymentMethods || []).map((payment, index) => (
                    <option key={index} value={payment.lastFour}>
                      {payment.cardType} - Ending in {payment.lastFour} -
                      Expires {payment.expiry}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Confirm Purchase */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCheckout}
            >
              Confirm Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
