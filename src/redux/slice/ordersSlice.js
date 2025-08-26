import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrdersAPI } from "../../api/order.api";

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
  initialState: { ordersItems: [], loading: true },
  reducers: {
    clearOrders: (state) => {
      state.ordersItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.ordersItems = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default ordersSlice.reducer;
