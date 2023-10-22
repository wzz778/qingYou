import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button, Empty } from '@douyinfe/semi-ui';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
import { useRouter } from 'next/router';
interface IProps {
  title?: string;
  description?: string;
  router?: string;
}

const None: FC<IProps> = ({ title, description, router }) => {
  const { push } = useRouter();
  return (
    <div className={styles.None}>
      <Empty
        image={<IllustrationNoContent style={{ width: 250, height: 250 }} />}
        darkModeImage={<IllustrationNoContentDark style={{ width: 250, height: 250 }} />}
        title={title}
        description={description}
      >
        {router && (
          <Button onClick={() => push(router)} type="primary">
            二级按钮
          </Button>
        )}
      </Empty>
    </div>
  );
};

export default memo(None);
None.displayName = 'None';
