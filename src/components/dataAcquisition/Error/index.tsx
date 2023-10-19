import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Error: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.Error}>
      <div>Error</div>
    </div>
  );
};

export default memo(Error);
Error.displayName = 'Error';
