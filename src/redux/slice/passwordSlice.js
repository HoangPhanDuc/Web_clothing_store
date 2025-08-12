import { createSlice } from "@reduxjs/toolkit";

const showPasswordSlice = createSlice({
  name: "showPassword",
  initialState: { status: false },
  reducers: {
    togglePassword: (state) => {
      state.status = !state.status;
    },
  },
});

export const { togglePassword } = showPasswordSlice.actions;
export default showPasswordSlice.reducer;
