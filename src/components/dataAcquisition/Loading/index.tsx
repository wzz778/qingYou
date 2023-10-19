import { memo } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Empty, Spin } from '@douyinfe/semi-ui';
import {
  IllustrationConstruction,
  IllustrationConstructionDark
} from '@douyinfe/semi-illustrations';
interface IProps {
  title?: string;
  description?: string;
}

const Loading: FC<IProps> = ({ title, description }) => {
  return (
    <div className={styles.Loading}>
      <div>
        <Spin delay={1000} tip="努力加载中..." size="large" spinning={true}>
          <Empty
            image={<IllustrationConstruction style={{ width: 250, height: 250 }} />}
            darkModeImage={<IllustrationConstructionDark style={{ width: 250, height: 250 }} />}
            title={title}
            description={description}
          />
        </Spin>
      </div>
    </div>
  );
};

export default memo(Loading);
Loading.displayName = 'Loading';
