import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface detailTypes {
  detail: string | null;
}

const initialState: detailTypes = {
  detail: null,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    changeCategoryAction: (state: detailTypes, action: PayloadAction<{ detail: string }>) => {
      const { detail } = action.payload;
      state.detail = detail;
    },
    resetAction: (state: detailTypes) => {
      state.detail = null;
    },
  },
});

export const { changeCategoryAction } = detailSlice.actions;
export default detailSlice.reducer;
