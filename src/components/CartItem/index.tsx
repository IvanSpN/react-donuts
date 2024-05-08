import React from 'react';

import MyButton from '../UI/button/MyButton';

import {
  fetchDeleteCartItem,
  fetchIncrementItemCart,
  fetchDecrementItemCart,
} from '../../redux/cart/asyncActions';

import { useAppDispatch } from '../../redux/store';

import styles from './CartItem.module.scss';

type TCartItemProps = {
  title: string;
  price: number;
  size: number;
  type: string;
  imageUrl: string;
  id: number;
  count: number;
  currentId: number;
};

interface ICartItemObjForIncAndDecr {
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
  id: number;
  currentId: number;
  imageUrl: string;
}

export const CartItem: React.FC<TCartItemProps> = ({
  title,
  price,
  size,
  type,
  imageUrl,
  id,
  count,
  currentId,
}) => {
  const dispatch = useAppDispatch();

  const handlerDeleteItem = (id: number) => {
    dispatch(fetchDeleteCartItem(id));
  };

  const handlerIncrementItemCart = () => {
    const newObj: ICartItemObjForIncAndDecr = {
      title,
      price,
      type,
      size,
      count,
      id,
      currentId,
      imageUrl,
    };

    dispatch(fetchIncrementItemCart(newObj));
  };

  const handlerDecrementItemCart = () => {
    const newObj: ICartItemObjForIncAndDecr = {
      title,
      price,
      type,
      size,
      count,
      id,
      currentId,
      imageUrl,
    };

    dispatch(fetchDecrementItemCart(newObj));
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.description}>
          <img width={50} height={50} src={imageUrl} alt="donuts_image" />
          <div className={styles.descriptionText}>
            <p>{title}</p>
            <p>
              {type}, BOX {size}
            </p>
          </div>
        </div>
        <div className={styles.quantity}>
          <MyButton
            title="Удалить товар"
            className={styles.btnQty}
            onClick={handlerDecrementItemCart}
          >
            -
          </MyButton>
          <p>{count}</p>
          <MyButton
            title="Добавить товар"
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
          title="Удалить товар"
          className={styles.deleteBtn}
          onClick={() => handlerDeleteItem(id)}
        >
          Удалить
        </MyButton>
      </div>
    </>
  );
};
