import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Empty } from '@douyinfe/semi-ui';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
interface IProps {
  datas?: any[];
}

const None: FC<IProps> = (props) => {
  const { datas = [] } = props;
  return (
    <div className={styles.None}>
      <div>
        <Empty
          image={<IllustrationNoContent style={{ width: 150, height: 150 }} />}
          darkModeImage={<IllustrationNoContentDark style={{ width: 150, height: 150 }} />}
          title="无数据"
          description="请先创建数据"
        />
      </div>
    </div>
  );
};

export default memo(None);
None.displayName = 'None';
