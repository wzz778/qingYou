import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Loading: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.Loading}>
      <div>Loading</div>
    </div>
  );
};

export default memo(Loading);
Loading.displayName = 'Loading';
