import { memo, useState } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import CronInput from '@/components/CronInput';
interface IProps {
  datas?: any[];
}

const ProjectList: FC<IProps> = (props) => {
  const { datas = [] } = props;
  let [value, setValue] = useState<string>();
  return (
    <div className={styles.ProjectList}>
      <CronInput onChange={(cron) => setValue(cron)} />
      <div>{value}</div>
    </div>
  );
};

export default memo(ProjectList);
ProjectList.displayName = 'ProjectList';
