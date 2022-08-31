import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  uid: "",
  accessToken: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload.email;
      state.accessToken = payload.accessToken;
      state.uid = payload.uid;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;