import { createSlice } from "@reduxjs/toolkit";
import { storageConstants } from "../config/config";

const initialState = {
  sessionStatus: 0,
  authToken: "",
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    activate: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.sessionStatus = 1;
    },
    deactivate: (state) => {
      state.sessionStatus = 2;
    },
    setToken: (state, action) => {
      localStorage.setItem(storageConstants.token, action.payload);
      state.authToken = action.payload;
    },
    removeToken: (state) => {
      localStorage.removeItem(storageConstants.token);
      state.authToken = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { activate, deactivate, setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
