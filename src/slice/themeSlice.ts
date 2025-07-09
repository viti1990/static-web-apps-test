import { createSlice } from '@reduxjs/toolkit';

type themeType = 'dark' | 'light';

interface ThemeState {
  value: themeType;
}

const initialState: ThemeState = {
  value: 'dark',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: { payload: themeType }) => {
      state.value = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
