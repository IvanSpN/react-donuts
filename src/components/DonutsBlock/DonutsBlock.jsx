import React from 'react';
import { useSelector } from 'react-redux';
import styles from './DonutsBlock.module.scss';
import DonutCard from '../DonutCard/DonutCard';
import Skeleton from '../../loader/Skeleton';
import { selectDonuts } from '../../redux/donutsSlice';

const DonutsBlock = () => {
  const { items, status } = useSelector(selectDonuts);
  return (
    <div className={styles.wrapper}>
      {status === 'error' ? (
        <div className={styles.error}>
          <h2>
            Произошла ошибка <span>&#128531;</span>
          </h2>
          <p>К сожалению, не удалось загрузить пончики.</p>
          <p> Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className={styles.items}>
          {status === 'loading'
            ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
            : items.map((donut) => (
                <DonutCard key={donut.currentId} {...donut} />
              ))}
        </div>
      )}
    </div>
  );
};

export default DonutsBlock;
