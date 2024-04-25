import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDonuts = createAsyncThunk(
  'donuts/fetchDonutsStatus',
  async (params) => {
    const { category, sortBy, title, currentPage, limit } = params;
    const { data } = await axios.get(
      `https://dd317624db0a7664.mokky.dev/items?${title}${category}${sortBy}&page=${currentPage}&limit=${limit}`
    );
    return data;
  }
);

const initialState = {
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonuts.pending, (state) => {
        state.status = 'loading';
        // state.items = [];
      })
      .addCase(fetchDonuts.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.currentPage = action.payload.meta.current_page;
        state.totalPages = action.payload.meta.total_pages;
        state.status = 'success';
      })
      .addCase(fetchDonuts.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

// селект для более удобного использования, если нужно
export const selectDonuts = (state) => state.donuts;

export const { setCurrentPage } = donutsSlice.actions;

export default donutsSlice.reducer;
