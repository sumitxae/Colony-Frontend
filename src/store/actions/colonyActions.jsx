import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../../axios";
import { isLoggedIn } from "../../utils/isLoggedIn";
import { updateUser } from "./authAction";

export const fetchActiveColony = createAsyncThunk(
  "colony/fetchActiveColony",
  async (id, { getState, rejectWithValue, dispatch }) => {
    if (!isLoggedIn(getState().auth.token)) {
      localStorage.clear();
      toast.error("Session expired. Please login again.");
      window.location.href = "/";
    }
    try {
      const { data } = await axios.post("/colony/getActiveColony", { id });
      dispatch(updateUser(getState().auth.user));
      dispatch(getAlldecisions(data.colony._id));
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const createColony = createAsyncThunk(
  "colony/createColony",
  async (colonyData, { getState, dispatch }) => {
    if (!isLoggedIn(getState().auth.token)) {
      localStorage.clear();
      toast.error("Session expired. Please login again.");
      window.location.href = "/";
    }
    try {
      const { data } = await axios.post(
        "/colony/create",
        {
          colonyName: colonyData.name,
          nativeToken: colonyData.token,
          nativeTokenSymbol: colonyData.symbol,
          id: getState().auth.user._id,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(updateUser(data.user._id));
      return data;
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data.message);
      throw err;
    }
  }
);

export const getAlldecisions = createAsyncThunk(
  "colony/getAllDecisions",
  async (colonyId, { getState, rejectWithValue }) => {
    if (!isLoggedIn(getState().auth.token)) {
      localStorage.clear();
      toast.error("Session expired. Please login again.");
      window.location.href = "/";
    }
    try {
      const { data } = await axios.post("/colony/getAllDecisions", {
        colonyId,
      });
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export { fetchAllColonies, resetState, setTeam } from "../reducers/colonySlice";
