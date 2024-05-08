export type TCartItem = {
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  currentId: number;
  count: number;
  id: number;
};

export interface ICartSlice {
  cartItems: TCartItem[];

  totalPrice: number;

  totalCount: number;

  status: 'loading' | 'success' | 'error';

  error: null | string;
}
