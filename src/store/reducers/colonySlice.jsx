import { createSlice } from "@reduxjs/toolkit";
import { fetchActiveColony, createColony } from "../actions/colonyActions";

const initialState = {
  colonies: null,
  colony: null,
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
    },
    setTeam: (state, action) => { 
      state.team = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveColony.fulfilled, (state, action) => {
        state.colony = action.payload;
        state.teams = action.payload.teams;
      })
      .addCase(fetchActiveColony.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createColony.fulfilled, (state, action) => {
         state.colonies = action.payload.user.colonies;
      })
      .addCase(createColony.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default colonySlice.reducer;

export const { fetchAllColonies, setTeam } = colonySlice.actions;


export const selectColony = (state) => state.colonyState.colony;

export const selectTeam = (state) => state.colonyState.team;  

export const selectTeams = (state) => state.colonyState.teams;  