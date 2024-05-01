import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import { Status } from './donutsSlice';

type TCartItem = {
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  currentId: number;
  count: number;
  id: number;
};

interface ICartSlice {
  cartItems: TCartItem[];

  totalPrice: number;

  totalCount: number;

  status: 'loading' | 'success' | 'error';

  error: null | string;
}

// экшн получения актуальной корзины с бэка
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

// экшн удаления товара по id из корзины в бэке и после ОК-ответа и на фронте
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
// экшн для добавления товара в корзину, сначала на бэк и если ОК, то и на фронт
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
        // Если элемент уже есть в корзине, отправляем запрос на бэкенд для обновления количества
        await axios.patch(
          `https://dd317624db0a7664.mokky.dev/cart/${findItem.id}`,
          { count: findItem.count + 1 }
        );
      } else {
        // Если элемент не найден, создаем новый
        const newItem = { ...item, count: 1 };
        await axios.post(`https://dd317624db0a7664.mokky.dev/cart`, newItem);
      }

      // После успешного выполнения запроса обновляем корзину
      dispatch(fetchCartItems());
    } catch (error) {
      return rejectWithValue(
        'Ошибка добавления товара в корзину. Повторите запрос.'
      );
    }
  }
);

// экшн удаления товара по id из корзины в бэке и после ОК-ответа и на фронте
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

// экшн увеличения добавленного товара в корзине
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
        // Если элемент уже есть в корзине, отправляем запрос на бэкенд для обновления количества
        await axios.patch(
          `https://dd317624db0a7664.mokky.dev/cart/${findItem.id}`,
          { count: findItem.count + 1 }
        );
      }

      // После успешного выполнения запроса обновляем корзину
      dispatch(fetchCartItems());
    } catch (error) {
      return rejectWithValue(
        'Ошибка добавления товара в корзину. Повторите запрос.'
      );
    }
  }
);

// экшн уменьшения добавленного товара в корзине
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
        // Если элемент уже есть в корзине, отправляем запрос на бэкенд для обновления количества
        await axios.patch(
          `https://dd317624db0a7664.mokky.dev/cart/${findItem.id}`,
          { count: findItem.count - 1 }
        );
      }
      if (item.count <= 1) {
        dispatch(fetchDeleteCartItem(item.id));
      }

      // После успешного выполнения запроса обновляем корзину
      dispatch(fetchCartItems());
    } catch (error) {
      return rejectWithValue(
        'Ошибка добавления товара в корзину. Повторите запрос.'
      );
    }
  }
);

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

// селект для более удобного использования, если нужно
export const selectCart = (state: RootState) => state.cart;

export const {
  setCartItems,
  setDeleteCartItem,
  setAddCartItem,
  setClearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
