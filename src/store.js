import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice';        
import authReducer from './features/auth/authSlice';

const loadState = () => {
   try{
    const serializedState = localStorage.getItem('ecommerceState');
    if(serializedState === null) {
        return undefined;
    }
    return JSON.parse(serializedState);
   }
   catch(err){
    console.error("Could not load state from localStorage", err);
    return undefined;
   }
};

const saveState= (state) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('ecommerceState', serializedState);
    }
    catch(err){}
};

export const store = configureStore({
    reducer: {
        products:productsReducer,
        cart:cartReducer,
        auth:authReducer
    },
    preloadedState: loadState(),
});

store.subscribe(() => {
    const state = store.getState();
    saveState({
        products: state.products,
        cart: state.cart,
        auth: state.auth,
    });
});
