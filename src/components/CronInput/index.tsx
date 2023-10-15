import { Button, Form } from '@douyinfe/semi-ui';
import { useEffect, useRef, useState } from 'react';
import { sendCode } from '@/api/modules/login';
import { Toast } from '@douyinfe/semi-ui';
import { IconInfoCircle } from '@douyinfe/semi-icons';
function CronInput({ email }: any) {
  return (
    <>
      <Form.Input
        field="code"
        label="验证码"
        placeholder="请输入验证码"
        showClear
        prefix={<IconInfoCircle />}
        rules={[{ required: true, message: '请输入邮箱验证码' }]}
      />
      222
    </>
  );
}

export default CronInput;
