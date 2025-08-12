import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartAPI } from "../../services/cartService";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  return await getCartAPI(userId);
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle" },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
