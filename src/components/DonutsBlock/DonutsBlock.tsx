import { useSelector } from 'react-redux';

import DonutCard from '../DonutCard/DonutCard';
import Skeleton from '../../loader/Skeleton';

import { selectDonuts } from '../../redux/donutsSlice';

import styles from './DonutsBlock.module.scss';

interface DonutObj {
  currentId: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  description: string;
}

const DonutsBlock: React.FC = () => {
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
            : items.map((donut: DonutObj) => (
                <DonutCard key={donut.currentId} {...donut} />
              ))}
        </div>
      )}
    </div>
  );
};

export default DonutsBlock;
