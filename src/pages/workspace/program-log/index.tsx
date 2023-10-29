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

  interface MemberListProps {
    nickname: string;
    username: string;
    img?: string;
  }

  const list: MemberListProps[] = [
    {
      nickname: '夏可漫',
      username: 'xiakeman@example.com'
    },
    {
      nickname: '曲晨一',
      username: 'quchenyi@example.com',
      img: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png'
    }
  ];

  return (
    <div className={styles.ProjectLog}>
      <CronInput initialCron="0 0 2 6,7 * ?" orChange />
      <CronInput onChange={(cron) => setDate(cron)} />
      {date}
      <AddSelect initialList={list} onChange={setEmails} />
    </div>
  );
};

export default memo(ProjectLog);
ProjectLog.displayName = 'ProjectLog';
