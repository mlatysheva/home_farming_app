import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedTagProps {
  selectedTag: string,
}

const initialState: SelectedTagProps = {
  // selectedTag: localStorage.getItem('selectedTag') || '',
  selectedTag: '',
};

export const tagsSlice = createSlice({
  name: 'selectedTag',
  initialState,
  reducers: {
    setSelectedTag: (state, action: PayloadAction<string>) => {
      state.selectedTag = action.payload;    },
  },
});

export const { setSelectedTag } = tagsSlice.actions;

export default tagsSlice.reducer;