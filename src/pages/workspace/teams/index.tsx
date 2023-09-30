import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
interface IProps {
  datas?: any[];
}

const Teams: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.Teams}>
      <div>Teams</div>
    </div>
  );
};

export default memo(Teams);
Teams.displayName = 'Teams';
