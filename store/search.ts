import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface keywordTypes {
  keyword: string | undefined;
}

const initialState: keywordTypes = {
  keyword: undefined,
};

const searchSlice = createSlice({
  name: 'search', 
  initialState,
  reducers: {
    changeSearchAction: (state: keywordTypes, action: PayloadAction<{ keyword: string }>) => {
      const { keyword } = action.payload;
      state.keyword = keyword;
    },
    resetAction: (state: keywordTypes) => {
      state.keyword = undefined;
    },
  },
});

export const { changeSearchAction } = searchSlice.actions;
export default searchSlice.reducer;
