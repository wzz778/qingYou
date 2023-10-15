import { memo, useEffect } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Account: FC<IProps> = (props) => {
  const { datas = [] } = props;
  useEffect(() => {}, []);
  return (
    <div className={styles.Account}>
      <div>Account</div>
    </div>
  );
};

export default memo(Account);
Account.displayName = 'Account';
