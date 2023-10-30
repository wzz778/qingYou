import CustomAvatar from '@/components/CustomAvatar';
import useUserStore from '@/store/user';
import { ToastSuccess, clearUserToken, execConfirm } from '@/utils/common';
import { Dropdown, DropdownDivider, Spin } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AuthSwitchBox from '../AuthSwitchBox';
import { IconForward, IconIdCard, IconMail, IconMailStroked1 } from '@douyinfe/semi-icons';

const AuthRightBox = () => {
  const { push, pathname } = useRouter();
  const [logoutIsLoading, setLogoutIsLoading] = useState(false);
  const { user, clearUser } = useUserStore();
  if (!user) return null;

  const logoutHandle = async () => {
    setLogoutIsLoading(true);
    ToastSuccess('退出成功');
    clearUserToken();
    clearUser();
    push('/login');
  };
  return (
    <>
      <AuthSwitchBox />
      <Dropdown
        position="bottomLeft"
        render={
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => push('/workspace/account')}
              type="secondary"
              icon={<IconIdCard />}
            >
              账号设置
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => push('/workspace/mails')}
              type="secondary"
              icon={<IconMailStroked1 />}
            >
              邮箱绑定
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => push('/workspace/program-list')}
              type="secondary"
              icon={<IconMail />}
            >
              我的定时邮箱
            </Dropdown.Item>
            <DropdownDivider />
            <Dropdown.Item
              type="tertiary"
              icon={<IconForward />}
              onClick={() =>
                execConfirm(logoutHandle, undefined, `你确定退出   ${user.nickname}   账号？`)
              }
            >
              {logoutIsLoading && <Spin />}
              退出
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <CustomAvatar
          id={user?.id}
          src={user?.img ?? ''}
          username={user?.nickname as string}
          size="small"
        />

        <div />
      </Dropdown>
    </>
  );
};
export default AuthRightBox;
