import styles from './index.module.scss';
import { Form, Button, AutoComplete } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';
import { ToastError, ToastSuccess, ToastWaring } from '@/utils/common';
import { IconHelpCircle, IconMail, IconUser } from '@douyinfe/semi-icons';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import { checkEmail, queryPasswordByName } from '@/api/modules/login';
import SliderVerify from '@/components/Layout/LoginLayout/SliderVerify';
export default function Forget() {
  const [loading, setLoading] = useState(false);
  // const { setUser } = useUserStore();
  const { push } = useRouter();
  const [showSlider, setShowSlider] = useState(false);
  const handleSubmit = async (values: any) => {
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
        username: values.email
      };
      queryPasswordByName(registerForm)
        .then((res) => {
          if (res.code == 200) {
            ToastSuccess('修改失败！');
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
  const resultClick = (e: number) => {
    if (e) {
      console.log('成功');
      setShowSlider(true);
    } else if (e == 1) {
      console.log('失败');
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
                  field="email"
                  label="邮箱"
                  style={{ width: '100%', height: 35 }}
                  placeholder="请输入您的邮箱"
                  prefix={<IconMail />}
                  rules={[{ required: true, message: '请输入您要注册的邮箱' }]}
                ></Form.Input>
                <VerificationCodeInput email={formState.values.email} />
                <Form.Slot label={{ text: '安全验证' }}>
                  <SliderVerify resultClick={resultClick}></SliderVerify>
                </Form.Slot>
                <Form.Input
                  field="password"
                  label="新密码"
                  type="password"
                  mode="password"
                  prefix={<IconHelpCircle />}
                  style={{ width: '100%', height: 35 }}
                  rules={[{ required: true, message: '请输入您要注册的设置的密码' }]}
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
