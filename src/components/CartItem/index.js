import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyButton from '../UI/button/MyButton';

import styles from './CartItem.module.scss';
import {
  fetchDeleteCartItem,
  fetchIncrementItemCart,
  fetchDecrementItemCart,
} from '../../redux/cartSlice';

const CartItem = ({
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
  const handlerDeleteItem = (id) => {
    dispatch(fetchDeleteCartItem(id));
  };

  // увеличиваем добавленный товар в корзине
  const handlerIncrementItemCart = () => {
    const newObj = {
      title,
      price,
      type,
      size,
      count,
      id,
      currentId,
    };
    dispatch(fetchIncrementItemCart(newObj));
  };

  // уменьшаем добавленный товар в корзине
  const handlerDecrementItemCart = () => {
    const newObj = {
      title,
      price,
      type,
      size,
      count,
      id,
      currentId,
    };
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
