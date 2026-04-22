import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActiveProjectState = {
  projectId: string | null;
  projectName: string | null;
  projectDescription: string | null;
};

const initialState: ActiveProjectState = {
  projectId: null,
  projectName: null,
  projectDescription: null,
};

const activeProjectSlice = createSlice({
  name: "activeSlice",
  initialState,
  reducers: {
    setActiveProject: (
      state,
      action: PayloadAction<{
        projectId: string;
        projectName: string;
        projectDescription: string;
      }>,
    ) => {
      state.projectId = action.payload.projectId;
      state.projectName = action.payload.projectName;
      state.projectDescription = action.payload.projectDescription;
    },
    clearActiveProject: () => initialState,
  },
});

export const { setActiveProject, clearActiveProject } =
  activeProjectSlice.actions;

export default activeProjectSlice.reducer;
