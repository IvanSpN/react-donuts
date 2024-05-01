import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type TSelectOptions = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};

interface IFilterSlice {
  activeCategory: number;
  selectedOption: TSelectOptions;
  orderSort: string;
  searchValue: string;
  currentPage: number;
}

export interface IFilterOptions {
  activeCategory: number;
  selectedOption: TSelectOptions;
  orderSort: string;
  currentPage: number;
}

const initialState: IFilterSlice = {
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

  //текущая страница
  currentPage: 0,
};
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // метод для изменения категории товаров
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },

    // метод для изменения параметра "по убыванию/возрастанию"
    setOrderSort(state, action: PayloadAction<string>) {
      state.orderSort = action.payload;
    },

    // метод для изменеия выбора параметров сортировки товаров
    setSelectedOption(state, action: PayloadAction<TSelectOptions>) {
      state.selectedOption = action.payload;
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    // метод для измениния стейтов при сохранении параметров в URL
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

    // метод для сброса всех фильтров
    resetFilters(state) {
      state.activeCategory = initialState.activeCategory;
      state.selectedOption = initialState.selectedOption;
      state.orderSort = initialState.orderSort;
      state.currentPage = initialState.currentPage;
    },
  },
});

// селект для более удобного использования, если нужно
export const selectFilter = (state: RootState) => state.filter;

export const {
  setActiveCategory,
  setOrderSort,
  setSelectedOption,
  setFilters,
  resetFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
