import { memo } from 'react';
// import classNames from "classnames";
import { ToastError, ToastSuccess, execConfirm } from '@/utils/common';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button, Empty, Typography } from '@douyinfe/semi-ui';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
import { useRouter } from 'next/router';
import Loading from '@/components/dataAcquisition/Loading';
import Failure from '@/components/dataAcquisition/Failure';
import Error from '@/components/dataAcquisition/Error';
import { fetcher } from '@/utils/http';
import useSWR from 'swr';
import { addMember } from '@/api/modules/team';
import useUserStore from '@/store/user';
interface IProps {
  datas?: any[];
}

const Invitation: FC<IProps> = (props) => {
  const { query, push } = useRouter();
  const { user } = useUserStore();
  const { data, isLoading, error } = useSWR(`user/team/queryTeamById/${query.teamId}`, fetcher);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error)
    return (
      <div>
        <Failure title={'请求失败！'} />
      </div>
    );
  if (!data) {
    return (
      <div>
        <Error title={'请求出错！'} />
      </div>
    );
  }
  if (!data) {
    return <div>数据错误</div>;
  }

  const addTeam = async () => {
    const res = await addMember({ teamId: data?.id, memberEmail: user?.username });
    if (res.code == 200) {
      const { id, teamName } = data;
      localStorage.setItem('qyTeamId', id);
      localStorage.setItem('qyTeamName', teamName);
      ToastSuccess('加入成功！');
      window.location.href = '/workspace';
    } else {
      ToastError(res.msg);
    }
  };
  const { Text } = Typography;
  const inviteBox = () => {
    return (
      <div>
        <span className={styles.nickname}>{data.nickname}</span>
        {'    '}邀请你进入
        <Text className={styles.tag}>{data?.teamName}</Text>
        团队
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: 12 }}
        >
          <Button
            type="primary"
            theme="solid"
            onClick={() =>
              execConfirm(() => addTeam(), undefined, `确定要加入   ${data?.teamName}  团队吗？`)
            }
          >
            立刻加入
          </Button>
          <Button type="danger" onClick={() => push('/workspace')}>
            拒绝加入
          </Button>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.Invitation}>
      <Empty
        image={<IllustrationNoContent style={{ width: 200, height: 200 }} />}
        darkModeImage={<IllustrationNoContentDark style={{ width: 250, height: 250 }} />}
        title={`加入团队`}
        description={inviteBox()}
      />
    </div>
  );
};

export default memo(Invitation);
Invitation.displayName = 'Invitation';
