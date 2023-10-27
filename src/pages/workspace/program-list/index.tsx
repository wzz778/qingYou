import { memo, useState } from 'react';
//type
import type { FC, SetStateAction } from 'react';
import styles from './index.module.scss';
import { ToastError, ToastSuccess, execConfirm } from '@/utils/common';
import {
  Button,
  Descriptions,
  Empty,
  Form,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Typography
} from '@douyinfe/semi-ui';
import { IconDelete } from '@douyinfe/semi-icons';
import useSWR from 'swr';
import {
  addEmailProgram,
  deleteEmailProgram,
  updateEmailProgram,
  pauseEmailProgram,
  beginEmailProgram
} from '@/api/modules/dispatch';
import { fetcher } from '@/utils/http';
import useUserStore from '@/store/user';
import None from '@/components/dataAcquisition/None';
import Loading from '@/components/dataAcquisition/Loading';
import Failure from '@/components/dataAcquisition/Failure';
import Error from '@/components/dataAcquisition/Error';
import { useRouter } from 'next/router';

const { Text } = Typography;
const ProjectList = () => {
  const { push } = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<User>();
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [programDetail, setProgramDetail] = useState<Program>();
  const { user } = useUserStore();
  const { data, isLoading, error, mutate } = useSWR(
    `/email/mail/queryTimedMail?userId=${user?.id}&page=1&limit=10`,
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
  if (!data) {
    return <div>数据错误</div>;
  }
  const isEmpty = data.length === 0;

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: 120,
      render: (text: string) => {
        return <Text ellipsis={{ showTooltip: true }}>{text}</Text>;
      }
    },
    {
      title: '内容',
      width: 180,
      dataIndex: 'emailContent',
      render: (text: string) => {
        return <Text ellipsis={{ showTooltip: true }}>{text}</Text>;
      }
    },
    {
      title: '发送邮箱',
      width: 170,
      dataIndex: 'accountEmail',
      render: (text: string) => {
        return <Text ellipsis={{ showTooltip: true }}>{text}</Text>;
      }
    },
    {
      title: '上线状态',
      width: 120,
      dataIndex: 'status',
      render: (text: string, record: any) => {
        return (
          <Switch
            defaultChecked={text == '0' ? true : false}
            checkedText="开"
            loading={statusLoading}
            onChange={(checked) => handleChangeStatus(checked, record.id)}
            uncheckedText="关"
          />
        );
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      fixed: 'right',
      width: 150,
      align: 'center',
      render: (id: string, record: any) => {
        return (
          <Space>
            <Button onClick={() => updateProgramOpenModal(record)}>更新</Button>
            <Popconfirm title="确定要删除该数据吗" onConfirm={() => handleDeleteProgram(id)}>
              <Button style={{ color: '#f82c70' }} icon={<IconDelete />}></Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  const handleChangeStatus = (checked: boolean, id: string) => {
    setStatusLoading(true);
    const request = checked ? beginEmailProgram : pauseEmailProgram;
    request({ mailId: id })
      .then((res) => {
        if (res.code == 200) {
          ToastSuccess('修改成功');
        } else {
          ToastError('修改失败');
        }
      })
      .catch((err) => {
        ToastError('修改失败');
      })
      .finally(() => {
        setStatusLoading(false);
      });
  };

  const handleDeleteProgram = (id: string) => {
    return new Promise((resolve, reject) => {
      deleteEmailProgram(id)
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

  const rowSelection = {
    onChange: (_: any, selectedRows: any) => {
      setSelectedRowKeys(selectedRows);
    }
  };

  const updateProgramOpenModal = (record: SetStateAction<Program | undefined>) => {
    setProgramDetail(record);
    setUpdateVisible(true);
  };

  const updateProgramHandle = (values: any) => {
    const data = {
      id: programDetail?.id,
      userId: programDetail?.userId,
      personOrTeam: 0,
      ...values
    };

    updateEmailProgram(data)
      .then(() => {
        mutate();
        ToastSuccess('更新成功');
      })
      .catch(() => {
        ToastError('更新失败');
      })
      .finally(() => {
        setUpdateVisible(false);
        setUpdateLoading(false);
      });
  };

  const addProgramHandle = (values: any) => {
    const addForm = {
      userId: user?.id,
      personOrTeam: 0,
      ...values
    };

    addEmailProgram(addForm)
      .then(() => {
        mutate();
        ToastSuccess('添加成功');
      })
      .catch(() => {
        ToastError('添加失败');
      })
      .finally(() => {
        setAddVisible(false);
        setAddLoading(false);
      });
  };
  const expandRowRender = (record: any, index: any) => {
    const { toMail, regularTime, sendMailName } = record;
    const newObj = {
      接收邮箱: toMail,
      定时发送时间: regularTime,
      发送人昵称: sendMailName
    };
    const result: KeyValuePair[] = Object.entries(newObj).map(([key, value]) => ({
      key,
      value
    }));
    return <Descriptions style={{ width: '100%' }} align="left" data={result} />;
  };
  return (
    <div className={styles.mailProgram}>
      <div className={styles.header}>
        <Button onClick={() => push('/workspace/program')}>创建应用</Button>
      </div>
      {isEmpty ? (
        <None title={'无数据'} noneHandle={() => push('/workspace/program')} />
      ) : (
        <Table
          columns={columns as any}
          dataSource={data}
          rowSelection={rowSelection}
          expandedRowRender={expandRowRender}
          pagination={data.length > 10 ? { pageSize: 10 } : false}
          rowKey={(record) => record?.id}
        />
      )}
      <Modal
        header={null}
        footer={null}
        visible={updateVisible}
        onCancel={() => setUpdateVisible(false)}
        closeOnEsc
        width={400}
        zIndex={99}
      >
        <Form
          onSubmit={(values) => updateProgramHandle(values)}
          style={{
            padding: '20px 10px'
          }}
        >
          {() => (
            <>
              <Form.Input
                field="emailTitle"
                label="标题"
                initValue={programDetail?.accountEmail}
                style={{ width: '100%' }}
                placeholder="请输入内容"
                rules={[{ required: true, message: '请输入内容' }]}
              ></Form.Input>
              <Form.TextArea
                field="emailContent"
                label="内容"
                initValue={programDetail?.createTime}
                style={{ width: '100%' }}
                placeholder="请输入内容"
                rules={[{ required: true, message: '请输入内容' }]}
              ></Form.TextArea>
              <div
                style={{
                  width: '70%',
                  margin: '0 auto',
                  marginTop: 20
                }}
              >
                <Button
                  htmlType="submit"
                  type="primary"
                  theme="solid"
                  loading={updateLoading}
                  style={{
                    width: '100%'
                  }}
                >
                  更新
                </Button>
              </div>
            </>
          )}
        </Form>
      </Modal>
      <Modal
        header={null}
        footer={null}
        visible={addVisible}
        onCancel={() => setAddVisible(false)}
        closeOnEsc
        width={400}
        zIndex={99}
      >
        <Form
          onSubmit={(values) => addProgramHandle(values)}
          style={{
            padding: '20px 10px'
          }}
        >
          {() => (
            <>
              <Form.Input
                field="emailTitle"
                label="标题"
                style={{ width: '100%' }}
                placeholder="请输入内容"
                rules={[{ required: true, message: '请输入内容' }]}
              ></Form.Input>
              <Form.TextArea
                field="emailContent"
                label="内容"
                style={{ width: '100%' }}
                placeholder="请输入内容"
                rules={[{ required: true, message: '请输入内容' }]}
              ></Form.TextArea>
              <div
                style={{
                  width: '70%',
                  margin: '0 auto',
                  marginTop: 20
                }}
              >
                <Button
                  htmlType="submit"
                  type="primary"
                  theme="solid"
                  loading={addLoading}
                  style={{
                    width: '100%'
                  }}
                >
                  添加
                </Button>
              </div>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default memo(ProjectList);
ProjectList.displayName = 'ProjectList';
