import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// экшн получения актуальной корзины с бэка
export const fetchCartItems = createAsyncThunk(
  'cartItems/fetchCartItemsStatus',
  async () => {
    const { data } = await axios.get(`https://dd317624db0a7664.mokky.dev/cart`);
    return data;
  }
);

// экшн удаления товара по id из корзины в бэке
export const fetchDeleteItem = createAsyncThunk(
  'deleteItem/fetchDeleteItemStatus',
  async (id, prevS) => {
    await axios.delete(`https://dd3-17624db0a7664.mokky.dev/cart/${id}`);
    return prevS;
  }
);

// функция удаления товара из корзины в бэке и обновление состояния актуальной корзины на фронте
const initialState = {
  // стейт отображения наполнения корзины
  cartItems: [],

  // состояние запроса на бэк
  status: 'loading',
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // метод для удаления одного товара из корзины на фронте
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // получаем корзину
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
        state.cartItems = [];
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.status = 'success';
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.status = 'error';
        state.cartItems = [];
      })
      // удаляем один товар из корзины
      .addCase(fetchDeleteItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeleteItem.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(fetchDeleteItem.rejected, (state, action) => {
        state.cartItems = action.payload.prevS;
        state.status = 'error';
        console.log('ошибка корзина');
      });
  },
});

export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
