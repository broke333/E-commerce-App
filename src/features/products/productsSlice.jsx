import { createSlice } from '@reduxjs/toolkit';
import { commonProducts } from '../../utils';

const initialState = {
    list:commonProducts,
}

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers: {
        
    },
});

export default productSlice.reducer;