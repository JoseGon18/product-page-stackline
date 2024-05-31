import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SalesData {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number; // Ensure this property is correctly named and included
}

interface Product {
    id: string;
    title: string;
    image: string;
    subtitle: string;
    brand: string;
    tags: string[];
    sales: SalesData[];
}

interface ProductState {
    productData: Product | null;
}

const initialState: ProductState = {
    productData: null,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductData: (state, action: PayloadAction<Product>) => {
            state.productData = action.payload;
        }
    }
})

export const { setProductData } = productSlice.actions;
export default productSlice.reducer;