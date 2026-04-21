import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActiveProjectState = {
  projectId: string | null;
  projectName: string | null;
};

const initialState: ActiveProjectState = {
  projectId: null,
  projectName: null,
};

const activeProjectSlice = createSlice({
  name: "activeSlice",
  initialState,
  reducers: {
    setActiveProject: (
      state,
      action: PayloadAction<{ projectId: string; projectName: string }>,
    ) => {
      state.projectId = action.payload.projectId;
      state.projectName = action.payload.projectName;
    },
    clearActiveProject: () => initialState,
  },
});

export const { setActiveProject, clearActiveProject } =
  activeProjectSlice.actions;

export default activeProjectSlice.reducer;
