import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: userType = {
  nickname: undefined,
  profile_img: undefined,
  isLogined: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserAction: (
      state: userType,
      action: PayloadAction<{ isLogined:boolean,nickname: string; profile_img: string }>,
    ) => {
      const { isLogined,nickname,profile_img } = action.payload;
      state.isLogined = isLogined;
      state.nickname = nickname;
      state.profile_img = profile_img;
    },
    resetUserAction: (state: userType) => {
      state.isLogined = false;
      state.nickname = undefined;
      state.profile_img = undefined;
    },
  },
});

export const { saveUserAction, resetUserAction } = userSlice.actions;
export default userSlice.reducer;
