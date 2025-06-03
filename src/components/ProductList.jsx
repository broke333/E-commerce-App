import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({ products = [] }) => { // Destructure and default to empty array
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products match your search, filter, or sort criteria.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;