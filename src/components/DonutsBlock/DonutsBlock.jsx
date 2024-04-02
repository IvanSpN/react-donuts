import React from 'react';
import styles from './DonutsBlock.module.scss';
import DonutCard from '../DonutCard/DonutCard';
import Skeleton from '../../loader/Skeleton';
const DonutsBlock = ({ donuts, loader }) => {
  return (
    <div className={styles.wrapper}>
      {loader
        ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
        : donuts.map((donut) => <DonutCard key={donut.id} {...donut} />)}
    </div>
  );
};

export default DonutsBlock;
