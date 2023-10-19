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
      <div>
        <Empty
          image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
          darkModeImage={<IllustrationNoResultDark style={{ width: 150, height: 150 }} />}
          title={title}
          description={description}
        />
      </div>
    </div>
  );
};

export default memo(Error);
Error.displayName = 'Error';
