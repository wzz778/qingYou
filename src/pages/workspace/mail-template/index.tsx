import { memo } from 'react';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { execConfirm } from '@/utils/common';
import { Button } from '@douyinfe/semi-ui';
interface IProps {
  datas?: any[];
}

const mailTemplate: FC<IProps> = (props) => {
  const { datas = [] } = props;
  async function deleteItem() {
    // 执行删除操作
    console.log('执行删除操作');
  }

  const trys = () => {
    console.log('133');

    execConfirm(deleteItem, undefined, '34');
  };
  return (
    <div className={styles.mailTemplate}>
      <div>
        mailTemplate
        <div>
          <Button onClick={trys}>1111 </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(mailTemplate);
mailTemplate.displayName = 'mailTemplate';
