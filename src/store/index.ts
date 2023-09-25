import { configureStore } from '@reduxjs/toolkit';
import requestDemo from './C-demo/requestDemo';
import { createWrapper } from 'next-redux-wrapper';

const store = configureStore({
  reducer: {
    requestDemo: requestDemo
  }
});
const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
export type IAppDispatch = typeof store.dispatch;
export type IAppState = ReturnType<typeof store.getState>;
