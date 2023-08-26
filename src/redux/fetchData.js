import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchDiscountProductsThunk = createAsyncThunk(
    'products/fetchDiscountProducts',
    async (params, thunkAPI) => {
        const response = await fetch(`http://localhost:3001/products?discount_gte=16`);
        const data = await response.json();
        return data;
    }
);

const fetchAllProductsThunk = createAsyncThunk(
    'products/fetchAllProducts',
    async (params, thunkAPI) => {
        const response = await fetch(`http://localhost:3001/${params}`);
        const data = await response.json();
        return data;
    }
);

const initialState = {
    discountProducts: [],
    allProducts: [],
    loading: false,
    error: null,
};

const fetchDataSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscountProductsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDiscountProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.discountProducts = action.payload;
            })
            .addCase(fetchDiscountProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllProductsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.allProducts = action.payload;
            })
            .addCase(fetchAllProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fetchDataSlice.reducer;
export { fetchDiscountProductsThunk, fetchAllProductsThunk };
