import { memo } from 'react';
import cName from 'classnames';

//type
import type { FC, ReactNode } from 'react';
import styles from './index.module.scss';

interface Props {
  children?: ReactNode;
  onclick?: any;
  className?: any;
}
const qButton: FC<Props> = ({ onclick, children, className }) => {
  return (
    <button className={cName([styles.qbutton, className])} onClick={onclick}>
      {children}
    </button>
  );
};

export default memo(qButton);
