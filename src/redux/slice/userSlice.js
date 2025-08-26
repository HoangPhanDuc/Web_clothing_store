import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userAth",
  initialState: null,
  reducers: {
    getUser: (state, action) => {
      if (!state) return action.payload;
      return { ...state, ...action.payload };
    },
    clearUser: () => null,
  },
});

export const { getUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
