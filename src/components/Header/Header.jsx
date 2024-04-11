import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../assets/img/logo.png';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';
import MyButton from '../UI/button/MyButton';
import Search from '../Search/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetFilters } from '../../redux/filterSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // сброс фильтров и переход на главную
  const resetParam = () => {
    navigate('/');
    dispatch(resetFilters());
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={resetParam}>
        <img src={Logo} alt="Логотип " width={70} height={70} />
        <h1>...the most delicious donuts</h1>
      </div>

      <Search />
      <Link to="/cart">
        <MyButton className={styles.cart}>
          <span>520 Р</span>
          <div className={styles.buttonDelimiter}></div>
          <div className={styles.cartImage}>
            <img src={cart} alt="" />
            <span>3</span>
          </div>
        </MyButton>
      </Link>
    </div>
  );
};

export default Header;
