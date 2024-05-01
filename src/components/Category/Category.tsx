import { useDispatch, useSelector } from 'react-redux';

import { setActiveCategory, selectFilter } from '../../redux/filterSlice';

import styles from './Category.module.scss';

const Category: React.FC = () => {
  const dispatch = useDispatch();

  // используем состояние выбранной категории из filterSlice
  const { activeCategory } = useSelector(selectFilter);

  // метод изменения категории по клику
  const onClickCategory = (index: number): void => {
    dispatch(setActiveCategory(index));
  };

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
};

export default Category;
