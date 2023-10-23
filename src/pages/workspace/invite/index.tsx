import { memo, useEffect } from 'react';
// import classNames from "classnames";
import { ToastError } from '@/utils/common';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Invite: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.Invite}>
      <div>Invite</div>
    </div>
  );
};

export default memo(Invite);
Invite.displayName = 'Invite';
