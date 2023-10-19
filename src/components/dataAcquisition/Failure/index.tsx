import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Empty } from '@douyinfe/semi-ui';
import { IllustrationFailure, IllustrationFailureDark } from '@douyinfe/semi-illustrations';
interface IProps {
  title?: string;
  description?: string;
}

const Failure: FC<IProps> = ({ title, description }) => {
  return (
    <div className={styles.Failure}>
      <div>
        <Empty
          image={<IllustrationFailure style={{ width: 250, height: 250 }} />}
          darkModeImage={<IllustrationFailureDark style={{ width: 250, height: 250 }} />}
          title={title}
          description={description}
        />
      </div>
    </div>
  );
};

export default memo(Failure);
Failure.displayName = 'Failure';
