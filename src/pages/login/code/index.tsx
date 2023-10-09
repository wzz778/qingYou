import styles from './index.module.scss';
import { Form, Button } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
// import { LoginByPasswordParams, smsLogin } from '@/api/user';
import { useState } from 'react';
import { ToastSuccess } from '@/utils/common';
import useUserStore from '@/store/user';
import SliderVerify from '@/components/Layout/LoginLayout/SliderVerify';
import { IconMail } from '@douyinfe/semi-icons';
// import VerificationCodeInput from '@/components/VerificationCodeInput';

export default function Code() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();

  const { push } = useRouter();
  // const handleSubmit = (values: LoginByPasswordParams) => {
  //   setLoading(true);
  //   smsLogin(values)
  //     .then((res) => {
  //       const { user, accessToken } = res.data;
  //       localStorage.setItem('qyBearerToken', accessToken);
  //       afterLoginSuccess(user);
  //     })
  //     .catch((err) => {})
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const afterLoginSuccess = (user: User) => {
    // const isAdmin =
    //   roles.findIndex(
    //     (item) => item.name === 'super' || item.name === 'admin'
    //   ) !== -1;
    // 判断权限
    push('/workspace');
    ToastSuccess('欢迎回来 👏');
  };
  const [showSlider, setShowSlider] = useState(false);
  const resultClick = (e: number) => {
    if (e) {
      console.log('成功');
      setTimeout(() => {
        setShowSlider(false);
      }, 600);
    } else if (e == 1) {
      console.log('失败');
    }
  };
  return (
    <main className={styles.loginScreen}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.title}>验证码登录</h1>
        </div>
        <div className={styles.loginPath}>
          <Form
            // onSubmit={(values) => handleSubmit(values)}
            style={{ width: 400 }}
          >
            {({ formState, values, formApi }) => (
              <>
                <Form.Input
                  field="email"
                  label="邮箱"
                  style={{ width: '100%', height: 35 }}
                  prefix={<IconMail />}
                  placeholder="输入你的邮箱"
                ></Form.Input>
                <Form.Slot label={{ text: '安全验证' }}>
                  <SliderVerify resultClick={resultClick}></SliderVerify>
                </Form.Slot>
                {/* <VerificationCodeInput email={values.email} /> */}

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
