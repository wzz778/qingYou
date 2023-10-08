import useUserStore from '@/store/user';
import { ToastSuccess, clearUserToken } from '@/utils/common';
import { IconBranch } from '@douyinfe/semi-icons';
import { Button, Dropdown, DropdownDivider, Spin, Tag } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AuthSwitchBox = () => {
  const { push, pathname } = useRouter();
  const [logoutIsLoading, setLogoutIsLoading] = useState(false);
  const { user, clearUser } = useUserStore();
  // if (!user) return null;

  const logoutHandle = async () => {
    setLogoutIsLoading(true);
    ToastSuccess('退出成功');
    push('/login');
    clearUserToken();
    clearUser();
  };
  return (
    <>
      <Dropdown
        position="bottomLeft"
        style={{ width: '220px' }}
        render={
          <Dropdown.Menu>
            <Dropdown.Title>个人版</Dropdown.Title>
            <Dropdown.Item onClick={() => push('/workspace/project')}>用户名</Dropdown.Item>
            <DropdownDivider />
            <Dropdown.Title>团队版</Dropdown.Title>
            <Dropdown.Item onClick={() => push('/workspace/project')}>应用列表</Dropdown.Item>
            <Dropdown.Item onClick={() => push('/workspace/doc')}>知识库列表</Dropdown.Item>
            <Dropdown.Item onClick={() => push('/workspace/account')}>账号设置</Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <Button
          theme="borderless"
          style={{
            color: 'var(--semi-color-text-2)',
            marginRight: '40px'
          }}
        >
          <Tag size="large" color="light-green" prefixIcon={<IconBranch />}>
            个人版
          </Tag>
          <span style={{ padding: '0 10px', color: '#009A4B' }}>111</span>
          的空间
        </Button>
      </Dropdown>
    </>
  );
};
export default AuthSwitchBox;
