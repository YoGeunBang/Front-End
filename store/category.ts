import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface categoryTypes {
  value: number | undefined;
}

const initialState: categoryTypes = {
  value: undefined,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategoryAction: (state: categoryTypes, action: PayloadAction<{ value: number }>) => {
      const { value } = action.payload;
      state.value = value;
    },
    resetAction: (state: categoryTypes) => {
      state.value = undefined;
    },
  },
});

export const { changeCategoryAction } = categorySlice.actions;
export default categorySlice.reducer;
