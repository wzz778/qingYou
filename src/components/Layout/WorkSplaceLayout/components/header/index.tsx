import React, { FC } from 'react';
import { Layout, Nav, RadioGroup, Radio, Button } from '@douyinfe/semi-ui';
import AuthRightBox from '@/components/Layout/components/AuthRightBox';
import LinkBox from '@/components/Layout/components/LinkBox';
const { Header } = Layout;

const Index: FC = () => {
  return (
    <Header className="layout-header">
      <Nav
        mode="horizontal"
        header={
          <>
            <LinkBox />
          </>
        }
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
