import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const ProjectList: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.ProjectList}>
      <div>ProjectList</div>
    </div>
  );
};

export default memo(ProjectList);
ProjectList.displayName = 'ProjectList';
