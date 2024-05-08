import { RootState } from '../store';

// селект для более удобного использования, если нужно
export const selectCart = (state: RootState) => state.cart;
