import React from 'react';
import styles from './Category.module.scss';

const Category = ({ activeCategory, setActiveCategory }) => {
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
              onClick={() => setActiveCategory(index)}
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
