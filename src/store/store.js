import {configureStore} from '@reduxjs/toolkit';
import allExpenses from './expenses';

function hello() {
  return 1;
}

export const store = configureStore({
  reducer: {
    expenses: allExpenses,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
