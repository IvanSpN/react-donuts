export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TDonutItem = {
  currentId: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  description: string;
};

export interface IResData {
  meta: {
    total_pages: number;
    current_page: number;
  };
  items: TDonutItem[];
}

export interface IDonutSlice {
  items: TDonutItem[];

  currentPage: number;

  totalPages: number;

  status: 'loading' | 'success' | 'error';

  error: null | string;
}

export interface IFetchDonutsParams {
  category: string;
  sortBy: string;
  title: string;
  currentPage: number;
  limit: number;
}
