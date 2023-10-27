import { memo, useEffect, useState } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import CronInput from '@/components/CronInput';
interface IProps {
  datas?: any[];
}
const ProjectLog: FC<IProps> = (props) => {
  const { datas = [] } = props;
  let [date, setDate] = useState<string>();
  return (
    <div className={styles.ProjectLog}>
      <CronInput initialCron="0 0 2 2,14 * ?" orChange onChange={(cron) => setDate(cron)} />
    </div>
  );
};

export default memo(ProjectLog);
ProjectLog.displayName = 'ProjectLog';
