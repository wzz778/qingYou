import React, { FC } from 'react';
import { Layout } from '@douyinfe/semi-ui';

const { Footer } = Layout;

const Wfooter: FC = () => {
  return (
    <Footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        color: 'var(--semi-color-text-2)'
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span>您的建议，对我们来说十分重要！ </span>
      </span>
      <span>
        <span style={{ marginRight: '24px' }}>平台客服</span>
        <span>反馈建议</span>
      </span>
    </Footer>
  );
};

export default Wfooter;
