import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsAPI } from "../../services/productService";

export const fetchProducts = createAsyncThunk(
  "productsList/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProductsAPI();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "productsList",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProductsList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProductsList, clearProductsList } = productSlice.actions;
export default productSlice.reducer;
