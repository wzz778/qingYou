import { memo } from 'react';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Mails: FC<IProps> = (props) => {
  const { datas = [] } = props;

  return (
    <div className={styles.Mails}>
      <div>Mails</div>
    </div>
  );
};

export default memo(Mails);
Mails.displayName = 'Mails';
