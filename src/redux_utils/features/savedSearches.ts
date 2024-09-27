import { createSlice } from "@reduxjs/toolkit";

const savedSearches = createSlice({
  name: "savedSearchesSlice",
  initialState: { searches: [] },
  reducers: {
    updateSearches: (state, action) => {
      // Filter out the existing payload if it exists in the array
      state.searches = state.searches.filter(
        (search) => search !== action.payload
      );

      // Add the payload to the beginning of the array
      state.searches = [action.payload, ...state.searches];
    },
    clearSearches: (state) => {
      state.searches = [];
    },
  },
});

export const { updateSearches, clearSearches } = savedSearches.actions;

export default savedSearches.reducer;
export const selectSearches = (state: any) => state.savedSearches.searches;
