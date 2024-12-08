import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "",
  code: "",
};

export const authSlice = createSlice({
  name: "client/auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { setEmail, setIsLoggedIn, setCode } = authSlice.actions;
