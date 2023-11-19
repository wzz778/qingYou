import { memo } from 'react';

//type
import type { FC } from 'react';
import styles from './index.module.scss';

interface IProps {
  datas?: any[];
}

const Admin: FC<IProps> = (props) => {
  return (
    <div className={styles.demo}>
      <div>Workspace</div>
    </div>
  );
};

export default memo(Admin);
Admin.displayName = 'Admin';
