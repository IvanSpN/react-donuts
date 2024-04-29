import { useDispatch, useSelector } from 'react-redux';

import { setActiveCategory } from '../../redux/filterSlice';

import styles from './Category.module.scss';

const Category: React.FC = () => {
  const dispatch = useDispatch();

  //@ts-ignore используем состояние выбранной категории из filterSlice
  const activeCategory = useSelector((state) => state.filter.activeCategory);

  // метод изменения категории по клику
  const onClickCategory = (index: number) => {
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
