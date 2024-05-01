import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';

import Paginate from '../components/Paginate/Paginate';

import DonutsBlock from '../components/DonutsBlock/DonutsBlock';
import Sort, { sortList } from '../components/Sort/Sort';
import Category from '../components/Category/Category';

import { setFilters, selectFilter, IFilterOptions } from '../redux/filterSlice';
import {
  fetchDonuts,
  setCurrentPage,
  selectDonuts,
  IFetchDonutsParams,
} from '../redux/donutsSlice';
import { selectCart } from '../redux/cartSlice';

import styles from '../styles/Home.module.scss';
import { useAppDispatch } from '../redux/store';

interface FilterState extends IFilterOptions {}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // используем стейт сортировки по методу ASC-DESC из RTK
  const { orderSort, searchValue, activeCategory, selectedOption } =
    useSelector(selectFilter);

  // пагинация: текущая страница, возвращает бэк,  // пагинация: всего страниц, возвращает бэк
  const { currentPage, totalPages } = useSelector(selectDonuts);

  const { error } = useSelector(selectCart);

  // пагинация: кол-во отображаемых товаров на одной странице, устанавливаем сами
  const [limit] = React.useState(4);

  // запрос на получение всех пончиков
  const getDonuts = async () => {
    // запрос на фильтрацию по категориям
    const category = activeCategory > 0 ? `&category=${activeCategory}` : '';

    // запрос на сортировку
    const sortBy = `&sortBy=${orderSort + selectedOption.sortProperty}`;

    // запрос на поиск по title
    const title = `title=*${searchValue.toLowerCase()}`;

    // используем ф-ю из Redux для получения всех товаров и передаем в нее параметры
    dispatch(
      fetchDonuts({
        category,
        sortBy,
        title,
        currentPage,
        limit,
      })
    );
  };

  /*проверка для пагинации, когда на первой странице выбираем 2ю стр-цу,
   затем переходим в категорию где всего 1 стр, задаем текущую страницу "1"*/
  React.useEffect(() => {
    if (totalPages < 2) {
      dispatch(setCurrentPage(1));
    }
  }, [totalPages]);

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

      const selectedOption = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          selectedOption,
        } as FilterState)
      );

      isSearch.current = true;
    }
  }, []);

  // если был первый рендер, то запрашиваем все пончики
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getDonuts();
    }
    isSearch.current = false;
  }, [activeCategory, orderSort, selectedOption, searchValue, currentPage]);

  return (
    <div className={styles.home}>
      <div className={styles.wrapperCategoryAndSort}>
        <Category />
        <Sort />
      </div>
      {error && <h2>Произошла ошибка на сервере: {error}</h2>}
      <DonutsBlock />
      <Paginate
        limit={limit}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
        pageCount={totalPages}
      />
    </div>
  );
};

export default Home;
