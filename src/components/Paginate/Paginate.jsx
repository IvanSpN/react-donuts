import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Paginate.module.scss';
const Paginate = ({ onChangePage, pageCount, limit }) => {
  return (
    <ReactPaginate
      className={styles.wrapper}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={limit}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Paginate;
