import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import messagesReducer from './reducers/messagesSlice';
import tabbarReducer from './reducers/tabBarSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    messages: messagesReducer,
    tabbar: tabbarReducer,
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
