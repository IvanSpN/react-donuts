import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFilterOptions, IFilterSlice, TSelectOptions } from './types';

const initialState: IFilterSlice = {
  activeCategory: 0,

  selectedOption: {
    name: 'алфавиту',
    sortProperty: 'title',
  },

  orderSort: '',

  searchValue: '',

  currentPage: 0,
};
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },

    setOrderSort(state, action: PayloadAction<string>) {
      state.orderSort = action.payload;
    },

    setSelectedOption(state, action: PayloadAction<TSelectOptions>) {
      state.selectedOption = action.payload;
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setFilters(state, action: PayloadAction<IFilterOptions>) {
      if (Object.keys(action.payload).length) {
        state.selectedOption = action.payload.selectedOption;
        state.activeCategory = Number(action.payload.activeCategory);
        state.orderSort = action.payload.orderSort;
        state.currentPage = Number(action.payload.currentPage);
      } else {
        state.activeCategory = 0;
        state.currentPage = 1;
        state.orderSort = '';
        state.selectedOption = {
          name: 'популярности',
          sortProperty: 'rating',
        };
      }
    },

    resetFilters(state) {
      state.activeCategory = initialState.activeCategory;
      state.selectedOption = initialState.selectedOption;
      state.orderSort = initialState.orderSort;
      state.currentPage = initialState.currentPage;
    },
  },
});

export const {
  setActiveCategory,
  setOrderSort,
  setSelectedOption,
  setFilters,
  resetFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
