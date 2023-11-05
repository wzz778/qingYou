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
import {
  addEmailConfig,
  deleteEmailConfig,
  textMailKey,
  updateEmailConfig
} from '@/api/modules/email';
import { IconBeaker, IconLink } from '@douyinfe/semi-icons';
interface IProps {
  datas?: any[];
}

const Mails: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { user } = useUserStore();
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [testLoading, setTestLoading] = useState<boolean>(false);
  const [uploadId, setuploadId] = useState<string>('0');
  const [addVisible, setAddVisible] = useState(false);
  const [programDetail, setProgramDetail] = useState<Program>();
  const testFormRef = useRef<any>();
  const { Text } = Typography;
  const { data, isLoading, error, mutate } = useSWR(
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

  const toUploadFrom = (data: Program) => {
    setuploadId(data.id);
    setAddVisible(true);
    setProgramDetail(data);
    // testFormRef.current.setValues(
    //   { accountEmail: data.accountEmail, emailKey: data.emailKey },
    //   { isOverride: true }
    // );
    // console.log(testFormRef.current.getFormState().values);
  };

  const testMail = (formApi: any) => {
    formApi
      .validate()
      .then(() => {
        let { accountEmail, emailKey } = formApi.getValue();

        setTestLoading(true);
        const testForm = new FormData();
        testForm.append('sendMail', accountEmail);
        testForm.append('sendMailPwd', emailKey);
        testForm.append('port', '465');
        testForm.append('title', '测试账户');
        testForm.append('content', '测试成功!!!');
        testForm.append('sendMailName', '青邮');
        testForm.append('receiveMail', accountEmail);
        testForm.append('sendSMTPHost', 'smtp.qq.com');
        return Promise.resolve(testForm);
      })
      .then((testForm: any) => {
        return textMailKey(testForm);
      })
      .then((res: any) => {
        if (res.code == '200') {
          ToastSuccess('发送成功');
        } else {
          ToastError('测试失败，请检查您设置的邮箱是否正确');
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setTestLoading(false);
      });
  };

  const addTemplateHandle = (values: any) => {
    setAddLoading(true);
    if (uploadId !== '0') {
      values.id = uploadId;
    }
    const addForm = {
      userId: user?.id,
      emailType: '0',
      emailPort: '465',
      sendHost: 'smtp.qq.com',
      ...values
    };
    const requestApi = uploadId == '0' ? addEmailConfig : updateEmailConfig;
    requestApi(addForm)
      .then((res) => {
        if (res.code == 444) {
          ToastError(`该邮箱已被绑定！`);
        } else {
          mutate();
          ToastSuccess(`操作成功`);
        }
      })
      .catch(() => {
        ToastError(`操作失败`);
      })
      .finally(() => {
        setAddVisible(false);
        setAddLoading(false);
      });
  };

  const deleteTemplateHandle = async () => {
    setDeleteLoading(false);
    deleteEmailConfig(uploadId)
      .then(() => {
        mutate();
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
    <div className={styles.Mails}>
      <div className={styles.header}>
        <Button
          onClick={() => {
            setAddVisible(true);
            setuploadId('0');
            setProgramDetail(undefined);
          }}
        >
          绑定邮箱
        </Button>
      </div>

      {isEmpty ? (
        <None title={'无数据'} description={'请先创建数据'} />
      ) : (
        <CardGroup spacing={10}>
          {records.map((item: Program) => (
            <div key={item.id} onClick={() => toUploadFrom(item)}>
              <Card
                shadows="hover"
                title={item.accountEmail}
                headerLine={false}
                style={{ width: 300 }}
                headerExtraContent={
                  <Text onClick={() => toUploadFrom(item)} style={{ color: '#06C05F' }}>
                    操作
                  </Text>
                }
              >
                <Text>{item.updateTime.replace('T', ' ')}</Text>
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
                field="accountEmail"
                label="邮箱"
                initValue={programDetail?.accountEmail}
                style={{ width: '100%' }}
                placeholder="请输入内容"
                rules={[
                  { required: true, message: '请输入内容' },
                  {
                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                    message: '邮箱格式不正确'
                  }
                ]}
                extraText={
                  <div
                    style={{
                      fontSize: 14,
                      userSelect: 'none'
                    }}
                  >
                    您的QQ邮箱地址，如address@qq.com。
                    <Text
                      icon={<IconLink />}
                      style={{ fontSize: 12 }}
                      link={{ href: 'https://service.mail.qq.com/', target: '_blank' }}
                      underline
                      type="success"
                    >
                      如何开启QQ邮箱IMAP/SMTP服务？
                    </Text>
                  </div>
                }
              ></Form.Input>
              <Form.Input
                field="emailKey"
                label="key"
                style={{ width: '100%' }}
                type="password"
                mode="password"
                placeholder="请输入内容"
                initValue={programDetail?.emailKey}
                rules={[{ required: true, message: '请输入内容' }]}
                extraText={
                  <div
                    style={{
                      fontSize: 14,
                      userSelect: 'none'
                    }}
                  >
                    授权码不是邮箱密码,
                    <Text
                      link={{ href: 'https://service.mail.qq.com/detail/0/75', target: '_blank' }}
                      icon={<IconLink />}
                      style={{ fontSize: 12 }}
                      underline
                    >
                      如何获取授权密码？
                    </Text>
                  </div>
                }
              ></Form.Input>
              <Button
                type="primary"
                loading={testLoading}
                icon={<IconBeaker />}
                onClick={() => testMail(formApi)}
              >
                测试账户
              </Button>
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
                    style={{
                      width: '100%',
                      marginTop: '6px'
                    }}
                    onClick={() =>
                      execConfirm(deleteTemplateHandle, undefined, '你确确定要删除这项邮箱配置？')
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

export default memo(Mails);
Mails.displayName = 'Mails';
