import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

import { setActiveCategory } from '../../redux/filter/slice';
import { selectFilter } from '../../redux/filter/selectors';

import styles from './Category.module.scss';

export const Category: React.FC = React.memo(() => {
  useWhyDidYouUpdate('Category', {});
  const dispatch = useDispatch();

  // используем состояние выбранной категории из filterSlice
  const { activeCategory } = useSelector(selectFilter);

  // метод изменения категории по клику

  const onClickCategory = React.useCallback((index: number): void => {
    dispatch(setActiveCategory(index));
  }, []);

  // массив категорий для сортировки
  const categories: string[] = [
    'Все',
    'Классические',
    'Шоколадные',
    'Фруктовые',
    'Ягодные',
    'Сырные',
  ];
  return (
    <div className={styles.categoryBlock}>
      <div className={styles.categories}>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={activeCategory === index ? styles.active : ''}
              onClick={() => onClickCategory(index)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
