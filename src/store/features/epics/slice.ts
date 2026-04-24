import { getEpicsAction } from "@/shared/lib/actions/get-epics.action";
import { Epic } from "@/shared/lib/types/epic";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type EpicsState = {
  epics: Epic[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  loading: boolean;
  error: string | null;
};

const initialState: EpicsState = {
  epics: [],
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  loading: false,
  error: null,
};

export const fetchEpics = createAsyncThunk(
  "epics/fetchEpics",
  async (
    { projectId, page }: { projectId: string; page: number },
    { rejectWithValue },
  ) => {
    const result = await getEpicsAction(projectId, page);
    if (!result.success) return rejectWithValue(result);

    return result;
  },
);

const epicsSlice = createSlice({
  name: "epics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpics.fulfilled, (state, action) => {
        state.loading = false;
        state.epics = action.payload.epics;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchEpics.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as { error: string } | undefined;
        state.error = payload?.error ?? "Failed to load epics.";
      });
  },
});
export default epicsSlice.reducer;
