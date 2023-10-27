import { memo, useState } from 'react';
//type
import type { FC, SetStateAction } from 'react';
import styles from './index.module.scss';
import { ToastError, ToastSuccess, handleCopy } from '@/utils/common';
import { Button, Form, Modal, Popconfirm, Space, Table, Typography } from '@douyinfe/semi-ui';
import { IconDelete } from '@douyinfe/semi-icons';
import useSWR from 'swr';
import { deleteMemberById } from '@/api/modules/team';
import { fetcher } from '@/utils/http';
import useUserStore from '@/store/user';
import None from '@/components/dataAcquisition/None';
import Loading from '@/components/dataAcquisition/Loading';
import Failure from '@/components/dataAcquisition/Failure';
import Error from '@/components/dataAcquisition/Error';
import useTeamStore from '@/store/team';
import CustomAvatar from '@/components/CustomAvatar';

const { Text } = Typography;
const TeamUsers = () => {
  const [addVisible, setAddVisible] = useState(false);
  const { user } = useUserStore();
  const { teamId } = useTeamStore();
  const url = 'http://localhost:3000';
  const inviteLink = `${url}/workspace/teams/invitation?teamId=${teamId}`;
  const { data, isLoading, error, mutate } = useSWR(
    `/user/team/queryMemberPage?page=1&limit=10&id=${teamId}`,
    fetcher
  );

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
  const isEmpty = data.length === 0;

  const columns = [
    {
      title: '头像及昵称',
      width: 200,
      dataIndex: 'nickname',
      render: (text: string) => {
        return <Text ellipsis={{ showTooltip: true }}>{text}</Text>;
      }
    },
    {
      title: '头像',
      width: 200,
      dataIndex: 'img',
      render: (text: string, member: Member) => {
        return (
          <CustomAvatar
            id={member?.id}
            src={member?.img ?? ''}
            username={member?.nickname as string}
          />
        );
      }
    },
    {
      title: '账号邮箱',
      width: 400,
      dataIndex: 'username',
      render: (text: string) => {
        return <Text ellipsis={{ showTooltip: true }}>{text}</Text>;
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      // fixed: 'right',
      render: (id: string, record: any = {}) => {
        return (
          <Space>
            {/* <Button onClick={() => updateMemberOpenModal(record)}>更新</Button> */}
            <Popconfirm title="确定要删除该数据吗" onConfirm={() => handleDeleteMember(id)}>
              <Button style={{ color: '#f82c70' }} icon={<IconDelete />}></Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  const handleDeleteMember = (id: string) => {
    return new Promise((resolve, reject) => {
      deleteMemberById(id)
        .then(() => {
          ToastSuccess('删除成功');
          resolve(null);
          mutate();
        })
        .catch(() => {
          ToastError('删除失败');
          reject();
        });
    });
  };

  // const addMemberHandle = (values: any) => {
  //   const addForm = {
  //     userId: user?.id,
  //     personOrTeam: 0,
  //     ...values
  //   };

  //   addMember(addForm)
  //     .then(() => {
  //       mutate();
  //       ToastSuccess('添加成功');
  //     })
  //     .catch(() => {
  //       ToastError('添加失败');
  //     })
  //     .finally(() => {
  //       setAddVisible(false);
  //       setAddLoading(false);
  //     });
  // };

  return (
    <div className={styles.mailMember}>
      <div className={styles.header}>
        <Button onClick={() => setAddVisible(true)}>创建应用</Button>
      </div>
      {isEmpty ? (
        <None title={'无数据'} description={'请先创建数据'} />
      ) : (
        <Table
          columns={columns}
          // scroll={scroll}
          dataSource={data}
          //rowSelection={rowSelection}
          pagination={data.length > 10 ? { pageSize: 10 } : false}
          rowKey={(record) => record?.id ?? ''}
        />
      )}
      <Modal
        title={'邀请连接'}
        visible={addVisible}
        onCancel={() => setAddVisible(false)}
        onOk={() => handleCopy(inviteLink)}
        okText={'点击复制连接'}
        closeOnEsc
        width={400}
        zIndex={99}
      >
        <span style={{ color: '#06C05F', fontSize: 16 }}>{inviteLink}</span>
      </Modal>
    </div>
  );
};

export default memo(TeamUsers);
TeamUsers.displayName = 'TeamUsers';
