import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyButton from '../UI/button/MyButton';
import { typeList } from '../DonutCard/DonutCard';

import styles from './CartItem.module.scss';
import { setCartItems, fetchDeleteItem } from '../../redux/cartSlice';

const CartItem = ({ title, price, sizes, types, imageUrl, id }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleDeleteItem = (id) => {
    const prevSt = [...cartItems];
    const updateCartOnFront = cartItems.filter((item) => item.id !== id);

    dispatch(setCartItems(updateCartOnFront));

    dispatch(fetchDeleteItem(id, prevSt)); // Удаляем элемент из корзины
  };

  return (
    <div className={styles.item}>
      <div className={styles.description}>
        <img width={50} height={50} src={imageUrl} alt="donuts image" />
        <div className={styles.descriptionText}>
          <p>{title}</p>
          <p>
            {typeList[types]}, BOX {sizes}
          </p>
        </div>
      </div>
      <div className={styles.quantity}>
        <MyButton className={styles.btnQty}>-</MyButton>
        <p>2</p>
        <MyButton className={styles.btnQty}>+</MyButton>
      </div>
      <div className={styles.price}>
        <p>{price}р.</p>
      </div>
      <MyButton
        className={styles.deleteBtn}
        onClick={() => handleDeleteItem(id)}
      >
        -_-
      </MyButton>
    </div>
  );
};

export default CartItem;
