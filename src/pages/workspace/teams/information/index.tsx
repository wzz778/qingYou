import { memo, useEffect, useState } from 'react';
// import classNames from "classnames";
import { ToastSuccess } from '@/utils/common';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button, Empty } from '@douyinfe/semi-ui';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
import { useRouter } from 'next/router';
import Loading from '@/components/dataAcquisition/Loading';
import Failure from '@/components/dataAcquisition/Failure';
import Error from '@/components/dataAcquisition/Error';
import None from '@/components/dataAcquisition/None';
import { fetcher } from '@/utils/http';
import useSWR from 'swr';
import { addMember } from '@/api/modules/team';
import useUserStore from '@/store/user';
interface IProps {
  datas?: any[];
}

const Information: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { query, push } = useRouter();
  const [teamFrom, setTeamFrom] = useState<Team>();
  const { user } = useUserStore();
  if (!query.teamId) {
    // ToastError('错误！');
  }
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
  } else {
    console.log(data);
    setTeamFrom(data);
  }
  const addTeam = async () => {
    const res = await addMember({ teamId: teamFrom?.id, memberId: user?.id });
    if (res.code == 200) {
      ToastSuccess('加入成功！');
    } else {
      console.log(res);

      // ToastError('加入失败！');
    }
  };

  return (
    <div className={styles.demo}>
      <div>
        <Empty
          image={<IllustrationNoContent style={{ width: 200, height: 200 }} />}
          darkModeImage={<IllustrationNoContentDark style={{ width: 250, height: 250 }} />}
          title={`加入团队`}
          description={`邀请你加入   ${teamFrom?.teamName}   的团队`}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
            <Button type="primary" theme="solid" onClick={addTeam}>
              立刻加入
            </Button>
            <Button type="danger" onClick={() => push('/workspace')}>
              拒绝加入
            </Button>
          </div>
        </Empty>
      </div>
    </div>
  );
};

export default memo(Information);
Information.displayName = 'Information';
