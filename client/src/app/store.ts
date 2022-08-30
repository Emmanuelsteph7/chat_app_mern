import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ChatReducer, GetUsersReducer, UserSliceReducer } from './features';

export const store = configureStore({
  reducer: {
    user: UserSliceReducer,
    users: GetUsersReducer,
    chat: ChatReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
