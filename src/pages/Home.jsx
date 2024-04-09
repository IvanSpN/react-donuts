import React, { useContext, useEffect } from 'react';
import Header from '../components/Header/Header';
import DonutsBlock from '../components/DonutsBlock/DonutsBlock';
import Sort from '../components/Sort/Sort';
import styles from '../styles/Home.module.scss';
import Category from '../components/Category/Category';
import { SearchContext } from '..';
import Paginate from '../components/Paginate/Paginate';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {
  // используем состояние выбранной категории из filterSlice
  const activeCategory = useSelector((state) => state.filter.activeCategory);

  // используем состояние выбранной сортировки из filterSlice
  const selectedOption = useSelector((state) => state.filter.selectedOption);

  // используем стейт сортировки по методу ASC-DESC из RTK
  const orderSort = useSelector((state) => state.filter.orderSort);

  // стейт всех пончиков
  const [donuts, setDonuts] = React.useState([]);

  // стейт для лоадера
  const [isLoading, setIsLoading] = React.useState(true);

  // пагинация: кол-во отображаемых товаров на одной странице, устанавливаем сами
  const [limit, setLimit] = React.useState(4);

  // пагинация: кол-во страниц, возвращает бэк
  const [pageCount, setPageCount] = React.useState(0);

  // пагинация: текущая страница, возвращает бэк
  const [currentPage, setCurrentPages] = React.useState(1);

  //значение из инпута поиска
  const { searchValue } = useContext(SearchContext);

  // запрос на получение всех пончиков
  useEffect(() => {
    // запрос на фильтрацию по категориям
    const category = activeCategory > 0 ? `&category=${activeCategory}` : '';

    // запрос на сортировку
    const sortBy = `&sortBy=${orderSort + selectedOption.sortProperty}`;

    // запрос на поиск по title
    const title = `title=*${searchValue.toLowerCase()}`;

    const fetchDonuts = async () => {
      setIsLoading(true);
      // try {
      //   const response = await fetch(
      //     `https://dd317624db0a7664.mokky.dev/items?${title}${category}${sortBy}&page=${currentPage}&limit=${limit}`
      //   );
      //   const data = await response.json();

      //   if (!response.ok) {
      //     throw new Error(data.message || 'Something went wrong');
      //   }

      //   const dataDn = data.meta.current_page;
      //   setDonuts(data.items);
      //   setPageCount(data.meta.total_pages);
      //   setIsLoading(false);
      //   setCurrentPages(dataDn);
      //   // проверка для пагинации, когда на первой странице выбираем 2ю стр-цу, затем переходим в категорию где всего 1 стр, задаем текущую страницу "1"
      //   if (data.meta.total_pages < 2) {
      //     setCurrentPages(1);
      //   }
      // } catch (error) {
      //   console.error('Error fetching:', error.message);
      // }

      axios
        .get(
          `https://dd317624db0a7664.mokky.dev/items?${title}${category}${sortBy}&page=${currentPage}&limit=${limit}`
        )
        .then((res) => {
          // пагинация: текущая страница, возвращает бэк
          const dataDn = res.data.meta.current_page;

          setDonuts(res.data.items);
          setPageCount(res.data.meta.total_pages);
          setIsLoading(false);
          setCurrentPages(dataDn);

          // проверка для пагинации, когда на первой странице выбираем 2ю стр-цу, затем переходим в категорию где всего 1 стр, задаем текущую страницу "1"
          if (res.data.meta.total_pages < 2) {
            setCurrentPages(1);
          }
        });
    };

    window.scrollTo(0, 0);
    fetchDonuts();
  }, [activeCategory, orderSort, selectedOption, searchValue, currentPage]);

  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.wrapperCategoryAndSort}>
        <Category />
        <Sort />
      </div>
      <DonutsBlock donuts={donuts} loader={isLoading} />
      <Paginate
        limit={limit}
        onChangePage={(number) => setCurrentPages(number)}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Home;
