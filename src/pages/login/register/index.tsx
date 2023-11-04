import styles from './index.module.scss';
import { Form, Button, AutoComplete, Typography } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';
import { ToastError, ToastSuccess, ToastWaring } from '@/utils/common';
import { IconHelpCircle, IconMail, IconUser } from '@douyinfe/semi-icons';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import { RegisterByEmail, checkEmail, register } from '@/api/modules/login';
export default function Email() {
  const [loading, setLoading] = useState(false);
  // const { setUser } = useUserStore();
  const { push } = useRouter();
  const { Text } = Typography;
  const handleSubmit = async (values: any) => {
    console.log(values);

    setLoading(true);
    let checkEmailForm = { mail: values.email, code: values.code };
    const res = await checkEmail(checkEmailForm);
    if (res.msg == '验证码校验失败！') {
      ToastError(res.msg);
      setLoading(false);
      return;
    } else {
      let registerForm = {
        password: values.password,
        username: values.email,
        nickname: values.nickname
      };
      register(registerForm)
        .then((res) => {
          if (res.code == 200) {
            ToastSuccess('注册成功');
            push('/login/email');
          } else if (res.code == 444) {
            ToastWaring('此邮箱已注册用户！');
          } else {
            ToastError('注册失败');
          }
          setLoading(false);
        })
        .catch((err) => {});
    }
  };
  return (
    <main className={styles.loginScreen}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.title}>注册</h1>
        </div>
        <div className={styles.loginPath}>
          <Form style={{ width: 400 }} onSubmit={(values) => handleSubmit(values)}>
            {({ formState, values, formApi }) => (
              <>
                <Form.Input
                  field="nickname"
                  label="昵称"
                  style={{ width: '100%', height: 35 }}
                  prefix={<IconUser />}
                  placeholder="请输入您要注册的用户名"
                  rules={[{ required: true, message: '请输入您要注册的用户名' }]}
                ></Form.Input>
                <Form.Input
                  field="email"
                  label="邮箱"
                  style={{ width: '100%', height: 35 }}
                  placeholder="请输入您的邮箱"
                  prefix={<IconMail />}
                  rules={[
                    { required: true, message: '请输入您要注册的邮箱' },
                    {
                      pattern:
                        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: '邮箱格式不正确'
                    }
                  ]}
                ></Form.Input>
                <VerificationCodeInput email={formState.values.email} />
                <Form.Input
                  field="password"
                  label="密码"
                  type="password"
                  mode="password"
                  prefix={<IconHelpCircle />}
                  style={{ width: '100%', height: 35 }}
                  rules={[{ required: true, message: '请输入您要注册的设置的密码' }]}
                  placeholder="请输入您设置的密码"
                ></Form.Input>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Form.Checkbox field="agree" noLabel>
                    我已阅读并同意{'   '}
                    <Text link={{ href: '/home/statement', target: '_blank' }} underline>
                      服务条款
                    </Text>
                  </Form.Checkbox>
                  <Button
                    disabled={!values.agree}
                    htmlType="submit"
                    type="primary"
                    theme="solid"
                    loading={loading}
                  >
                    提交
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </main>
  );
}
