import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsAPI } from "../../api/product.api";

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
    allProducts: [],
    list: [],
    loading: false,
  },
  reducers: {
    clearProductsList: (state) => {
      state.list = [];
      state.allProducts = [];
    },
    filterProduct: (state, action) => {
      const keyword = String(action.payload || "")
        .toLowerCase()
        .trim();
      if (!keyword) {
        state.list = state.allProducts;
      } else {
        const filtered = state.allProducts.filter((item) =>
          item.name.toLowerCase().includes(keyword)
        );
        state.list = filtered;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export const { clearProductsList, filterProduct } = productSlice.actions;
export default productSlice.reducer;
