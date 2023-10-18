import { memo } from 'react';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { execConfirm } from '@/utils/common';
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
      <div>Mails</div>
    </div>
  );
};

export default memo(Mails);
Mails.displayName = 'Mails';
