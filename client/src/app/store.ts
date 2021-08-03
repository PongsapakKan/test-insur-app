import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import registerReducer from '../features/register/registerReducer';

export const store = configureStore({
  reducer: {
    register: registerReducer,
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
