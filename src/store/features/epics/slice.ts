import { getEpicDetailAction } from "@/shared/lib/actions/get-epic-details.ction";
import { getEpicsAction } from "@/shared/lib/actions/get-epics.action";
import { Epic } from "@/shared/lib/types/epic";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type EpicsState = {
  epics: Epic[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  loading: boolean;
  error: string | null;
  selectedEpic: Epic | null;
  detailLoading: boolean;
  detailError: string | null;
  searchTerm: string;
};

const initialState: EpicsState = {
  epics: [],
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  loading: false,
  error: null,
  selectedEpic: null,
  detailLoading: false,
  detailError: null,
  searchTerm: "",
};

export const fetchEpics = createAsyncThunk(
  "epics/fetchEpics",
  async (
    {
      projectId,
      page = 1,
      searchTerm = "",
    }: { projectId: string; page: number; searchTerm?: string },
    { rejectWithValue },
  ) => {
    const result = await getEpicsAction(projectId, page, searchTerm);
    if (!result.success) return rejectWithValue(result);

    return result;
  },
);

export const fetchEpicDetails = createAsyncThunk(
  "epics/fetchEpicDetail",
  async (
    { projectId, epicId }: { projectId: string; epicId: string },
    { rejectWithValue },
  ) => {
    const result = await getEpicDetailAction(projectId, epicId);
    if (!result.success) return rejectWithValue(result);
    return result.data;
  },
);

const epicsSlice = createSlice({
  name: "epics",
  initialState,
  reducers: {
    clearSelectedEpic: (state) => {
      state.selectedEpic = null;
      state.detailError = null;
    },
    setEpicsSearch: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
  },
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

    // Fetch Fetch Epic Details
    builder
      .addCase(fetchEpicDetails.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
        state.selectedEpic = null;
      })
      .addCase(fetchEpicDetails.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedEpic = action.payload;
      })
      .addCase(fetchEpicDetails.rejected, (state, action) => {
        state.detailLoading = false;
        const payload = action.payload as { error: string } | undefined;
        state.detailError = payload?.error ?? "Failed to load epic details.";
      });
  },
});

export const { clearSelectedEpic, setEpicsSearch } = epicsSlice.actions;
export default epicsSlice.reducer;
