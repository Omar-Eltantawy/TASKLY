import { getEpicsAction } from "@/shared/lib/actions/get-epics.action";
import { Epic } from "@/shared/lib/types/epic";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type EpicsState = {
  epics: Epic[];
  loading: boolean;
  error: string | null;
};

const initialState: EpicsState = {
  epics: [],
  loading: false,
  error: null,
};

export const fetchEpics = createAsyncThunk(
  "epics/fetchEpics",
  async (projectId: string, { rejectWithValue }) => {
    const result = await getEpicsAction(projectId);
    if (!result.success) return rejectWithValue(result);

    return result.data;
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
        state.epics = action.payload;
      })
      .addCase(fetchEpics.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as { error: string } | undefined;
        state.error = payload?.error ?? "Failed to load epics.";
      });
  },
});
export default epicsSlice.reducer;
