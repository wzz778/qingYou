import styles from './index.module.scss';
import { Form, Button, AutoComplete } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';
import { ToastSuccess } from '@/utils/common';
import { IconHelpCircle, IconMail, IconUser } from '@douyinfe/semi-icons';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import { RegisterByEmail, checkEmail } from '@/api/login';
export default function Email() {
  const [loading, setLoading] = useState(false);
  // const { setUser } = useUserStore();
  const { push } = useRouter();

  const afterLoginSuccess = (user: User) => {
    const { roles } = user;
    // setUser(user);
    // const isAdmin =
    //   roles.findIndex(
    //     (item) => item.name === 'super' || item.name === 'admin'
    //   ) !== -1;
    // 判断权限
    // push(isAdmin ? '/admin' : '/');
    push('/workspace');
    ToastSuccess('欢迎 👏');
  };
  const handleSubmit = async (values: RegisterByEmail) => {
    console.log(values);

    setLoading(true);
    let checkEmailForm = { mail: values.email, code: values.code };
    const res = await checkEmail(checkEmailForm);
    if (res.code == 'sada') {
    }
    // register(values)
    //   .then(() => {
    //     ToastSuccess('注册成功');
    //     return Promise.resolve();
    //   })
    //   .then(() => {
    //     return loginApi(values);
    //   })
    //   .then((res) => {
    //     const { user, accessToken } = res.data;
    //     localStorage.setItem('bearerToken', accessToken);
    //     afterLoginSuccess(user);
    //   })
    //   .catch((err) => {})
    //   .finally(() => {
    //     setLoading(false);
    //   });
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
                  field="username"
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
                  rules={[{ required: true, message: '请输入您要注册的邮箱' }]}
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
                    我已阅读并同意服务条款
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
