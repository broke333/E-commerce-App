import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addtoCart, removeItem, updateQuantity} from '../features/cart/cartSlice';

const Cart= () => {
   const dispatch = useDispatch();
   const cartItems = useSelector((state) => state.cart.items);

   const handleIncreasedQuantity = (item)=>{
     console.log("item",item);
     
     dispatch(updateQuantity({id:item.id, quantity:item.quantity + 1}));
    };
    
    const handleDecreasedQuantity = (item)=>{
    dispatch(updateQuantity({id:item.id, quantity:item.quantity - 1}));
   };
   
   const totalprice = ()=>{
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
   }

   const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
    
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
                        <td>{item.price.toFixed(2)}</td>
                        <td>
                          <button onClick={()=> handleDecreasedQuantity({id:item.id, quantity:item.quantity})}>-</button>
                          <span style={{ margin:'0 10px'}}>{item.quantity}</span>
                          <button onClick={()=> handleIncreasedQuantity({
                            id:item.id,
                             quantity:item.quantity})}>+</button>
                        </td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button onClick={() => dispatch(removeItem({
                            id:item.id
                            }))}>Remove</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="cart-total">
                <h3>Total: ${totalprice().toFixed(2)}</h3>
              </div>
            </>
        )}
     </div>
   );
};

export default Cart;