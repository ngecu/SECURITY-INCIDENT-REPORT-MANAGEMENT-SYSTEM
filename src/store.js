import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './features/userApi';
import { setupListeners } from "@reduxjs/toolkit/query";
import { incidentApi } from './features/incidentApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [incidentApi.reducerPath]: incidentApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      incidentApi.middleware
    ),
});

setupListeners(store.dispatch);