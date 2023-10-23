import { memo, useEffect } from 'react';
// import classNames from "classnames";
import { ToastError } from '@/utils/common';
import { useRouter } from 'next/router';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Invitation: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const router = useRouter();
  const { query } = router;
  return (
    <div className={styles.Invitation}>
      <div>查询参数: {JSON.stringify(query)}</div>
    </div>
  );
};

export default memo(Invitation);
Invitation.displayName = 'Invitation';
