import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Empty } from '@douyinfe/semi-ui';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
interface IProps {
  title?: string;
  description?: string;
}

const None: FC<IProps> = ({ title, description }) => {
  return (
    <div className={styles.None}>
      <div>
        <Empty
          image={<IllustrationNoContent style={{ width: 250, height: 250 }} />}
          darkModeImage={<IllustrationNoContentDark style={{ width: 250, height: 250 }} />}
          title={title}
          description={description}
        />
      </div>
    </div>
  );
};

export default memo(None);
None.displayName = 'None';
