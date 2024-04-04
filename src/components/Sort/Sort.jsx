import React from 'react';
import styles from './Sort.module.scss';
import arrow from '../../assets/arrow-top.svg';

const Sort = ({ selectedOption, setSelectedOption, order, setOrder }) => {
  // стейт для POPUP открыть/закрыть
  const [activePopUp, setActivePopUp] = React.useState(false);

  // массив параметров для сортировки
  const sortOptions = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  ];

  const handlerSortOptions = (obj) => {
    setSelectedOption(obj);
    setActivePopUp(false);
  };

  const rotateArrow = () => {
    setOrder(order === '-' ? '' : '-');
  };

  console.log(order);
  return (
    <div className={styles.sortBlock}>
      <div className={styles.sortBy}>
        <div
          className={`${
            order ? styles.arrowSort : `${styles.arrowSort} ${styles.desc}`
          }`}
        >
          <img src={arrow} alt="Стрелка" onClick={rotateArrow} />
        </div>
        Сортировать по:
        <span
          onClick={() => {
            setActivePopUp(!activePopUp);
          }}
        >
          {selectedOption.name}
        </span>
      </div>
      {activePopUp && (
        <div className={styles.sortPopUp}>
          <ul>
            {sortOptions.map((obj, index) => (
              <li
                key={index}
                onClick={() => handlerSortOptions(obj)}
                className={
                  selectedOption.name === obj.name ? styles.active : ''
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
