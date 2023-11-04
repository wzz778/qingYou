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
import { addEmailTemplates, deleteEmailTemplates, updateEmailTemplates } from '@/api/modules/email';
import { fetcher } from '@/utils/http';
import useUserStore from '@/store/user';
import None from '@/components/dataAcquisition/None';
import Loading from '@/components/dataAcquisition/Loading';
import Failure from '@/components/dataAcquisition/Failure';
import Error from '@/components/dataAcquisition/Error';
import { useRouter } from 'next/router';

interface SetSetTemplateProps {
  setTemplate: (data: any) => void;
}

const { Text } = Typography;

const SetTemplate: React.FC<SetSetTemplateProps> = ({ setTemplate }) => {
  const { user } = useUserStore();
  const [currentPage, setPage] = useState(1);
  const [limitPage, setLimitPage] = useState(5);
  const { push } = useRouter();
  const { data, isLoading, error, mutate } = useSWR(
    `/email/templates/queryEmailTemplatesPersonal?page=${currentPage}&limit=${limitPage}&id=${user?.id}&personOrTeam=0`,
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
  const { records } = data;
  const isEmpty = records.length === 0;

  const columns = [
    {
      title: '邮件标题',
      width: 150,
      dataIndex: 'emailTitle',
      render: (text: string) => {
        return <Text ellipsis={{ showTooltip: true }}>{text}</Text>;
      }
    },
    {
      title: '邮件内容',
      width: 380,
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
            <Button onClick={() => setTemplate(record)}>导入</Button>
          </Space>
        );
      }
    }
  ];
  const handlePageChange = (page: number) => {
    setPage(page);
    mutate();
  };
  return (
    <div className={styles.mailTemplate}>
      {isEmpty ? (
        <None
          title={'无数据'}
          description={'请先创建数据'}
          noneHandle={() => push('/workspace/mail-template')}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={records}
          // rowSelection={rowSelection}
          pagination={
            data.total > 5
              ? { currentPage, pageSize: 5, total: data.total, onPageChange: handlePageChange }
              : false
          }
          rowKey={(record) => record.id}
        />
      )}
    </div>
  );
};

export default memo(SetTemplate);
SetTemplate.displayName = 'mailTemplate';
