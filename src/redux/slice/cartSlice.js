import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartAPI, updateCartItem } from "../../services/cartService";
import { toast } from "react-toastify";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      return await getCartAPI(userId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateQuantityThunk = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      return await updateCartItem(id, quantity);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], loading: false },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity < item.product.quantity) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (quantity < 0) item.quantity = 0;
        else if (quantity > item.product.quantity) {
          item.quantity = item.product.quantity;
        } else {
          item.quantity = quantity;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = true;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        const item = state.items.find((i) => i.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
          toast.success("Updated cart successfully!");
        }
      })
      .addCase(updateQuantityThunk.rejected, (state, action) => {
        toast.error("Updated cart failed!");
      });
  },
});

export const { clearCart, increaseQuantity, decreaseQuantity, setQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
