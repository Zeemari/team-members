import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";

import user from "./slices/user";

export const store = configureStore({
  reducer: { user },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
