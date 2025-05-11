import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import sessionReducer from "./slices/sessionSlice";
import walletReducer from "./slices/walletSlice";
import deviceReducer from "./slices/deviceSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    session: sessionReducer,
    wallet: walletReducer,
    device: deviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
