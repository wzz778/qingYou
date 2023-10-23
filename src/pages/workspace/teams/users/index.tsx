import { memo, useEffect } from 'react';
// import classNames from "classnames";
import { ToastError } from '@/utils/common';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Users: FC<IProps> = (props) => {
  const { datas = [] } = props;

  return (
    <div className={styles.demo}>
      <div>Users</div>
    </div>
  );
};

export default memo(Users);
Users.displayName = 'Users';
