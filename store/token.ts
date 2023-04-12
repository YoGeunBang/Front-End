import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: userType = {
  token: undefined,
  nickname: undefined,
  profile_img: undefined,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveTokenAction: (
      state: userType,
      action: PayloadAction<{ token: string; nickname: string; profile_img: string }>,
    ) => {
      const { token,nickname,profile_img } = action.payload;
      state.token = token;
      state.nickname = nickname;
      state.profile_img = profile_img;
    },
    deleteTokenAction: (state: userType) => {
      state.token = undefined;
      state.nickname = undefined;
      state.profile_img = undefined;
    },
  },
});

export const { saveTokenAction, deleteTokenAction } = tokenSlice.actions;
export default tokenSlice.reducer;
