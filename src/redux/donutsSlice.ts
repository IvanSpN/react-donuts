import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type TDonutItem = {
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

interface IResData {
  meta: {
    total_pages: number;
    current_page: number;
  };
  items: TDonutItem[];
}

interface IDonutSlice {
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

export const fetchDonuts = createAsyncThunk<IResData, IFetchDonutsParams>(
  'donuts/fetchDonutsStatus',
  async (params) => {
    const { category, sortBy, title, currentPage, limit } = params;
    const { data } = await axios.get<IResData>(
      `https://dd317624db0a7664.mokky.dev/items?${title}${category}${sortBy}&page=${currentPage}&limit=${limit}`
    );
    return data;
  }
);

const initialState: IDonutSlice = {
  // стейт всех пончиков
  items: [],

  //параметр текущей страницы, возвращает бэк
  currentPage: 1,

  //всего страниц, возвращает бэк
  totalPages: 1,

  // состояние запроса на бэк
  status: 'loading',
  error: null,
};
const donutsSlice = createSlice({
  name: 'donuts',
  initialState,
  reducers: {
    // метод для изменеия текущей страницы
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonuts.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(
        fetchDonuts.fulfilled,
        (state, action: PayloadAction<IResData>) => {
          state.items = action.payload.items;
          state.currentPage = action.payload.meta.current_page;
          state.totalPages = action.payload.meta.total_pages;
          state.status = Status.SUCCESS;
        }
      )
      .addCase(fetchDonuts.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

// селект для более удобного использования, если нужно
export const selectDonuts = (state: RootState) => state.donuts;

export const { setCurrentPage } = donutsSlice.actions;

export default donutsSlice.reducer;
