import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchDonutsParams, IResData } from './types';
import axios from 'axios';

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
