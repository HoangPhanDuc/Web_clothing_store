import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productsList",
  initialState: [],
  reducers: {
    setProductsList: (state, action) => {
      return action.payload;
    },
    clearProductsList: (state) => {
      state.length = 0;
    },
  },
});

export const { setProductsList, clearProductsList } = productSlice.actions;
export default productSlice.reducer;
