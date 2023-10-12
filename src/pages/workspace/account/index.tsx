import { memo, useEffect } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { tryPage } from '@/api/modules/email';
interface IProps {
  datas?: any[];
}

const Account: FC<IProps> = (props) => {
  const { datas = [] } = props;
  useEffect(() => {
    tryPage().then((res) => {
      console.log('res');
      console.log(res);
      console.log('res');
    });
  }, []);
  return (
    <div className={styles.Account}>
      <div>Account</div>
    </div>
  );
};

export default memo(Account);
Account.displayName = 'Account';
