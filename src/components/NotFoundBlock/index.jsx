import React from 'react';
import styles from './NotFoundBlock.module.scss';
import Header from '../Header/Header';

const NotFoundBlock = () => {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <div>🙅</div>
        <h1>Ничего не найдено... </h1>
      </div>
    </div>
  );
};

export default NotFoundBlock;
