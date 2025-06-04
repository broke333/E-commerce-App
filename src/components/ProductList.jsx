import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({ products = [] }) => {
  return (
    <div className="w-full max-w-[2000px] mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <p className='col-span-full text-center text-gray-500 text-lg py-12'>
            No products match your search, filter, or sort criteria.
          </p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
              <ProductCard key={product.id} product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;