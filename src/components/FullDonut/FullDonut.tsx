import React from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '../../hooks/useFetch';

import styles from './FullDonut.module.scss';

interface Item {
  imageUrl: string;
  title: string;
  price: number;
  description: string;
}

const FullDonut: React.FC = () => {
  const { id } = useParams();

  const [isLoading, data, error] = useFetch(
    `https://dd317624db0a7664.mokky.dev/items?currentId=` + id
  );

  if (isLoading) {
    return <>'Загрузка...'</>;
  }

  if (error) {
    return `Ошибка: ${error}`;
  }

  if (!data || !data[0]) {
    return 'Данные не найдены';
  }

  const { imageUrl, title, price, description }: Item = data[0];

  return (
    <div className={styles.container}>
      <img src={imageUrl} alt="Пончик" width={400} height={300} />
      <div className={styles.description}>
        <h2> {title}</h2>
        <h3>Цена: от {price} р.</h3>
        <h4>Состав: {description}</h4>
      </div>
    </div>
  );
};

export default FullDonut;
