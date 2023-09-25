import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Demo: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.demo}>
      <div>Demo</div>
    </div>
  );
};

export default memo(Demo);
Demo.displayName = 'Demo';
