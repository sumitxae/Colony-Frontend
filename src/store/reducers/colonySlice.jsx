import { createSlice } from "@reduxjs/toolkit";
import {
  fetchActiveColony,
  createColony,
  getAlldecisions,
} from "../actions/colonyActions";

const initialState = {
  colonies: null,
  colony: null,
  contributor: false,
  rootUser: false,
  decisions: null,
  teams: null,
  team: null,
  error: null,
};

const colonySlice = createSlice({
  name: "colony",
  initialState,
  reducers: {
    fetchAllColonies: (state, action) => {
      state.colonies = action.payload;
      state.contributor = false;
      state.rootUser = false;
    },
    resetState: (state) => {
      state.colonies = null;
      state.colony = null;
      state.contributor = false;
      state.rootUser = false;
      state.decisions = null;
      state.teams = null;
      state.team = null;
      state.error = null;
    },
    setTeam: (state, action) => {
      state.team = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveColony.fulfilled, (state, action) => {
        state.colony = action.payload.colony;
        state.teams = action.payload.colony.teams;
        console.log(action.payload.colony);
        state.contributor = action.payload.colony.contributors.some(
          (user) => user._id === action.payload.user._id
        );
        state.rootUser = action.payload.colony.rootUsers.some(
          (user) => user._id === action.payload.user._id
        );
      })
      .addCase(fetchActiveColony.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createColony.fulfilled, (state, action) => {
        state.colonies = action.payload.user.colonies;
        state.colony = action.payload.colony;
        state.contributor = true;
        state.rootUser = true;
      })
      .addCase(createColony.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getAlldecisions.fulfilled, (state, action) => {
        state.decisions = action.payload;
      });
  },
});

export default colonySlice.reducer;

export const { fetchAllColonies, resetState, setTeam } = colonySlice.actions;

export const selectColony = (state) => state.colonyState.colony;

export const selectTeam = (state) => state.colonyState.team;

export const selectAllDecisions = (state) => state.colonyState.decisions;

export const selectTeams = (state) => state.colonyState.teams;

export const selectContributor = (state) => state.colonyState.contributor;

export const selectRootUser = (state) => state.colonyState.rootUser;
