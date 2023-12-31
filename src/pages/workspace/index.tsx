import { memo } from 'react';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
import useTeamStore from '@/store/team';
import { Empty, Typography } from '@douyinfe/semi-ui';
import { IllustrationSuccess, IllustrationSuccessDark } from '@douyinfe/semi-illustrations';
import useUserStore from '@/store/user';
interface IProps {
  datas?: any[];
}

const Workspace: FC<IProps> = (props) => {
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
            <span style={{ padding: '0px 8px', color: '#004C8E', fontSize: '20px' }}>
              {teamName}
            </span>
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
