import styles from './index.module.scss';
import { Form, Button } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
// import { LoginByPasswordParams, smsLogin } from '@/api/modules/user';
import { useState } from 'react';
import { IconMail } from '@douyinfe/semi-icons';
import { queryPasswordByName } from '@/api/modules/login';
// import VerificationCodeInput from '@/components/VerificationCodeInput';

export default function Code() {
  const [loading, setLoading] = useState(false);
  // const { setUser } = useUserStore();
  const { push } = useRouter();
  const [showSlider, setShowSlider] = useState(true);
  const handleSubmit = async (values: any) => {
    setLoading(true);
    let registerForm = {
      password: values.password,
      username: values.email
    };
    queryPasswordByName(registerForm)
      .then((res) => {
        // if (res.code == 200) {
        //   ToastSuccess('修改失败！');
        //   push('/login/email');
        // } else if (res.code == 444) {
        //   ToastWaring('此邮箱已注册用户！');
        // } else {
        //   ToastError('注册失败');
        // }
        setLoading(false);
      })
      .catch((err) => {});
  };
  const resultClick = (e: number) => {
    if (e) {
      setShowSlider(true);
    } else if (e == 1) {
    }
  };
  return (
    <main className={styles.loginScreen}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.title}>修改密码</h1>
        </div>
        <div className={styles.loginPath}>
          <Form style={{ width: 400 }} onSubmit={(values) => handleSubmit(values)}>
            {({ formState, values, formApi }) => (
              <>
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
                <Form.Input
                  field="password"
                  label="新密码"
                  type="password"
                  mode="password"
                  style={{ width: '100%', height: 35 }}
                  rules={[{ required: true, message: '请输入您要设置的新密码' }]}
                  placeholder="请输入您要设置的新密码"
                ></Form.Input>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Button
                    disabled={!showSlider}
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
