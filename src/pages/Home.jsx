import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Paginate from '../components/Paginate/Paginate';
import axios from 'axios';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';

import { SearchContext } from '..';
import { setFilters, setCurrentPage } from '../redux/filterSlice';
import Header from '../components/Header/Header';
import DonutsBlock from '../components/DonutsBlock/DonutsBlock';
import Sort, { sortList } from '../components/Sort/Sort';
import Category from '../components/Category/Category';

import styles from '../styles/Home.module.scss';

const Home = () => {
  // используем состояние выбранной категории из filterSlice
  const activeCategory = useSelector((state) => state.filter.activeCategory);

  // используем состояние выбранной сортировки из filterSlice
  const selectedOption = useSelector((state) => state.filter.selectedOption);

  // используем стейт сортировки по методу ASC-DESC из RTK
  const orderSort = useSelector((state) => state.filter.orderSort);

  // используем стейт
  const currentPage = useSelector((state) => state.filter.currentPage);

  console.log('cur page from REDUX', currentPage);

  // стейт всех пончиков
  const [donuts, setDonuts] = React.useState([]);

  // стейт для лоадера
  const [isLoading, setIsLoading] = React.useState(true);

  // пагинация: кол-во отображаемых товаров на одной странице, устанавливаем сами
  const [limit, setLimit] = React.useState(4);

  // пагинация: кол-во страниц, возвращает бэк
  const [pageCount, setPageCount] = React.useState(0);

  // пагинация: текущая страница, возвращает бэк
  // const [currentPage, setCurrentPages] = React.useState(1);

  //значение из инпута поиска
  const { searchValue } = useContext(SearchContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // запрос на получение всех пончиков
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

    // запрос на фильтрацию по категориям
    const category = activeCategory > 0 ? `&category=${activeCategory}` : '';

    // запрос на сортировку
    const sortBy = `&sortBy=${orderSort + selectedOption.sortProperty}`;

    // запрос на поиск по title
    const title = `title=*${searchValue.toLowerCase()}`;

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
        dispatch(setCurrentPage(dataDn));

        // проверка для пагинации, когда на первой странице выбираем 2ю стр-цу, затем переходим в категорию где всего 1 стр, задаем текущую страницу "1"
        if (res.data.meta.total_pages < 2) {
          dispatch(setCurrentPage(1));
        }
      });
  };

  /* приводим к строке объект, который храниться в Redux в качестве состояния, узнает, что в Redux и вшивает это в ссылку,
  если изменили параметры и был первый рендер*/
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategory,
        sortProperty: selectedOption.sortProperty,
        orderSort,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, orderSort, selectedOption, currentPage]);

  /*проверяем есть ли параметры в URL и сохраняем их в объект, если был первый рендер,
то проверяем URL-параметры и сохранаем в Redux*/
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log('object params', params);

      const selectedOption = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          selectedOption,
        })
      );

      isSearch.current = true;
    }
  }, []);

  // если был первый рендер, то запрашиваем все пончики
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchDonuts();
    }
    isSearch.current = false;
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
        onChangePage={(number) => dispatch(setCurrentPage(number))}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Home;
