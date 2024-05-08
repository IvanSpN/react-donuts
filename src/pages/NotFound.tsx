import { Link } from 'react-router-dom';
import { NotFoundBlock } from '../components';
import MyButton from '../components/UI/button/MyButton';

import styles from '../styles/NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <hr />
      <NotFoundBlock />
      <Link to="/" className={styles.link}>
        <MyButton className={styles.backBtn}>На главную</MyButton>
      </Link>
    </div>
  );
};

export default NotFound;
