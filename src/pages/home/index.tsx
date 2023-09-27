import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Home: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.demo}>
      <div>Home</div>
    </div>
  );
};

export default memo(Home);
Home.displayName = 'Home';
