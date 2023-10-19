import { memo } from 'react';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { execConfirm } from '@/utils/common';
import Loading from '@/components/dataAcquisition/Loading';
import Failure from '@/components/dataAcquisition/Failure';
import Error from '@/components/dataAcquisition/Error';
import None from '@/components/dataAcquisition/None';

interface IProps {
  datas?: any[];
}

const Mails: FC<IProps> = (props) => {
  const { datas = [] } = props;
  async function deleteItem() {
    // 执行删除操作
    console.log('执行删除操作');
  }

  const trys = () => {
    execConfirm(deleteItem, undefined, '34');
  };
  return (
    <div className={styles.Mails}>
      <div>
        <Loading />
        <hr />
        <Failure />
        <hr />
        <Error />
        <hr />
        <None title={'sda'} description={'请先创建数据'} />
      </div>
    </div>
  );
};

export default memo(Mails);
Mails.displayName = 'Mails';
