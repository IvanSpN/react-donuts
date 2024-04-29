import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../assets/img/logo.png';
import cart from '../../assets/cart.svg';

import MyButton from '../UI/button/MyButton';
import Search from '../Search/Search';

import { resetFilters } from '../../redux/filterSlice';
import { selectCart } from '../../redux/cartSlice';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // сброс фильтров и переход на главную
  const resetParam = () => {
    navigate('/');
    dispatch(resetFilters());
  };

  const { totalPrice, totalCount } = useSelector(selectCart);

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
