import React, { useRef } from 'react';
import styles from './Sort.module.scss';
import arrow from '../../assets/arrow-top.svg';

import { setOrderSort, setSelectedOption } from '../../redux/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

// массив параметров для сортировки
export const sortList = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sortRef = useRef();

  // используем состояние выбранной категории из filterSlice
  const orderSort = useSelector((state) => state.filter.orderSort);
  // используем состояние выбранной категории из filterSlice
  const { selectedOption } = useSelector((state) => state.filter);

  // стейт для POPUP открыть/закрыть
  const [activePopUp, setActivePopUp] = React.useState(false);

  // метод выбора метода сортировки
  const handlerSortOptions = (obj) => {
    dispatch(setSelectedOption(obj));

    setActivePopUp(false);
  };

  // метод для смены метода сортировки "ASC-DESC"
  const orderMethod = () => {
    dispatch(setOrderSort(orderSort === '-' ? '' : '-'));
  };

  // скрываем ПОПап при клике мимо него
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setActivePopUp(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={styles.sortBlock} ref={sortRef}>
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
            {sortList.map((obj, index) => (
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
