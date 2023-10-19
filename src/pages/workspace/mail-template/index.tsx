import { memo, useState } from 'react';
//type
import type { FC, SetStateAction } from 'react';
import styles from './index.module.scss';
import { ToastError, ToastSuccess, execConfirm } from '@/utils/common';
import {
  Button,
  Empty,
  Form,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography
} from '@douyinfe/semi-ui';
import { IconDelete } from '@douyinfe/semi-icons';
import useSWR from 'swr';
import { deleteEmailTemplates, updateEmailTemplates } from '@/api/modules/email';
import { fetcher } from '@/utils/http';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
import title from '@douyinfe/semi-ui/lib/es/typography/title';
import useUserStore from '@/store/user';

const { Text } = Typography;
const MailTemplate = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<User>();
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [templateDetail, setTemplateDetail] = useState<Template>();
  const { user } = useUserStore();
  const { data, isLoading, error, mutate } = useSWR(
    `/email/templates/queryEmailTemplatesPersonal?page=1&limit=10&id=${user?.id}&personOrTeam=0`,
    fetcher
  );

  if (isLoading) return <div>数据列表获取中...</div>;
  if (error) return <div>数据列表获取失败</div>;
  if (!data) {
    return <div>数据错误</div>;
  }
  // const createProject = (values) => {
  //   setConfirmLoading(true);
  //   createProjectApi(values)
  //     .then((res) => {
  //       ToastSuccess('创建成功');
  //       setVisible(false);
  //       mutate();
  //     })
  //     .finally(() => {
  //       setConfirmLoading(false);
  //     });
  // };
  const { records } = data;
  const isEmpty = data.length === 0;

  const empty = () => (
    <Empty
      image={<IllustrationNoContent style={{ width: 150, height: 150 }} />}
      darkModeImage={<IllustrationNoContentDark style={{ width: 150, height: 150 }} />}
      title="无数据"
      description="请先创建数据"
    />
  );
  const columns = [
    {
      title: '标题',
      width: 200,
      dataIndex: 'emailTitle',
      render: (text: string) => {
        return <Text ellipsis={{ showTooltip: true }}>{text}</Text>;
      }
    },
    {
      title: '内容',
      width: 400,
      dataIndex: 'emailContent',
      render: (text: string) => {
        return <Text ellipsis={{ showTooltip: true }}>{text}</Text>;
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id: string, record: any) => {
        return (
          <Space>
            <Button onClick={() => updateTemplateOpenModal(record)}>更新</Button>
            <Popconfirm title="确定要删除该数据吗" onConfirm={() => handleDeleteTemplate(id)}>
              <Button style={{ color: '#f82c70' }} icon={<IconDelete />}></Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  const handleDeleteTemplate = (id: string) => {
    return new Promise((resolve, reject) => {
      deleteEmailTemplates(id)
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

  const updateTemplateOpenModal = (record: SetStateAction<Template | undefined>) => {
    setTemplateDetail(record);
    setUpdateVisible(true);
  };

  const updateTemplateHandle = (values: any) => {
    const records = {
      id: templateDetail?.id,
      userId: templateDetail?.userId,
      personOrTeam: 0,
      ...values
    };

    updateEmailTemplates(records)
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
  return (
    <div className={styles.mailTemplate}>
      {/* <div className={styles.header}>
        <div className={styles.headerTitle}>应用列表</div>
        <Button onClick={() => setVisible(true)}>创建应用</Button>
      </div> */}
      {isEmpty ? (
        empty()
      ) : (
        <Table
          columns={columns}
          dataSource={records}
          rowSelection={rowSelection}
          pagination={records.length > 10 ? { pageSize: 10 } : false}
          rowKey={(record) => record.id}
        />
      )}
      <Modal
        header={null}
        footer={null}
        visible={updateVisible}
        onCancel={() => setUpdateVisible(false)}
        closeOnEsc
        width={400}
        zIndex={99999}
      >
        <Form
          onSubmit={(values) => updateTemplateHandle(values)}
          style={{
            padding: '20px 10px'
          }}
        >
          {() => (
            <>
              <Form.Input
                field="emailTitle"
                label="标题"
                initValue={templateDetail?.emailTitle}
                style={{ width: '100%' }}
                placeholder="请输入内容"
                rules={[{ required: true, message: '请输入内容' }]}
              ></Form.Input>
              <Form.TextArea
                field="emailContent"
                label="内容"
                initValue={templateDetail?.emailContent}
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
    </div>
  );
};

export default memo(MailTemplate);
MailTemplate.displayName = 'mailTemplate';
