import { memo, useEffect } from 'react';
// import classNames from "classnames";
import { ToastError } from '@/utils/common';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
import useTeamStore from '@/store/team';
import { Button, Empty, Highlight, Typography } from '@douyinfe/semi-ui';
import { IllustrationSuccess, IllustrationSuccessDark } from '@douyinfe/semi-illustrations';
import useUserStore from '@/store/user';
interface IProps {
  datas?: any[];
}

const Workspace: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { teamName, teamId } = useTeamStore();
  const { user } = useUserStore();
  const { Text } = Typography;
  const welcomeBox = () => {
    return (
      <div>
        {teamId == '0' ? (
          <>
            <span className={styles.nickname}>{user?.nickname}</span> 欢迎进入{'   '}
            <Text
              style={{
                backgroundColor: '#00B658'
              }}
              className={styles.tag}
            >
              个人版
            </Text>
          </>
        ) : (
          <>
            <span className={styles.nickname}>{user?.nickname} </span>欢迎进入{'   '}
            <Text
              style={{
                backgroundColor: '#004C8E'
              }}
              className={styles.tag}
            >
              团队版
            </Text>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={styles.Workspace}>
      <Empty
        image={<IllustrationSuccess style={{ width: 250, height: 250 }} />}
        darkModeImage={<IllustrationSuccessDark style={{ width: 250, height: 250 }} />}
        title={'进入成功'}
        description={welcomeBox()}
      />
    </div>
  );
};

export default memo(Workspace);
Workspace.displayName = 'Workspace';
