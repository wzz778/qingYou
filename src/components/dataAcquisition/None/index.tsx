import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button, Empty } from '@douyinfe/semi-ui';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
interface IProps {
  title?: string;
  description?: string;
  noneHandle?: () => void;
}

const None: FC<IProps> = ({ title, description, noneHandle }) => {
  return (
    <div className={styles.None}>
      <Empty
        image={<IllustrationNoContent style={{ width: 250, height: 250 }} />}
        darkModeImage={<IllustrationNoContentDark style={{ width: 250, height: 250 }} />}
        title={title}
        description={description}
      >
        {noneHandle && (
          <Button onClick={() => noneHandle()} type="primary">
            创建数据
          </Button>
        )}
      </Empty>
    </div>
  );
};

export default memo(None);
None.displayName = 'None';
