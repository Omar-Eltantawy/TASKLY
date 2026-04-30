import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/slice";
import projectsReducer from "./features/projects/slice";
import activeProjectReducer from "./features/active-project/slice";
import epicsReducer from "./features/epics/slice";
import uiReducer from "./features/ui/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    activeProject: activeProjectReducer,
    epics: epicsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
