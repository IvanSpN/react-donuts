import React from 'react';
import styles from './Sort.module.scss';
import arrow from '../../assets/arrow-top.svg';

import { setOrderSort, setSelectedOption } from '../../redux/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Sort = () => {
  const dispatch = useDispatch();

  // используем состояние выбранной категории из filterSlice
  const orderSort = useSelector((state) => state.filter.orderSort);
  // используем состояние выбранной категории из filterSlice
  const selectedOption = useSelector((state) => state.filter.selectedOption);
  // стейт для POPUP открыть/закрыть
  const [activePopUp, setActivePopUp] = React.useState(false);

  // массив параметров для сортировки
  const sortOptions = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  ];

  const handlerSortOptions = (obj) => {
    dispatch(setSelectedOption(obj));
    setActivePopUp(false);
  };

  const orderMethod = () => {
    dispatch(setOrderSort(orderSort === '-' ? '' : '-'));
  };

  return (
    <div className={styles.sortBlock}>
      <div className={styles.sortBy}>
        <div
          className={`${
            orderSort ? styles.arrowSort : `${styles.arrowSort} ${styles.desc}`
          }`}
        >
          <img src={arrow} alt="Стрелка" onClick={orderMethod} />
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
