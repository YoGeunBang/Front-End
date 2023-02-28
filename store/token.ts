import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: tokenTypes = {
  token: undefined,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveTokenAction: (state: tokenTypes, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;
    },
    deleteTokenAction: (state: tokenTypes) => {
      state.token = undefined;
    },
  },
});

export const { saveTokenAction } = tokenSlice.actions;
export default tokenSlice.reducer;
