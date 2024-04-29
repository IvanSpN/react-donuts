import React from 'react';
import styles from './../styles/Donut.module.scss';
import Header from '../components/Header/Header';
import FullDonut from '../components/FullDonut/FullDonut';
import { Link } from 'react-router-dom';
import MyButton from '../components/UI/button/MyButton';

const Donut = () => {
  return (
    <div className={styles.container}>
      <hr />
      <FullDonut />
      <Link to={'/'} className={styles.link}>
        <MyButton className={styles.backBtn}>Назад</MyButton>
      </Link>
    </div>
  );
};

export default Donut;
