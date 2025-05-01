import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  searchTern: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects.push(...action.payload);
    },
    filterProject: (state, action) => {
      const index = state.projects.findIndex(
        (project) => project == action.payload
      );
      if (index === -1) {
        state.projects.push(action.payload); // Add the project
      } else {
        state.projects.splice(index, 1); // Remove the project
      }
    },
  },
});

export default filterSlice.reducer;
export const { setProjects, filterProject } = filterSlice.actions;
