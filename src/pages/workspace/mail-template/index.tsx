import { memo } from 'react';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const mailTemplate: FC<IProps> = (props) => {
  const { datas = [] } = props;

  return (
    <div className={styles.mailTemplate}>
      <div>mailTemplate</div>
    </div>
  );
};

export default memo(mailTemplate);
mailTemplate.displayName = 'mailTemplate';
