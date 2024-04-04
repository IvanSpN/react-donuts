import React from 'react';
import styles from './DonutCard.module.scss';
import MyButton from '../UI/button/MyButton';

const DonutCard = ({ title, price, sizes, types, imageUrl }) => {
  // список для типов продукта
  const typeList = ['Стандарт', 'Макси'];

  // стейт выбора типа продукта
  const [activeType, setActiveType] = React.useState(0);

  // стейт выбора размера продукта
  const [activeSize, setActiveSize] = React.useState(0);

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
        <MyButton className={styles.btn}>
          <div>+</div>
          <div>Добавить</div>
          <div>2</div>
        </MyButton>
      </div>
    </div>
  );
};

export default DonutCard;
