import { memo, useEffect, useState } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import CronInput from '@/components/CronInput';
import AddSelect from '@/components/AddSelect';
interface IProps {
  datas?: any[];
}
const ProjectLog: FC<IProps> = (props) => {
  const { datas = [] } = props;
  let [date, setDate] = useState<string | null>();
  let [emails, setEmails] = useState<any>();
  return (
    <div className={styles.ProjectLog}>
      <CronInput initialCron="0 0 2 6,7 * ?" orChange />
      <CronInput onChange={(cron) => setDate(cron)} />
      {date}
      <AddSelect onChange={setEmails} />
    </div>
  );
};

export default memo(ProjectLog);
ProjectLog.displayName = 'ProjectLog';
