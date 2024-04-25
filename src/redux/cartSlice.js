import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const selectTotalPrice = (state) => {
  const { cartItems, totalPrice } = state.cart;

  return cartItems.reduce((total, item) => total + item.price * item.count, 0);
};

export const selectTotalCount = (state) => {
  const { cartItems, totalCount } = state.cart;

  return cartItems.reduce((total, item) => total + item.count, 0);
};

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
export const fetchDeleteCartItem = createAsyncThunk(
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
export const fetchAddToCart = createAsyncThunk(
  'addItem/fetchAddToCartStatus',
  async (item, { rejectWithValue, dispatch, getState }) => {
    try {
      const currentState = getState();

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
export const fetchClearCart = createAsyncThunk(
  'clearCart/fetchClearCartStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `https://dd317624db0a7664.mokky.dev/cart`,
        []
      );
    } catch (error) {
      return rejectWithValue('Ошибка очистки корзины. Повторите запрос.');
    }
  }
);
// экшн увеличения добавленного товара в корзине
export const fetchIncrementItemCart = createAsyncThunk(
  'incrementItemCart/fetchIncrementItemCartStatus',
  async (item, { rejectWithValue, dispatch, getState }) => {
    try {
      const currentState = getState();

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
export const fetchDecrementItemCart = createAsyncThunk(
  'decrementItemCart/fetchDecrementItemCartStatus',
  async (item, { rejectWithValue, dispatch, getState }) => {
    try {
      const currentState = getState();

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

const initialState = {
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
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },

    // метод для удаления одного товара из корзины на фронте
    setDeleteCartItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    // метод для добавления одного товара в корзину на фронте
    setAddCartItem(state, action) {
      state.cartItems.push(action.payload);
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

        state.totalPrice = state.cartItems.reduce(
          (total, item) => total + item.price * item.count,
          0
        );
        state.totalCount = state.cartItems.reduce(
          (total, item) => total + item.count,
          0
        );
        state.status = 'success';
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
        state.cartItems = [];
      })
      // удаляем один товар из корзины, сначала из бэка и при ОК-ответе, и с фронта
      .addCase(fetchDeleteCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeleteCartItem.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(fetchDeleteCartItem.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      // добавляем один товар в корзину, сначала на бэк и при ОК-ответе, и на фронт
      .addCase(fetchAddToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddToCart.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(fetchAddToCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      // очищаем корзину
      .addCase(fetchClearCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClearCart.fulfilled, (state) => {
        state.status = 'success';
        state.cartItems = [];
        state.totalPrice = 0;
        state.totalCount = 0;
      })
      .addCase(fetchClearCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

// селект для более удобного использования, если нужно
export const selectCart = (state) => state.cart;

export const { setCartItems, setDeleteCartItem, setAddCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
