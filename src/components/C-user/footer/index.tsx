import { memo } from 'react';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Footer: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.Footer}>
      <div>Footer</div>
    </div>
  );
};

export default memo(Footer);
Footer.displayName = 'Footer';
