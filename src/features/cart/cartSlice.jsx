import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice ({
    name: 'cart',
    initialState: {
        items: [],
        // totalQuantity: 0,
        // totalPrice: 0,
    },
    reducers: {
        addtoCart: (state, action)=>{
            const existingItem = state.items.find(items => items.id===action.payload.id);
            if(existingItem){
                existingItem.quantity +=1;
            }
            else{
                state.items.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    price: action.payload.price,
                    quantity: action.payload.quantity || 1,
                });
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity} = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        removeItem: (state, action) =>{
            const {id} = action.payload;
            state.items = state.items.filter(item => item.id !== id);
    },
    },
});

export const { addtoCart, updateQuantity, removeItem} = cartSlice.actions;
export default cartSlice.reducer;