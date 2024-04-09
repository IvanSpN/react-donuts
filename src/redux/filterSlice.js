import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,

  selectedOption: {
    name: 'популярности',
    sortProperty: 'rating',
  },

  orderSort: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },

    setOrderSort(state, action) {
      state.orderSort = action.payload;
    },

    setSelectedOption(state, action) {
      state.selectedOption = action.payload;
    },
  },
});

export const { setActiveCategory, setOrderSort, setSelectedOption } =
  filterSlice.actions;

export default filterSlice.reducer;
