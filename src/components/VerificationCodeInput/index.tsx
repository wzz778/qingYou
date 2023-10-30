import { Button, Form } from '@douyinfe/semi-ui';
import { useEffect, useRef, useState } from 'react';
import { sendCode } from '@/api/modules/login';
import { Toast } from '@douyinfe/semi-ui';
import { IconInfoCircle } from '@douyinfe/semi-icons';
import install from '@/utils/validator';
import { ToastWaring } from '@/utils/common';
function VerificationCodeInput({ email }: any) {
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const startCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    countdownRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
          }
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const stopCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
      setCountdown(0);
    }
  };

  useEffect(() => {
    const storedCountdown = sessionStorage.getItem('countdown');
    if (storedCountdown) {
      const current = parseInt(storedCountdown, 10);
      setCountdown(current);
      if (current > 0) {
        startCountdown();
      }
    }
    return stopCountdown;
  }, []);

  useEffect(() => {
    sessionStorage.setItem('countdown', countdown.toString());
  }, [countdown]);

  const sendCodeHandle = (email: string) => {
    const emailError = install.emailValidate(email);
    if (emailError) {
      ToastWaring(emailError);
    } else {
      setSendLoading(true);
      sendCode(email)
        .then((res) => {
          console.log(res);
          Toast.success('发送成功');
          setCountdown(60);
          startCountdown();
        })
        .catch((err) => {})
        .finally(() => {
          setSendLoading(false);
        });
    }
  };

  return (
    <Form.Input
      field="code"
      label="验证码"
      placeholder="请输入验证码"
      showClear
      prefix={<IconInfoCircle />}
      rules={[{ required: true, message: '请输入邮箱验证码' }]}
      suffix={
        <Button
          block
          theme="borderless"
          type="tertiary"
          loading={sendLoading}
          onClick={() => countdown === 0 && sendCodeHandle(email)}
          disabled={countdown > 0}
        >
          {countdown > 0 ? `${countdown} 秒` : '发送'}
        </Button>
      }
    />
  );
}

export default VerificationCodeInput;
