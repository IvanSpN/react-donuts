import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';

import { Paginate } from '../components';

import { DonutsBlock } from '../components';
import { Category, Sort, sortList } from '../components';

import { setFilters } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { setCurrentPage } from '../redux/donuts/slice';
import { fetchDonuts } from '../redux/donuts/asyncActions';

import { IFilterOptions } from '../redux/filter/types';
import { selectDonuts } from '../redux/donuts/selectors';

import styles from '../styles/Home.module.scss';
import { useAppDispatch } from '../redux/store';
import { fetchCartItems } from '../redux/cart/asyncActions';

interface FilterState extends IFilterOptions {}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { orderSort, searchValue, activeCategory, selectedOption } =
    useSelector(selectFilter);

  const { currentPage, totalPages, items } = useSelector(selectDonuts);

  const [limit] = React.useState(4);

  const getDonuts = async () => {
    const category = activeCategory > 0 ? `&category=${activeCategory}` : '';

    const sortBy = `&sortBy=${orderSort + selectedOption.sortProperty}`;

    const title = `title=*${searchValue.toLowerCase()}`;

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

  React.useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  React.useEffect(() => {
    if (totalPages < 2) {
      dispatch(setCurrentPage(1));
    }
  }, [totalPages]);

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
      {items.length !== 0 ? <DonutsBlock /> : <h2>Ничего не найдено</h2>}

      <Paginate
        limit={limit}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
        pageCount={totalPages}
      />
    </div>
  );
};

export default Home;
