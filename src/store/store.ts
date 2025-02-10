// src/app/store.ts
// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import frontActionReducer from './slices/frontAction.slice';

// Configure the store
const store = configureStore({
  reducer: {
    frontActions: frontActionReducer,
  },
});

// Define RootState type based on the store structure
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type for dispatching actions
export type AppDispatch = typeof store.dispatch;

export default store;
