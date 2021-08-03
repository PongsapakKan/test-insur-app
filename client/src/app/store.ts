import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calculateSumAssureReducer from '../features/calculateForm/calculateSumAssuredReducer';

export const store = configureStore({
  reducer: {
    calculateAssured: calculateSumAssureReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
