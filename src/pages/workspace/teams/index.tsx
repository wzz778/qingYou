import { createRef, memo, useRef, useState } from 'react';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { ToastError, ToastSuccess, execConfirm } from '@/utils/common';
import Loading from '@/components/dataAcquisition/Loading';
import Failure from '@/components/dataAcquisition/Failure';
import Error from '@/components/dataAcquisition/Error';
import None from '@/components/dataAcquisition/None';
import { Button, Card, CardGroup, Form, Modal, Typography } from '@douyinfe/semi-ui';
import useUserStore from '@/store/user';
import useSWR from 'swr';
import { fetcher } from '@/utils/http';
import { IconBeaker, IconLink } from '@douyinfe/semi-icons';
import { addTeam, deleteTeam, updateTeam } from '@/api/modules/team';
import useTeamStore from '@/store/team';
interface IProps {
  datas?: any[];
}

const Teams: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { user } = useUserStore();
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [uploadId, setuploadId] = useState<string>('0');
  const [addVisible, setAddVisible] = useState(false);
  const [programDetail, setTeamDetail] = useState<Team>();
  const testFormRef = useRef<any>();
  const { team, updateTeams } = useTeamStore();
  const { Text } = Typography;
  if (!team) {
    return <div>数据错误</div>;
  }
  if (!user) {
    return <div>数据错误</div>;
  }
  const isEmpty = team.length === 0;

  const toUploadFrom = (data: Team) => {
    setuploadId(data.id);
    setAddVisible(true);
    setTeamDetail(data);
  };

  const addTemplateHandle = (values: any) => {
    setAddLoading(true);
    if (uploadId !== '0') {
      values.id = uploadId;
    }
    const addForm = {
      teamManager: user?.id,
      ...values
    };
    const requestApi = uploadId == '0' ? addTeam : updateTeam;
    requestApi(addForm)
      .then(() => {
        updateTeams(user?.id);
        ToastSuccess(`${!uploadId ? '增加' : '更新'}成功`);
      })
      .catch(() => {
        ToastError(`${!uploadId ? '增加' : '更新'}失败`);
      })
      .finally(() => {
        setAddVisible(false);
        setAddLoading(false);
      });
  };

  const deleteTemplateHandle = async () => {
    setDeleteLoading(false);
    deleteTeam(uploadId)
      .then(() => {
        updateTeams(user?.id);
        ToastSuccess(`删除成功`);
      })
      .catch(() => {
        ToastError(`删除失败`);
      })
      .finally(() => {
        setAddVisible(false);
        setDeleteLoading(false);
      });
  };

  return (
    <div className={styles.Teams}>
      <div className={styles.header}>
        <Button
          onClick={() => {
            setAddVisible(true);
            setuploadId('0');
            setTeamDetail(undefined);
          }}
        >
          创建团队
        </Button>
      </div>

      {isEmpty ? (
        <None title={'无数据'} description={'请先创建数据'} />
      ) : (
        <CardGroup spacing={10}>
          {team.map((item: Team) => (
            <div key={item.id} onClick={() => toUploadFrom(item)}>
              <Card
                shadows="hover"
                title={item.teamName}
                headerLine={false}
                style={{ width: 300 }}
                headerExtraContent={
                  <Text onClick={() => toUploadFrom(item)} style={{ color: '#06C05F' }}>
                    操作
                  </Text>
                }
              >
                <Text>{item.teamNotes}</Text>
              </Card>
            </div>
          ))}
        </CardGroup>
      )}

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
          onSubmit={(values) => addTemplateHandle(values)}
          getFormApi={(formApi) => (testFormRef.current = formApi)}
          style={{
            padding: '20px 10px'
          }}
          render={({ formState, formApi, values }) => (
            <>
              <Form.Input
                field="teamName"
                label="团队名称"
                initValue={programDetail?.teamName}
                style={{ width: '100%' }}
                placeholder="请输入内容"
                rules={[{ required: true, message: '请输入内容' }]}
              ></Form.Input>
              <Form.TextArea
                field="teamNotes"
                label="团队介绍"
                style={{ width: '100%' }}
                placeholder="请输入内容"
                initValue={programDetail?.teamNotes}
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
                  {uploadId == '0' ? '增加' : '更新'}
                </Button>
                {uploadId !== '0' && (
                  <Button
                    type="danger"
                    loading={deleteLoading}
                    theme="solid"
                    style={{
                      width: '100%',
                      marginTop: '6px'
                    }}
                    onClick={() =>
                      execConfirm(deleteTemplateHandle, undefined, '你确确定要删除这项团队配置？')
                    }
                  >
                    删除
                  </Button>
                )}
              </div>
            </>
          )}
        />
      </Modal>
    </div>
  );
};

export default memo(Teams);
Teams.displayName = 'Teams';
