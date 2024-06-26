import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import arrow from '../../assets/arrow-top.svg';

import { setOrderSort, setSelectedOption } from '../../redux/filter/slice';

import { RootState } from '../../redux/store';

import styles from './Sort.module.scss';

export type SortListItem = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};

export const sortList: SortListItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

export const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const { selectedOption, orderSort } = useSelector(
    (state: RootState) => state.filter
  );

  const [activePopUp, setActivePopUp] = React.useState(false);

  const handlerSortOptions = (obj: SortListItem) => {
    dispatch(setSelectedOption(obj));

    setActivePopUp(false);
  };

  const orderMethod = () => {
    dispatch(setOrderSort(orderSort === '-' ? '' : '-'));
  };

  React.useEffect(() => {
    const handleClickOutside: EventListenerOrEventListenerObject = (event) => {
      let path;
      if (sortRef.current) {
        path = event.composedPath().includes(sortRef.current);
      }
      if (!path) {
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
});
