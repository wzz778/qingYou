import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Empty } from '@douyinfe/semi-ui';
import { IllustrationNoResult, IllustrationNoResultDark } from '@douyinfe/semi-illustrations';
interface IProps {
  title?: string;
  description?: string;
}

const Error: FC<IProps> = ({ title, description }) => {
  return (
    <div className={styles.Error}>
      <Empty
        image={<IllustrationNoResult style={{ width: 250, height: 250 }} />}
        darkModeImage={<IllustrationNoResultDark style={{ width: 250, height: 250 }} />}
        title={title}
        description={description}
      />
    </div>
  );
};

export default memo(Error);
Error.displayName = 'Error';
