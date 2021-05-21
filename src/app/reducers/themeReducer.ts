import { createSlice } from '@reduxjs/toolkit';
import THEMES from '../constants/Themes';
import { themeType } from '../constants/Types';

type ifState = {
    theme: themeType,
}

const initialState = THEMES.DARK_NIGHTS;

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        change: (state, action) => {
            let newTheme = action.payload;
            console.log('before - ' + state.key);
            state = newTheme;
            console.log('after - ' + state.key);
            return state;
        }
    }
});

export const { change } = themeSlice.actions;
export const getTheme = (state: ifState) => state.theme;
export default themeSlice.reducer;