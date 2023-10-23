import { memo, useEffect } from 'react';
// import classNames from "classnames";
import { ToastError } from '@/utils/common';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
import useTeamStore from '@/store/team';
interface IProps {
  datas?: any[];
}

const Workspace: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { teamName } = useTeamStore();
  return (
    <div className={styles.demo}>
      <div>{teamName}</div>
    </div>
  );
};

export default memo(Workspace);
Workspace.displayName = 'Workspace';
