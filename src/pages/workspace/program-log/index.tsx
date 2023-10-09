import { memo, useEffect } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { getById } from '@/api/modules/users';
interface IProps {
  datas?: any[];
}
const ProjectLog: FC<IProps> = (props) => {
  const { datas = [] } = props;
  useEffect(() => {
    getById().then((res) => {
      console.log('res');
      console.log(res);
      console.log('res');
    });
  }, []);
  return (
    <div className={styles.ProjectLog}>
      <div>ProjectLog</div>
    </div>
  );
};

export default memo(ProjectLog);
ProjectLog.displayName = 'ProjectLog';
