import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Program: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.Project}>
      <div>Program</div>
    </div>
  );
};

export default memo(Program);
Program.displayName = 'Program';
