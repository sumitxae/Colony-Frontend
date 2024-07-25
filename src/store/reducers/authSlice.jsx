import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "../actions/authAction";
import { fetchAllColonies } from "./colonySlice";

const initialState = {
  token: null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.clear();
      window.location.href = "/";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        console.log(state.user.colonies)
        fetchAllColonies(state.user.colonies)
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        fetchAllColonies(state.user.colonies)
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

export const { logOut, updateUser } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export const selectUser = (state) => state.auth.user;
