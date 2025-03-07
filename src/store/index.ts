import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";

const store = configureStore({
  reducer: {
    navbar: navbarReducer, // Add other slices here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
