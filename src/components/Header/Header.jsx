import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../assets/img/logo.png';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';
import MyButton from '../UI/button/MyButton';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { resetFilters } from '../../redux/filterSlice';
import { selectCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // сброс фильтров и переход на главную
  const resetParam = () => {
    navigate('/');
    dispatch(resetFilters());
  };

  const { cartItems, totalPrice, totalCount } = useSelector(selectCart);

  // const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  // const totalPrice = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.count,
  //   0
  // );

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={resetParam}>
        <img src={Logo} alt="Логотип " width={70} height={70} />
        <h1>...the most delicious donuts</h1>
      </div>

      <Search />
      <Link to="/cart">
        <MyButton className={styles.cart}>
          <span>{totalPrice} Р</span>
          <div className={styles.buttonDelimiter}></div>
          <div className={styles.cartImage}>
            <img src={cart} alt="" />
            <span>{totalCount}</span>
          </div>
        </MyButton>
      </Link>
    </div>
  );
};

export default Header;
