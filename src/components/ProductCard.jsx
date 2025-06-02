import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';



const ProductCard = ({ product })=>{
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        
        dispatch(addToCart({ ...product, quantity: 1}));
        // toast("hello")
        // toast.success(`${product.title} added to cart!`);
// toast.success(`${product.title} added to cart!`);         // Optionally, you can log the product or perform other actions
         // For example, you might want to update a cart state or notify the user
         //
        console.log("Product added to cart:", product);
    };  

    return (
        <div className="product-card">
          <h3>{product.title}</h3>
          <p><strong>Author:</strong> {product.author}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
          <p><strong>Genre:</strong> {product.genre}</p>
          <button onClick={(handleAddToCart)}>Add to Cart</button>
        </div>
    )
}

export default ProductCard;