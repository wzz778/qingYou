import { FC, useEffect, useMemo, useState } from 'react';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { TEAM_CONFIG, MENU_CONFIG, MenuItem } from './config';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './index.module.scss';
import useTeamStore from '@/store/team';
import { queryTeamById } from '@/api/modules/team';
import { ToastError } from '@/utils/common';
import useMount from '@/hooks/useMount';
const { Sider } = Layout;

function findMenuByPath(menus: MenuItem[], path: string, keys: any[]): any {
  for (const menu of menus) {
    if (menu.path === path) {
      return [...keys, menu.itemKey];
    }
    if (menu.items && menu.items.length > 0) {
      const result = findMenuByPath(menu.items, path, [...keys, menu.itemKey]);
      if (result.length === 0) {
        continue;
      }
      return result;
    }
  }
  return [];
}

const Index: FC = () => {
  const { pathname, push } = useRouter();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { teamId, setThisTeam, thisTeam } = useTeamStore();
  const menuList = teamId == '0' ? MENU_CONFIG : TEAM_CONFIG;
  useEffect(() => {
    if (teamId != '0' && thisTeam == null) {
      queryTeamById(teamId).then((res) => {
        if (res.code == 200) {
          setThisTeam(res.data);
        } else {
          // ToastError('请求失败');
          // throw new Error('请求失败');
        }
      });
    }
  }, [teamId]);
  const navList = useMemo(() => {
    return menuList.map((e) => {
      return {
        ...e,
        text: e.text,
        itemKey: e.itemKey,
        icon: e?.icon
      };
    });
  }, [menuList]);

  const onSelect = (data: any) => {
    setSelectedKeys([...data.selectedKeys]);
    push(data.selectedItems[0].path as string);
  };
  const onOpenChange = (data: any) => {
    setOpenKeys([...data.openKeys]);
  };

  useEffect(() => {
    const keys: string[] = findMenuByPath(menuList, pathname, []);
    setSelectedKeys([keys.pop() as string]);
    setOpenKeys(Array.from(new Set([...openKeys, ...keys])));
  }, [pathname]);

  return (
    <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
      <Nav
        items={navList}
        className={styles.reSemi}
        // openKeys={openKeys}
        defaultOpenKeys={['1', '2']}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
        style={{ maxWidth: 220, height: '100%' }}
        header={{
          logo: (
            <Image
              src={'/qingYouicon.svg'}
              alt="logo"
              width={80}
              height={80}
              priority
              style={{ cursor: 'pointer' }}
            />
          ),
          text: '青邮'
        }}
        footer={{
          collapseButton: true
        }}
      />
    </Sider>
  );
};

export default Index;
