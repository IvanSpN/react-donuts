import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div>
      <div className={styles.content}>
        <div>🙅</div>
        <h1>Ничего не найдено... </h1>
      </div>
    </div>
  );
};
