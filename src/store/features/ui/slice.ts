import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  taskModal: {
    open: boolean;
    taskId: string | null;
    projectId: string | null;
  };
};

const initialState: UIState = {
  taskModal: {
    open: false,
    taskId: null,
    projectId: null,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openTaskModal: (
      state,
      action: PayloadAction<{ taskId: string; projectId: string }>,
    ) => {
      state.taskModal.open = true;
      state.taskModal.taskId = action.payload.taskId;
      state.taskModal.projectId = action.payload.projectId;
    },
    closeTaskModal: (state) => {
      state.taskModal = initialState.taskModal;
    },
  },
});

export const { openTaskModal, closeTaskModal } = uiSlice.actions;
export default uiSlice.reducer;
