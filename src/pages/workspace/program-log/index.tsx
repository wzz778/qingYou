import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const ProjectLog: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.ProjectLog}>
      <div>ProjectLog</div>
    </div>
  );
};

export default memo(ProjectLog);
ProjectLog.displayName = 'ProjectLog';
