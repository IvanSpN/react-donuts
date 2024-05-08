import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TCartItem } from './types';
import { RootState } from '../store';
import { setClearCartItems } from './slice';

export const fetchCartItems = createAsyncThunk(
  'cartItems/fetchCartItemsStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://dd317624db0a7664.mokky.dev/cart`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        'Не удалось загрузить актуальную корзину с сервера. Повторите запрос.'
      );
    }
  }
);

export const fetchDeleteCartItem = createAsyncThunk<void, number>(
  'deleteItem/fetchDeleteCartItemStatus',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `https://dd317624db0a7664.mokky.dev/cart/${id}`
      );
      dispatch(fetchCartItems());
    } catch (error) {
      return rejectWithValue(
        'Ошибка удаления товара из корзины. Повторите запрос.'
      );
    }
  }
);

export const fetchAddToCart = createAsyncThunk<void, TCartItem>(
  'addItem/fetchAddToCartStatus',
  async (item, { rejectWithValue, dispatch, getState }) => {
    try {
      const currentState = getState() as RootState;

      const findItem = currentState.cart.cartItems.find(
        (itm) =>
          itm.type === item.type &&
          itm.size === item.size &&
          itm.title === item.title &&
          itm.currentId === item.currentId
      );

      if (findItem) {
        await axios.patch(
          `https://dd317624db0a7664.mokky.dev/cart/${findItem.id}`,
          { count: findItem.count + 1 }
        );
      } else {
        const newItem = { ...item, count: 1 };
        await axios.post(`https://dd317624db0a7664.mokky.dev/cart`, newItem);
      }

      dispatch(fetchCartItems());
    } catch (error) {
      return rejectWithValue(
        'Ошибка добавления товара в корзину. Повторите запрос.'
      );
    }
  }
);

export const fetchClearCart = createAsyncThunk<void>(
  'clearCart/fetchClearCartStatus',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(
        `https://dd317624db0a7664.mokky.dev/cart`,
        []
      );

      dispatch(setClearCartItems());
    } catch (error) {
      return rejectWithValue('Ошибка очистки корзины. Повторите запрос.');
    }
  }
);

export const fetchIncrementItemCart = createAsyncThunk<void, TCartItem>(
  'incrementItemCart/fetchIncrementItemCartStatus',
  async (item, { rejectWithValue, dispatch, getState }) => {
    try {
      const currentState = getState() as RootState;

      const findItem = currentState.cart.cartItems.find(
        (itm) =>
          itm.type === item.type &&
          itm.size === item.size &&
          itm.title === item.title &&
          itm.currentId === item.currentId
      );

      if (findItem) {
        await axios.patch(
          `https://dd317624db0a7664.mokky.dev/cart/${findItem.id}`,
          { count: findItem.count + 1 }
        );
      }

      dispatch(fetchCartItems());
    } catch (error) {
      return rejectWithValue(
        'Ошибка добавления товара в корзину. Повторите запрос.'
      );
    }
  }
);

export const fetchDecrementItemCart = createAsyncThunk<void, TCartItem>(
  'decrementItemCart/fetchDecrementItemCartStatus',
  async (item, { rejectWithValue, dispatch, getState }) => {
    try {
      const currentState = getState() as RootState;

      const findItem = currentState.cart.cartItems.find(
        (itm) =>
          itm.type === item.type &&
          itm.size === item.size &&
          itm.title === item.title &&
          itm.currentId === item.currentId
      );

      if (findItem) {
        await axios.patch(
          `https://dd317624db0a7664.mokky.dev/cart/${findItem.id}`,
          { count: findItem.count - 1 }
        );
      }
      if (item.count <= 1) {
        dispatch(fetchDeleteCartItem(item.id));
      }

      dispatch(fetchCartItems());
    } catch (error) {
      return rejectWithValue(
        'Ошибка добавления товара в корзину. Повторите запрос.'
      );
    }
  }
);
