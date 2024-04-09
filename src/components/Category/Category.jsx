import React from 'react';
import styles from './Category.module.scss';
import { setActiveCategory } from '../../redux/filterSlice';

import { useDispatch, useSelector } from 'react-redux';

const Category = () => {
  const dispatch = useDispatch();

  // используем состояние выбранной категории из filterSlice
  const activeCategory = useSelector((state) => state.filter.activeCategory);

  // метод изменения категории по клику
  const onClickCategory = (index) => {
    dispatch(setActiveCategory(index));
  };

  // массив категорий для сортировки
  const categories = [
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
};

export default Category;
