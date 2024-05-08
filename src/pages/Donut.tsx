import { Link } from 'react-router-dom';

import { FullDonut } from '../components';
import MyButton from '../components/UI/button/MyButton';

import styles from './../styles/Donut.module.scss';

const Donut: React.FC = () => {
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
