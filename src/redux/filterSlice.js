import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //категория товаров
  activeCategory: 0,

  //параметры для сортировки товаров
  selectedOption: {
    name: 'алфавиту',
    sortProperty: 'title',
  },

  // параметр сориторовки "по убыванию/возрастанию"
  orderSort: '',

  // стейт поиска
  searchValue: '',
};
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // метод для изменения категории товаров
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },

    // метод для изменения параметра "по убыванию/возрастанию"
    setOrderSort(state, action) {
      state.orderSort = action.payload;
    },

    // метод для изменеия выбора параметров сортировки товаров
    setSelectedOption(state, action) {
      state.selectedOption = action.payload;
    },

    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },

    // метод для измениния стейтов при сохранении параметров в URL
    setFilters(state, action) {
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

    // метод для сброса всех фильтров
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
