import { configureStore } from "@reduxjs/toolkit";

import citationReducer from "./features/citationSlice";
import favoriteReducer from "./features/favoriteSlice";

export const store = configureStore({
  reducer: {
    citation: citationReducer,
    favorite: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
