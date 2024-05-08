import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../donuts/types';
import { TCartItem, ICartSlice } from './types';
import {
  fetchAddToCart,
  fetchCartItems,
  fetchClearCart,
  fetchDeleteCartItem,
} from './asyncActions';

const initialState: ICartSlice = {
  // стейт отображения наполнения корзины
  cartItems: [],

  // стейт итоговой стоимости корзины товаров
  totalPrice: 0,

  // стейт общего количества позиций в корзине товаров
  totalCount: 0,

  // состояние запроса на бэк
  status: 'loading',

  // стейт для обработки ошибок
  error: null,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<TCartItem[]>) {
      state.cartItems = action.payload;
    },

    setClearCartItems(state) {
      state.cartItems = [];
    },

    // метод для удаления одного товара из корзины на фронте
    setDeleteCartItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    // метод для добавления одного товара в корзину на фронте
    setAddCartItem(state, action: PayloadAction<TCartItem>) {
      state.cartItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // получаем корзину
      .addCase(fetchCartItems.pending, (state) => {
        state.status = Status.LOADING;
        state.cartItems = [];
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<TCartItem[]>) => {
          state.cartItems = action.payload;

          state.totalPrice = state.cartItems.reduce(
            (total, item) => total + item.price * item.count,
            0
          );
          state.totalCount = state.cartItems.reduce(
            (total, item) => total + item.count,
            0
          );
          state.status = Status.SUCCESS;
        }
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload as any;
        state.cartItems = [];
      })
      // удаляем один товар из корзины, сначала из бэка и при ОК-ответе, и с фронта
      .addCase(fetchDeleteCartItem.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchDeleteCartItem.fulfilled, (state) => {
        state.status = Status.SUCCESS;
      })
      .addCase(fetchDeleteCartItem.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload as any;
      })
      // добавляем один товар в корзину, сначала на бэк и при ОК-ответе, и на фронт
      .addCase(fetchAddToCart.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchAddToCart.fulfilled, (state) => {
        state.status = Status.SUCCESS;
      })
      .addCase(fetchAddToCart.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload as any;
      })
      // очищаем корзину
      .addCase(fetchClearCart.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchClearCart.fulfilled, (state) => {
        state.status = Status.SUCCESS;
        state.cartItems = [];
        state.totalPrice = 0;
        state.totalCount = 0;
      })
      .addCase(fetchClearCart.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload as any;
      });
  },
});

export const {
  setCartItems,
  setDeleteCartItem,
  setAddCartItem,
  setClearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
