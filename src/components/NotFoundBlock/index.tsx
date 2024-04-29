import Header from '../Header/Header';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
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
