import { memo, useRef, useState } from 'react';

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
import { addEmailProgram } from '@/api/modules/dispatch';
import { addEmailConfig, textMailKey } from '@/api/modules/email';
import { IconBeaker, IconLink } from '@douyinfe/semi-icons';

interface IProps {
  datas?: any[];
}

const Mails: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { user } = useUserStore();
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [testLoading, setTestLoading] = useState<boolean>(false);
  const [addVisible, setAddVisible] = useState(false);
  const [programDetail, setProgramDetail] = useState<Program>();
  const testFormRef = useRef<HTMLFormElement>(null);
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
  if (!data) {
    return <div>数据错误</div>;
  }

  const { records } = data;
  const isEmpty = records.length === 0;

  async function deleteItem() {
    // 执行删除操作
    console.log('执行删除操作');
  }

  const trys = () => {
    execConfirm(deleteItem, undefined, '34');
  };

  const testMail = (formApi: any) => {
    formApi
      .validate()
      .then((values: any) => {
        let { accountEmail, emailKey } = formApi.getValue();
        const testForm = {
          sendMail: accountEmail,
          sendMailPwd: emailKey,
          port: '465',
          title: '测试账户',
          content: '测试成功!!!',
          sendMailName: '青邮',
          receiveMail: accountEmail,
          sendSMTPHost: 'smtp.qq.com'
        };
        return Promise.resolve(testForm);
      })
      .then((testForm: any) => {
        return textMailKey(testForm);
      })
      .then((res: any) => {
        console.log(res);
        ToastSuccess('发送成功');
      })
      .catch((error: any) => {
        console.log(error);
      });

    // textMailKey(testForm)
    //   .then(() => {
    //     mutate();
    //     ToastSuccess('添加成功');
    //   })
    //   .catch(() => {
    //     ToastError('添加失败');
    //   })
    //   .finally(() => {
    //     setAddVisible(false);
    //     setAddLoading(false);
    //   });
  };

  const addTemplateHandle = (values: any) => {
    const addForm = {
      userId: user?.id,
      emailType: '0',
      emailPort: '465',
      sendHost: 'smtp.qq.com',
      ...values
    };

    addEmailConfig(addForm)
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
  return (
    <div className={styles.Mails}>
      <div className={styles.header}>
        <Button onClick={() => setAddVisible(true)}>绑定邮箱</Button>
      </div>

      {isEmpty ? (
        <None title={'无数据'} description={'请先创建数据'} />
      ) : (
        <CardGroup type="grid">
          {records.map((item: Program) => (
            <Card
              key={item.id}
              shadows="hover"
              title={item.accountEmail}
              headerLine={false}
              style={{ width: 260 }}
              headerExtraContent={<Text link>More</Text>}
            >
              <Text>{item.updateTime}</Text>
            </Card>
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
        zIndex={99999}
      >
        <Form
          onSubmit={(values) => addTemplateHandle(values)}
          style={{
            padding: '20px 10px'
          }}
          render={({ formState, formApi, values }) => (
            <>
              <Form.Input
                field="accountEmail"
                label="邮箱"
                style={{ width: '100%' }}
                placeholder="请输入内容"
                rules={[{ required: true, message: '请输入内容' }]}
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
                      link={{ href: 'https://service.mail.qq.com/' }}
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
                placeholder="请输入内容"
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
                      link={{ href: 'https://service.mail.qq.com/' }}
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
                  添加
                </Button>
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
