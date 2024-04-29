import ReactPaginate from 'react-paginate';

import styles from './Paginate.module.scss';

interface PaginateProp {
  onChangePage: (selectedPage: number) => void;
  pageCount: number;
  limit: number;
}

const Paginate: React.FC<PaginateProp> = ({
  onChangePage,
  pageCount,
  limit,
}) => {
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
