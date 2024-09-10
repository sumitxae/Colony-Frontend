import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { toast } from "react-toastify";
import { fetchAllColonies, getAlldecisions } from "./colonyActions";

export const register = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue, dispatch }) => {
    const { username, email, password, image } = Object.fromEntries(
      formData.entries()
    );
    try {
      const { data } = await axios.post(
        "/user/register",
        {
          username,
          email,
          password,
          image,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(fetchAllColonies(data.user.colonies));
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        "/user/login",
        { username, password },
        { withCredentials: true }
      );
      dispatch(fetchAllColonies(data.user.colonies));
      return data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const updateUser = createAsyncThunk("auth/updateUser", async (id) => {
  try {
    const { data } = await axios.post(`/user/getUpdatedUser`);
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export { logOut } from "../reducers/authSlice";
