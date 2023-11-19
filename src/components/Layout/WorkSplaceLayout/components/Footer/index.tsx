import React, { FC, useRef, useState } from 'react';
import { Button, Form, Input, Layout, Modal, Radio, RadioGroup, Space } from '@douyinfe/semi-ui';
import { ToastSuccess } from '@/utils/common';

const { Footer } = Layout;

const Wfooter: FC = () => {
  const [addVisible, setAddVisible] = useState(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const formRef = useRef<any>();
  const addFeedbackHandle = (form: any) => {
    setAddLoading(true);
    setTimeout(() => {
      formRef.current.reset();
      setAddLoading(false);
      ToastSuccess('反馈成功！谢谢您的反馈🥰~');
      setAddVisible(false);
    }, 1000);
  };
  return (
    <Footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 20px',
        color: 'var(--semi-color-text-2)',
        zIndex: 9
      }}
    >
      <span style={{ lineHeight: '30px' }}>您的建议与反馈，对我们来说十分重要！</span>
      <Button theme="borderless" onClick={() => setAddVisible(true)}>
        意见反馈
      </Button>
      <Modal
        title={'意见反馈'}
        footer={null}
        visible={addVisible}
        onCancel={() => setAddVisible(false)}
        closeOnEsc
        zIndex={99}
      >
        <Form
          labelWidth="90px"
          labelPosition="left"
          labelAlign="right"
          getFormApi={(formApi) => (formRef.current = formApi)}
          style={{ width: 500, marginBottom: 20 }}
          onSubmit={(values) => addFeedbackHandle(values)}
        >
          <>
            <Form.RadioGroup
              field="type"
              label="反馈类型"
              initValue={'suggest'}
              style={{ width: 300 }}
            >
              <Radio value="suggest">优化建议</Radio>
              <Radio value="serve">平台服务</Radio>
              <Radio value="bug">bug汇报</Radio>
            </Form.RadioGroup>
            <Form.TextArea
              field="content"
              label={{ text: '反馈内容', required: true }}
              rules={[{ required: true, message: '请输入内容' }]}
              style={{ width: 300 }}
              maxCount={400}
            />
            <Form.Input
              field="social"
              label="联系方式"
              placeholder={'填写您的联系方式：电话/邮箱/微信'}
              style={{ width: 300 }}
            />
            <Space style={{ marginLeft: 230 }}>
              <Button type="primary" theme="solid" htmlType="submit" loading={addLoading}>
                发送反馈
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </>
        </Form>
      </Modal>
    </Footer>
  );
};

export default Wfooter;
