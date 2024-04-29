import React from 'react';
import { useDispatch } from 'react-redux';

import MyButton from '../UI/button/MyButton';

import {
  fetchDeleteCartItem,
  fetchIncrementItemCart,
  fetchDecrementItemCart,
} from '../../redux/cartSlice';

import styles from './CartItem.module.scss';

type CartItemProps = {
  title: string;
  price: number;
  size: number;
  type: string;
  imageUrl: string;
  id: number;
  count: number;
  currentId: number;
};

interface newObj {
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
  id: number;
  currentId: number;
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  price,
  size,
  type,
  imageUrl,
  id,
  count,
  currentId,
}) => {
  const dispatch = useDispatch();

  // Удаляем элемент из корзины
  const handlerDeleteItem = (id: number) => {
    //@ts-ignore
    dispatch(fetchDeleteCartItem(id));
  };

  // увеличиваем добавленный товар в корзине
  const handlerIncrementItemCart = () => {
    const newObj: newObj = {
      title,
      price,
      type,
      size,
      count,
      id,
      currentId,
    };
    //@ts-ignore
    dispatch(fetchIncrementItemCart(newObj));
  };

  // уменьшаем добавленный товар в корзине
  const handlerDecrementItemCart = () => {
    const newObj: newObj = {
      title,
      price,
      type,
      size,
      count,
      id,
      currentId,
    };
    //@ts-ignore
    dispatch(fetchDecrementItemCart(newObj));
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.description}>
          <img width={50} height={50} src={imageUrl} alt="donuts image" />
          <div className={styles.descriptionText}>
            <p>{title}</p>
            <p>
              {type}, BOX {size}
            </p>
          </div>
        </div>
        <div className={styles.quantity}>
          <MyButton
            className={styles.btnQty}
            onClick={handlerDecrementItemCart}
          >
            -
          </MyButton>
          <p>{count}</p>
          <MyButton
            className={styles.btnQty}
            onClick={handlerIncrementItemCart}
          >
            +
          </MyButton>
        </div>
        <div className={styles.price}>
          <p>{price * count}р.</p>
        </div>
        <MyButton
          className={styles.deleteBtn}
          onClick={() => handlerDeleteItem(id)}
        >
          -_-
        </MyButton>
      </div>
    </>
  );
};

export default CartItem;
