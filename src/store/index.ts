import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import sessionReducer from "./slices/sessionSlice";

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
