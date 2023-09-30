import { FC, useEffect, useMemo, useState } from 'react';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { MenuItem, DOC_CONFIG, PROJECT_CONFIG } from './config';
import { useRouter } from 'next/router';

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

export type ContentSiderType = 'project' | 'doc' | undefined;

interface ContentSiderProps {
  contentSiderType: ContentSiderType;
  children: React.ReactNode;
}

const { Content } = Layout;

const ContentSider: FC<ContentSiderProps> = ({ contentSiderType, children }) => {
  const { pathname, push, query } = useRouter();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const menuList = useMemo(() => {
    if (contentSiderType === 'project') {
      return PROJECT_CONFIG;
    } else if (contentSiderType === 'doc') {
      return DOC_CONFIG;
    } else {
      return [];
    }
  }, [contentSiderType]);

  const navList = useMemo(() => {
    return menuList.map((e) => {
      return {
        ...e,
        // text: formatMessage({ id: e.text }),
        icon: e?.icon
      };
    });
  }, [menuList]);

  const onSelect = (data: any) => {
    const id = query.id;
    const path = data.selectedItems[0].path as string;
    const pathWithId = id ? `${path}?id=${id}` : path;
    setSelectedKeys([...data.selectedKeys]);
    push(pathWithId);
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
    <>
      {!!contentSiderType ? (
        <Layout>
          <Sider
            style={{
              backgroundColor: 'var(--semi-color-bg-1)',
              width: '100%',
              borderRadius: 10,
              overflow: 'hidden'
            }}
          >
            <Nav
              items={navList}
              openKeys={openKeys}
              selectedKeys={selectedKeys}
              onSelect={onSelect}
              onOpenChange={onOpenChange}
              style={{ minWidth: 160, width: 160, height: '100%' }}
            />
            <Content className="layout-content">{children}</Content>
          </Sider>
        </Layout>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ContentSider;
