import React from 'react';
import { Link } from 'react-router-dom';

import { fetchAddToCart } from '../../redux/cart/asyncActions';

import MyButton from '../UI/button/MyButton';
import { getPrice } from '../../utils/getPrice';

import { useAppDispatch } from '../../redux/store';

import styles from './DonutCard.module.scss';

// список для типов продукта
export const typeList: string[] = ['Стандарт', 'Макси'];

// список для размера продукта
export const sizeList: number[] = [3, 6, 9];

type DonutCardProps = {
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  imageUrl: string;
  currentId: number;
};

interface objInt {
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  currentId: number;
  count: number;
  id: number;
}

export const DonutCard: React.FC<DonutCardProps> = ({
  title,
  price,
  sizes,
  types,
  imageUrl,
  currentId,
}) => {
  const dispatch = useAppDispatch();

  // стейт выбора типа продукта
  const [activeType, setActiveType] = React.useState<number>(0);

  // стейт выбора размера продукта
  const [activeSize, setActiveSize] = React.useState<number>(0);

  const obj: objInt = {
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
    count: 1,
    id: 0,
  };

  function handlerAddToCart() {
    dispatch(fetchAddToCart(obj));
  }

  return (
    <div className={styles.donutCard}>
      <div className={styles.imageDonut}>
        <Link to={`/items/${currentId}`}>
          <img width={100} src={imageUrl} alt="" />
        </Link>
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
        <MyButton
          title="Добавить товар в корзину"
          className={styles.btn}
          onClick={() => handlerAddToCart()}
        >
          <div>+</div>
          <div>Добавить</div>
        </MyButton>
      </div>
    </div>
  );
};
