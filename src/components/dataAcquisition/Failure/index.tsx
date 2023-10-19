import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Failure: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.Failure}>
      <div>Failure</div>
    </div>
  );
};

export default memo(Failure);
Failure.displayName = 'Failure';
