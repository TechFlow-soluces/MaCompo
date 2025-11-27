import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersSlice';
import tacticsReducer from './tacticsSlice';

export const store = configureStore({
    reducer: {
        players: playersReducer,
        tactics: tacticsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
