import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';



const ProductCard = ({ product })=>{
    const dispatch = useDispatch();

    const handleAddToCart = () => {
      try {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success(`${product.title} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };  

    return (
        <div className="p-6 flex flex-col justify-between h-full">
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
    
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Author:</span> {product.author}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Description:</span> {product.description}
      </p>
      <p className="text-lg font-bold text-blue-600">
        ${product.price.toFixed(2)}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Rating:</span> {product.rating} / 5
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Genre:</span> {product.genre}
      </p>
    </div>
  </div>

  <div className="flex justify-center w-full mt-4">
    <button 
      onClick={handleAddToCart}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
    >
      Add to Cart
    </button>
  </div>
</div>
    )
}

export default ProductCard;