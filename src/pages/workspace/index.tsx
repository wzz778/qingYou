import { memo, useEffect } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { queryEmailTemplatesPage } from '@/api/modules/email';
import axios from 'axios';
interface IProps {
  datas?: any[];
}

const Workspace: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.demo}>
      <div>Workspace</div>
    </div>
  );
};

export default memo(Workspace);
Workspace.displayName = 'Workspace';
