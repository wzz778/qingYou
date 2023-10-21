import styles from './index.module.scss';
import { Form, Button } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ToastError, ToastSuccess, getUserInfo } from '@/utils/common';
import useUserStore from '@/store/user';
import { IconHelpCircle, IconMail } from '@douyinfe/semi-icons';
import { loginApi } from '@/api/modules/login';
interface loginRoot {
  username: string;
  password: string;
}
export default function Email() {
  const [loading, setLoading] = useState(false);
  const { getUser, setUser } = useUserStore();

  const { push } = useRouter();
  const handleSubmit = (values: any) => {
    setLoading(true);
    loginFn({ username: values.username, password: values.password });
  };
  const loginFn = (values: loginRoot) => {
    const loginForm = {
      username: values.username,
      password: values.password,
      grant_type: 'password',
      client_id: 'torlesse000',
      client_secret: '123456'
    };
    loginApi(loginForm)
      .then((res) => {
        console.log(res);
        if (res.code != 200) {
          ToastError('邮箱或密码错误！');
          return;
        }
        const { accessToken } = res.data;
        localStorage.setItem('qyBearerToken', accessToken);
        return Promise.resolve();
      })
      .then(() => {
        return getUserInfo();
      })
      .then((user) => {
        console.log('user');
        console.log(user);
        afterLoginSuccess(user);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const afterLoginSuccess = (user: User) => {
    const { status } = user;
    setUser(user);
    if (status == '0') {
      push('/workspace');
    } else {
      push('/admin');
    }
    ToastSuccess('欢迎 👏');
  };

  return (
    <main className={styles.loginScreen}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.title}>密码登录</h1>
        </div>
        <div className={styles.loginPath}>
          <Form onSubmit={(values) => handleSubmit(values)} style={{ width: 400 }}>
            {({ formState, values, formApi }) => (
              <>
                <Form.Input
                  field="username"
                  label="邮箱"
                  prefix={<IconMail />}
                  style={{ width: '100%', height: 35 }}
                  placeholder="输入你的邮箱"
                  rules={[
                    { required: true, message: '请输入您要注册的邮箱' },
                    {
                      pattern:
                        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: '邮箱格式不正确'
                    }
                  ]}
                ></Form.Input>
                <Form.Input
                  field="password"
                  label="密码"
                  type="password"
                  mode="password"
                  prefix={<IconHelpCircle />}
                  style={{ width: '100%', height: 35 }}
                  placeholder="输入密码"
                ></Form.Input>
                <Form.Checkbox field="agree" noLabel>
                  我已阅读并同意服务条款
                </Form.Checkbox>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <p>
                    <Button
                      theme="borderless"
                      style={{
                        color: 'var(--semi-color-primary)',
                        cursor: 'pointer'
                      }}
                      onClick={() => push('/login/forget')}
                    >
                      忘记密码
                    </Button>
                  </p>
                  <Button
                    disabled={!values.agree}
                    htmlType="submit"
                    type="primary"
                    theme="solid"
                    loading={loading}
                  >
                    登录
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
