import { memo, useState, useRef } from 'react';
import classNames from 'classnames';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Form, Button, Space, ArrayField } from '@douyinfe/semi-ui';
import CronInput from '@/components/CronInput';
import React from 'react';
import { IconMinusCircle, IconPlusCircle } from '@douyinfe/semi-icons';
import { ToastError, ToastSuccess, ToastWaring } from '@/utils/common';
import { sendMail } from '@/api/modules/email';
import useUserStore from '@/store/user';
import { addEmailProgram } from '@/api/modules/dispatch';
interface IProps {
  datas?: any[];
}

const Program: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { Select, Switch } = Form;
  const { user } = useUserStore();
  let [date, setDate] = useState<string>();
  const [addLoading, setAddLoading] = useState<boolean>(false);
  let [receiveMailData, setReceiveMailData] = useState<string[]>(['@qq.com']);
  const testFormRef = useRef<any>();
  const addTemplateHandle = (data: any) => {
    setAddLoading(true);
    const mailForm = new FormData();
    mailForm.append('accountEmail', data.accountEmail);
    mailForm.append('title', data.title);
    mailForm.append('content', data.content);
    mailForm.append('sendMailName', '青邮');
    mailForm.append('receiveMailName', '青邮receiveMailName');
    mailForm.append('receiveMail', data.receiveMail[0]);
    if (data.open) {
      if (!date) {
        ToastWaring('请选择您要设置定时发送邮件的时间');
        setAddLoading(false);
        return;
      } else {
        mailForm.append('cron', date);
        if (user) {
          mailForm.append('userId', user?.id);
        }
        mailForm.append('personOrTeam', '0');
        addEmailProgram(mailForm)
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
            setAddLoading(false);
          });
      }
    } else {
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
          setAddLoading(false);
        });
    }

    console.log(data);
    // setAddLoading(true);
    // const addForm = {
    //   userId: user?.id,
    //   emailType: '0',
    //   emailPort: '465',
    //   sendHost: 'smtp.qq.com',
    //   ...values
    // };

    // requestApi(addForm)
    //   .then(() => {
    //     mutate();

    //     ToastSuccess(`${!uploadId ? '增加' : '更新'}成功`);
    //   })
    //   .catch(() => {
    //     ToastError(`${!uploadId ? '增加' : '更新'}失败`);
    //   })
    //   .finally(() => {
    //     setAddVisible(false);
    //     setAddLoading(false);
    //   });
  };
  return (
    <div className={styles.Project}>
      <Form
        labelWidth="120px"
        labelPosition="left"
        labelAlign="right"
        getFormApi={(formApi) => (testFormRef.current = formApi)}
        onSubmit={(values) => addTemplateHandle(values)}
      >
        {({ formState, values, formApi }) => (
          <>
            <Select
              field="accountEmail"
              label={{ text: '邮箱选择', required: true }}
              style={{ width: '100%' }}
              rules={[{ required: true, message: '请选选择内容' }]}
            >
              <Select.Option value="1">曲晨一</Select.Option>
              <Select.Option value="2">夏可曼</Select.Option>
            </Select>
            <Form.Input
              field="title"
              label={{ text: '邮件主题', required: true }}
              initValue="TCS任务平台使用"
              style={{ width: '100%' }}
              rules={[{ required: true, message: '请输入内容' }]}
              maxLength={20}
            />
            <Form.TextArea
              field="content"
              label={{ text: '邮件正文', required: true }}
              initValue="TCS任务平台使用"
              rules={[{ required: true, message: '请输入内容' }]}
              style={{ width: '100%' }}
              maxCount={400}
            />
            <ArrayField field="receiveMail" initValue={receiveMailData}>
              {({ add, arrayFields }) => (
                <>
                  {arrayFields.map(({ field, key, remove }, i) => (
                    <div key={key} style={{ width: 1000, display: 'flex' }}>
                      <Form.Input
                        field={`${field}`}
                        label={`收件人 ${i + 1} 邮箱`}
                        style={{ width: 200 }}
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
            ) : null}
            <Space>
              <Button
                type="primary"
                theme="solid"
                htmlType="submit"
                loading={addLoading}
                style={{ width: 120, marginTop: 12, marginLeft: 100 }}
              >
                创建考试
              </Button>
              <Button style={{ marginTop: 12 }}>预览</Button>
            </Space>
          </>
        )}
      </Form>
    </div>
  );
};

export default memo(Program);
Program.displayName = 'Program';
