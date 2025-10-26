import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import usersReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
