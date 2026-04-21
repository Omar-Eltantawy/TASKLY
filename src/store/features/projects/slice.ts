import { getProjectsAction } from "@/shared/lib/actions/get-projects.action";
import { ProjectsState } from "@/shared/lib/types/project";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProjectsState = {
  projects: [],
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (page: number, { rejectWithValue }) => {
    const result = await getProjectsAction(page);
    if (!result.success) return rejectWithValue(result);

    return result;
  },
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProjects: () => initialState,
  },
  extraReducers: (builder) => {
    // FetchProjects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as { error: string } | undefined;
        state.error = payload?.error ?? "Failed to load projects.";
      });
  },
});

export const { resetProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
