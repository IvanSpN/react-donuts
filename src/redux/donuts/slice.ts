import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDonutSlice, IResData, Status } from './types';
import { fetchDonuts } from './asyncActions';

const initialState: IDonutSlice = {
  items: [],

  currentPage: 1,

  totalPages: 1,

  status: 'loading',
  error: null,
};
const donutsSlice = createSlice({
  name: 'donuts',
  initialState,
  reducers: {
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

export const { setCurrentPage } = donutsSlice.actions;

export default donutsSlice.reducer;
