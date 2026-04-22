import { getProjectMembersAction } from "@/shared/lib/actions/get-project-members.action";
import { ProjectMember } from "@/shared/lib/types/project";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActiveProjectState = {
  projectId: string | null;
  projectName: string | null;
  projectDescription: string | null;
  members: ProjectMember[];
  membersLoading: boolean;
  membersError: string | null;
};

const initialState: ActiveProjectState = {
  projectId: null,
  projectName: null,
  projectDescription: null,
  members: [],
  membersLoading: false,
  membersError: null,
};

export const fetchProjectMembers = createAsyncThunk(
  "activeProject/fetchProjectMembers",
  async (projectId: string, { rejectWithValue }) => {
    const result = await getProjectMembersAction(projectId);
    if (!result.success) return rejectWithValue(result);

    return result;
  },
);

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
      state.members = [];
      state.membersError = null;
    },
    clearActiveProject: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch Project Members
    builder
      .addCase(fetchProjectMembers.pending, (state) => {
        state.membersLoading = true;
        state.membersError = null;
      })
      .addCase(fetchProjectMembers.fulfilled, (state, action) => {
        state.membersLoading = false;
        state.members = action.payload.data;
      })
      .addCase(fetchProjectMembers.rejected, (state, action) => {
        state.membersLoading = false;
        const payload = action.payload as { error: string } | undefined;
        state.membersError =
          payload?.error ?? "Failed to load project members.";
      });
  },
});

export const { setActiveProject, clearActiveProject } =
  activeProjectSlice.actions;

export default activeProjectSlice.reducer;
