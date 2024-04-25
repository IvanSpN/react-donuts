import React from 'react';
import styles from './DonutCard.module.scss';
import MyButton from '../UI/button/MyButton';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAddToCart, selectCart } from '../../redux/cartSlice';
import { getPrice } from '../../utils/getPrice';
// список для типов продукта
export const typeList = ['Стандарт', 'Макси'];

// список для размера продукта
export const sizeList = [3, 6, 9];

const DonutCard = ({ title, price, sizes, types, imageUrl, currentId }) => {
  const dispatch = useDispatch();
  // стейт выбора типа продукта
  const [activeType, setActiveType] = React.useState(0);

  // стейт выбора размера продукта
  const [activeSize, setActiveSize] = React.useState(0);

  const obj = {
    title,
    price: getPrice(
      price,
      sizeList[activeSize],
      typeList[activeType],
      typeList[0],
      typeList[1]
    ),
    imageUrl,
    type: typeList[activeType],
    size: sizeList[activeSize],
    currentId,
  };

  function handlerAddToCart() {
    dispatch(fetchAddToCart(obj));
  }

  return (
    <div className={styles.donutCard}>
      <div className={styles.imageDonut}>
        <img width={100} src={imageUrl} alt="" />
      </div>
      <div className={styles.title}>
        <h5>{title}</h5>
      </div>
      <div className={styles.settings}>
        <div className={styles.types}>
          <ul>
            {types.map((type, index) => (
              <li
                className={activeType === index ? styles.active : ''}
                key={index}
                onClick={() => setActiveType(index)}
              >
                {typeList[type]}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.sizes}>
          <ul>
            {sizes.map((size, index) => (
              <li
                className={activeSize === index ? styles.active : ''}
                key={index}
                onClick={() => {
                  setActiveSize(index);
                }}
              >
                BOX {size}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.PriceAndAdd}>
        <div className={styles.donutPrice}>от {price} р.</div>
        <MyButton className={styles.btn} onClick={() => handlerAddToCart()}>
          <div>+</div>
          <div>Добавить</div>
        </MyButton>
      </div>
    </div>
  );
};

export default DonutCard;
