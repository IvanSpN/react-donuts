import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../assets/img/logo.png';
import cart from '../../assets/cart.svg';

import MyButton from '../UI/button/MyButton';
import { Search } from '../index';

import { resetFilters } from '../../redux/filter/slice';
import { selectCart } from '../../redux/cart/selectors';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const resetParam = () => {
    navigate('/');
    dispatch(resetFilters());
  };

  const { totalPrice, totalCount } = useSelector(selectCart);

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={resetParam}>
        <img src={Logo} alt="Logo" width={70} height={70} />
        <h1>...the most delicious donuts</h1>
      </div>

      {location.pathname === '/' && <Search />}
      {location.pathname !== '/cart' && (
        <Link to="/cart">
          <MyButton className={styles.cart}>
            <span>{totalPrice} Р</span>
            <div className={styles.buttonDelimiter}></div>
            <div className={styles.cartImage}>
              <img src={cart} alt="cart" />
              <span>{totalCount}</span>
            </div>
          </MyButton>
        </Link>
      )}
    </div>
  );
};
