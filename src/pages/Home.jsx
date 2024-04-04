import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import DonutsBlock from '../components/DonutsBlock/DonutsBlock';
import Sort from '../components/Sort/Sort';
import styles from '../styles/Home.module.scss';
import Category from '../components/Category/Category';

const Home = () => {
  // стейт всех пончиков
  const [donuts, setDonuts] = React.useState([]);

  // стейт для активной категории
  const [activeCategory, setActiveCategory] = React.useState(0);

  // стейт для выбранной опции сортировки
  const [selectedOption, setSelectedOption] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  // стейт для order сортировки ASC-DESC
  const [orderSort, setOrderSort] = React.useState('');

  // стейт для лоадера
  const [isLoading, setIsLoading] = React.useState(true);

  // запрос на фильтрацию по категориям
  const category = activeCategory > 0 ? `category=${activeCategory}` : '';

  // запрос на сортировку
  const sortBy = `sortBy=${orderSort + selectedOption.sortProperty}`;

  // запрос на получение всех пончиков
  useEffect(() => {
    const fetchDonuts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://dd317624db0a7664.mokky.dev/items?${category}&${sortBy}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        setDonuts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching:', error.message);
      }
    };
    window.scrollTo(0, 0);
    fetchDonuts();
  }, [activeCategory, orderSort, selectedOption]);

  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.wrapperCategoryAndSort}>
        <Category
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort
          order={orderSort}
          setOrder={setOrderSort}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <DonutsBlock donuts={donuts} loader={isLoading} />
    </div>
  );
};

export default Home;
