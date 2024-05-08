import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import trash from '../assets/trash.svg';

import MyButton from '../components/UI/button/MyButton';
import { CartItem } from '../components';

import { fetchCartItems, fetchClearCart } from '../redux/cart/asyncActions';
import { selectCart } from '../redux/cart/selectors';
import { useAppDispatch } from '../redux/store';

import styles from '../styles/Cart.module.scss';

type TItem = {
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
  id: number;
  currentId: number;
};

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();

  const { status, error, totalPrice, totalCount } = useSelector(selectCart);

  const { cartItems } = useSelector(selectCart);

  const getCartItems = async () => {
    dispatch(fetchCartItems());
  };

  const handlerClearCart = () => {
    dispatch(fetchClearCart());
  };

  React.useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className={styles.cart}>
      <div className={styles.cartContent}>
        <div className={styles.topSetting}>
          <div className={styles.info}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="black"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="black"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="black"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Корзина</p>
          </div>
          <MyButton
            disabled={cartItems.length <= 0}
            className={styles.clearBtn}
            onClick={handlerClearCart}
            title="Очистить корзину"
          >
            <img src={trash} alt="Мусорное ведро" />
            <p>Очистить корзину</p>
          </MyButton>
        </div>
        <div className={styles.cartCenter}>
          {status === 'loading' && <h2>Loading...</h2>}

          {error && <h2>Произошла ошибка: {error}</h2>}
          {cartItems.length ? (
            <div className={styles.items}>
              {cartItems.map(
                (item: TItem) => item && <CartItem key={item.id} {...item} />
              )}
            </div>
          ) : (
            <div className={styles.cartEmpty}>
              <h2>
                Корзина пустая. Добавьте товары. <span>&#128722;</span>
              </h2>
            </div>
          )}
        </div>

        <div className={styles.bottomInfo}>
          <div className={styles.totalOrder}>
            Всего в заказе: <strong>{totalCount} шт.</strong>
          </div>
          <div className={styles.totalAmount}>
            Сумма заказа: <span> {totalPrice} р</span>
          </div>
        </div>
        <div className={styles.bottomBtn}>
          <Link to="/">
            <MyButton className={styles.backBtn}>Вернуться назад</MyButton>
          </Link>

          <MyButton
            className={styles.payBtn}
            disabled={cartItems.length <= 0}
            title="Оплатить товар"
          >
            Оплатить сейчас
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default Cart;
