import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage

const initialState = {
  walletIdFromParams: "",
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletIdFromParams: (state, action) => {
      state.walletIdFromParams = action.payload;
    },
    resetWallet: (state) => {
      state.walletIdFromParams = "";
    },
  },
});

export const { setWalletIdFromParams, resetWallet } = walletSlice.actions;
export default walletSlice.reducer;
