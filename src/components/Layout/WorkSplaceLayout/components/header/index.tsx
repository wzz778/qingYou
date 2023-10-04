import React, { FC } from 'react';
import { Layout, Nav, RadioGroup, Radio, Button } from '@douyinfe/semi-ui';
import AuthRightBox from '@/components/Layout/components/AuthRightBox';
const { Header } = Layout;

const Index: FC = () => {
  return (
    <Header className="layout-header">
      <Nav
        mode="horizontal"
        footer={
          <>
            <AuthRightBox />
          </>
        }
      ></Nav>
    </Header>
  );
};

export default Index;
