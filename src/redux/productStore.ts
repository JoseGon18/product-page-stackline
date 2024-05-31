import {configureStore} from "@reduxjs/toolkit";
import productReducer from './productSlice'

export const productStore = configureStore({
    reducer: {
        products: productReducer,
    },
});

export default productStore;
export type RootState = ReturnType<typeof productStore.getState>;
export type AppDispatch = typeof productStore.dispatch;