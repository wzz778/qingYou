import { memo } from 'react';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Navbar: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.Navbar}>
      <a href="">www </a>
      <a href="">www </a>
      <a href="">www </a>
    </div>
  );
};

export default memo(Navbar);
Navbar.displayName = 'Layout';
