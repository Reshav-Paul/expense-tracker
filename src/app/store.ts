import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/themeReducer';
import stateReducer from './reducers/stateReducer';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        state: stateReducer,
    },
});