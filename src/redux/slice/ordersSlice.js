import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrdersAPI } from "../../services/orderService";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId, { rejectWithValue }) => {
    try {
      return await getOrdersAPI(userId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { ordersItems: [], loading: false, error: false },
  reducers: {
    clearOrders: (state) => {
      state.ordersItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.ordersItems = action.payload;
      state.loading = true;
    });
  },
});

export default ordersSlice.reducer;
