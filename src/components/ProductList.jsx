import React from 'react';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const ProductList =()=>{
    const {list} = useSelector((state)=> state.products);
    // console.log(products)        

    return (
        <div className="product-list">
            {list.map((product)=> (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;