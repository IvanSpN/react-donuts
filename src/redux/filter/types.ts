export type TSelectOptions = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};

export interface IFilterSlice {
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
