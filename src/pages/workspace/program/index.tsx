import { memo, useState, useRef, useEffect } from 'react';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Form, Button, Space, ArrayField, Modal, Upload } from '@douyinfe/semi-ui';
import CronInput from '@/components/CronInput';
import React from 'react';
import { IconMinusCircle, IconPlusCircle, IconVoteVideoStroked } from '@douyinfe/semi-icons';
import { ToastError, ToastInfo, ToastSuccess, ToastWaring } from '@/utils/common';
import { sendMail } from '@/api/modules/email';
import useUserStore from '@/store/user';
import { addEmailProgram } from '@/api/modules/dispatch';
import useSWR from 'swr';
import { fetcher } from '@/utils/http';
import Loading from '@/components/dataAcquisition/Loading';
import Failure from '@/components/dataAcquisition/Failure';
import Error from '@/components/dataAcquisition/Error';
import None from '@/components/dataAcquisition/None';
import { useRouter } from 'next/router';
import SetTemplate from '../mail-template/setTemplate';
import useTeamStore from '@/store/team';
import AddSelect from '@/components/AddSelect';
import { queryMemberPage } from '@/api/modules/team';
import TextHelper from '@/ai/components/TextHelper';
import useMount from '@/hooks/useMount';
interface IProps {
  datas?: any[];
}
interface initValueRoot {
  title?: string;
  content?: string;
}
interface MemberListProps {
  nickname: string;
  username: string;
  img?: string;
}
const Program: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { Select, Switch } = Form;
  const { user } = useUserStore();
  const { teamId } = useTeamStore();
  const { push } = useRouter();
  let [date, setDate] = useState<string>();
  const [addVisible, setAddVisible] = useState(false);
  const [aiVisible, setAiVisible] = useState(false);
  const [testLoading, setTestVisible] = useState(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [receiveMailData, setReceiveMailData] = useState<string[]>(['@qq.com']);
  const [receiveMails, setReceiveMails] = useState<any>([]);
  const [allReceiveMails, setAllReceiveMails] = useState<MemberListProps[]>([]);
  const formRef = useRef<any>();
  const getInitialList = () => {
    queryMemberPage({ id: teamId, limit: 20, page: 1 })
      .then((res) => {
        if (res.code == 200) {
          const memberList: MemberListProps[] = res.data.records.map(
            (item: { nickname: any; username: any; img: any }) => ({
              nickname: item.nickname,
              username: item.username,
              img: item.img
            })
          );
          setAllReceiveMails(memberList);
        } else {
          throw '成员获取失败';
        }
      })
      .catch(() => {
        setAllReceiveMails([]);
      });
  };
  useMount(() => {
    if (teamId != '0') {
      getInitialList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  const { data, isLoading, error } = useSWR(
    `/email/config/queryEmailConfigPersonal?page=1&limit=10&id=${user?.id}`,
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
  const { records } = data;
  const isEmpty = records.length === 0;
  const addTemplateHandle = (data: any) => {
    if (teamId != '0') {
      if (receiveMails.length == 0) {
        ToastInfo('请选择接收的邮箱');
        return;
      } else {
        data.receiveMail = receiveMails;
      }
    }
    const mailForm = new FormData();
    mailForm.append('accountEmail', data.accountEmail);
    mailForm.append('title', data.title);
    mailForm.append('content', data.content);
    if (data.sendMailName) {
      mailForm.append('sendMailName', data.sendMailName);
    } else {
      mailForm.append('sendMailName', '青邮');
    }
    if (data.files) {
      mailForm.append('files', data.files[0].fileInstance);
    }

    mailForm.append('receiveMailName', '青邮');

    for (const i in data.receiveMail) {
      mailForm.append('receiveMail', data.receiveMail[i]);
    }
    if (data.open) {
      setAddLoading(true);
      if (!date) {
        ToastWaring('请选择您要设置定时发送邮件的时间');
        setAddLoading(false);
        return;
      } else {
        mailForm.append('cron', date);
        if (user) {
          mailForm.append('userId', user?.id);
        }
        if (teamId != '0') {
          mailForm.append('personOrTeam', '1');
          mailForm.append('teamId', teamId);
        } else {
          mailForm.append('personOrTeam', '0');
        }
        addEmailProgram(mailForm)
          .then((res: any) => {
            if (res.code == '200') {
              ToastSuccess('设置成功');
            } else {
              ToastError('设置失败');
            }
          })
          .catch((error: any) => {
            console.log(error);
          })
          .finally(() => {
            setAddLoading(false);
            formRef.current.reset();
          });
      }
    } else {
      setAddLoading(true);
      sendMail(mailForm)
        .then((res: any) => {
          if (res.code == '200') {
            ToastSuccess('发送成功');
            formRef.current.reset();
          } else {
            ToastError('发送失败，请检查您配置的邮箱是否正确');
          }
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
          setAddLoading(false);
        });
    }
  };
  const testHandle = (formApi: any) => {
    formApi.validate().then(() => {
      setTestVisible(true);
      let data = formApi.getValue();
      const mailForm = new FormData();
      mailForm.append('accountEmail', data.accountEmail);
      mailForm.append('title', data.title);
      mailForm.append('content', data.content);
      if (data.sendMailName) {
        mailForm.append('sendMailName', data.sendMailName);
      } else {
        mailForm.append('sendMailName', '青邮');
      }
      mailForm.append('receiveMailName', '青邮');
      mailForm.append('receiveMail', data.receiveMail[0]);

      sendMail(mailForm)
        .then((res: any) => {
          if (res.code == '200') {
            ToastSuccess('发送成功');
          } else {
            ToastError('发送失败');
          }
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
          setTestVisible(false);
        });
    });
  };

  const addTem = (res: Template) => {
    formRef.current.setValue('title', res.emailTitle);
    formRef.current.setValue('content', res.emailContent);
    setAddVisible(false);
  };
  return (
    <div className={styles.Project}>
      {isEmpty ? (
        <None title={'无绑定邮箱'} noneHandle={() => push('/workspace/mails')} />
      ) : (
        <>
          <div className={styles.header}>
            <Button theme="solid" onClick={() => push('/workspace/mails')}>
              添加绑定邮箱
            </Button>
            <Button type="secondary" style={{ marginLeft: 10 }} onClick={() => setAddVisible(true)}>
              导入邮件模板
            </Button>
            <Button
              type="secondary"
              theme="solid"
              style={{ marginLeft: 10 }}
              icon={<IconVoteVideoStroked />}
              onClick={() => setAiVisible(true)}
            >
              Ai生成正文
            </Button>
          </div>
          <Form
            labelWidth="100px"
            labelPosition="left"
            labelAlign="right"
            getFormApi={(formApi) => (formRef.current = formApi)}
            onSubmit={(values) => addTemplateHandle(values)}
          >
            {({ formState, values, formApi }) => (
              <>
                <Select
                  field="accountEmail"
                  label={{ text: '邮箱选择', required: true }}
                  rules={[{ required: true, message: '请选选择内容' }]}
                  style={{ width: '100%' }}
                >
                  {records.map((item: Program) => {
                    return (
                      <Select.Option key={item.id} value={item.accountEmail}>
                        {item.accountEmail}
                      </Select.Option>
                    );
                  })}
                </Select>
                <Form.Input
                  field="title"
                  label={{ text: '邮件主题', required: true }}
                  style={{ width: '100%' }}
                  rules={[{ required: true, message: '请输入内容' }]}
                  maxLength={20}
                />
                <Form.TextArea
                  field="content"
                  label={{ text: '邮件正文', required: true }}
                  rules={[{ required: true, message: '请输入内容' }]}
                  style={{ width: '100%' }}
                  maxCount={400}
                />
                {teamId != '0' ? (
                  <Form.Slot label={{ text: '接收邮箱', required: true }}>
                    <AddSelect initialList={allReceiveMails} onChange={setReceiveMails} />
                  </Form.Slot>
                ) : (
                  <ArrayField field="receiveMail" initValue={receiveMailData}>
                    {({ add, arrayFields }) => (
                      <>
                        {arrayFields.map(({ field, key, remove }, i) => (
                          <div key={key} style={{ width: 1000, display: 'flex' }}>
                            <Form.Input
                              field={`${field}`}
                              label={`收件人 ${i + 1} 邮箱`}
                              placeholder={'请输入接收人的邮箱，如：42342@qq.com'}
                              style={{ width: 400 }}
                              rules={[
                                { required: true, message: '请输入内容' },
                                {
                                  pattern:
                                    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                  message: '邮箱格式不正确'
                                }
                              ]}
                            />
                            {arrayFields.length !== 1 && (
                              <Button
                                type="danger"
                                theme="borderless"
                                icon={<IconMinusCircle />}
                                onClick={remove}
                                style={{ margin: 12 }}
                              />
                            )}
                          </div>
                        ))}
                        {arrayFields.length !== 3 && (
                          <Button
                            onClick={add}
                            icon={<IconPlusCircle />}
                            theme="light"
                            style={{ marginLeft: 120 }}
                          >
                            添加收件人
                          </Button>
                        )}
                      </>
                    )}
                  </ArrayField>
                )}
                <Switch
                  field="open"
                  label={{ text: '定时邮箱', required: true }}
                  checkedText="开"
                  uncheckedText="关"
                ></Switch>
                {formState.values.open ? (
                  <Form.Slot label={{ text: '时间选择', required: true }}>
                    <CronInput onChange={(cron) => setDate(cron)} />
                  </Form.Slot>
                ) : (
                  <Form.Upload
                    action="https://api.semi.design/upload"
                    field="files"
                    style={{ width: 250 }}
                    label={{ text: '邮件附件' }}
                    limit={1}
                    maxSize={1024 * 10}
                    draggable={true}
                    dragMainText={'点击上传文件或拖拽文件到这里'}
                    dragSubText="支持任意类型文件"
                  ></Form.Upload>
                )}
                <Form.Input
                  field="sendMailName"
                  label={{ text: '发件人称呼' }}
                  style={{ width: '100%' }}
                  maxLength={15}
                />
                <Space>
                  <Button
                    type="primary"
                    theme="solid"
                    htmlType="submit"
                    loading={addLoading}
                    style={{ width: 120, marginTop: 12, marginLeft: 120 }}
                  >
                    发送{formState.values.open ? '定时邮箱' : '邮箱'}
                  </Button>
                  {formState.values.open ? (
                    <Button
                      style={{ marginTop: 12 }}
                      onClick={() => testHandle(formApi)}
                      loading={testLoading}
                    >
                      测试发送
                    </Button>
                  ) : null}
                </Space>
              </>
            )}
          </Form>
          <Modal
            title={'导入邮箱模板'}
            footer={null}
            visible={addVisible}
            onCancel={() => setAddVisible(false)}
            closeOnEsc
            width={700}
            zIndex={99}
          >
            {addVisible && <SetTemplate setTemplate={(res) => addTem(res)} />}
          </Modal>
          <Modal
            title={'Ai正文助手'}
            footer={null}
            visible={aiVisible}
            onCancel={() => setAiVisible(false)}
            closeOnEsc
            width={'95vw'}
            zIndex={99}
          >
            <TextHelper />
          </Modal>
        </>
      )}
    </div>
  );
};

export default memo(Program);
Program.displayName = 'Program';
