import React from 'react';
import styles from './Sort.module.scss';

const Sort = () => {
  // стейт для активной категории
  const [activeCategory, setActiveCategory] = React.useState(0);

  // стейт для POPUP открыть/закрыть
  const [activePopUp, setActivePopUp] = React.useState(false);

  // стейт для выбранной опции сортировки
  const [selectedOption, setSelectedOption] = React.useState(0);

  // массив параметров для сортировки
  const sortOptions = ['популярности', 'цене', 'алфавиту'];

  // массив категорий для сортировки
  const categories = [
    'Все',
    'Классические',
    'Шоколадные',
    'Фруктовые',
    'Ягодные',
    'Сырные',
  ];

  const handlerSortOptions = (index) => {
    setSelectedOption(index);
    setActivePopUp(false);
  };
  return (
    <div className={styles.sortBlock}>
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
      <div className={styles.sortBy}>
        Сортировать по:{' '}
        <span
          onClick={() => {
            setActivePopUp(!activePopUp);
          }}
        >
          {sortOptions[selectedOption]}
        </span>
      </div>
      {activePopUp && (
        <div className={styles.sortPopUp}>
          <ul>
            {sortOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handlerSortOptions(index)}
                className={selectedOption === index ? styles.active : ''}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
