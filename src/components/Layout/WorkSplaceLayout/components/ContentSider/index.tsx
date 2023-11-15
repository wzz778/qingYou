import { FC, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, Layout, Nav } from '@douyinfe/semi-ui';
import { MenuItem, DOC_CONFIG, PROJECT_CONFIG, Work_CONFIG, MenuCItem } from './config';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { IconHome, IconMonitorStroked } from '@douyinfe/semi-icons';
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
  const [openTitle, setopenTitle] = useState<MenuCItem>();
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
        text: e.text,
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
  const changeTitle = () => {
    for (let item of Work_CONFIG) {
      if (item.path == pathname) {
        setopenTitle(item);
      }
    }
  };
  useEffect(() => {
    const keys: string[] = findMenuByPath(menuList, pathname, []);
    setSelectedKeys([keys.pop() as string]);
    setOpenKeys(Array.from(new Set([...openKeys, ...keys])));
    changeTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {!!contentSiderType ? (
        <Layout>
          <Sider
            style={{
              backgroundColor: '#c9e5a9',
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
        <div className={styles.contentBox}>
          <Breadcrumb
            compact={false}
            style={{
              borderBottom: '1.5px #6363631E solid',
              paddingLeft: 15
            }}
          >
            <Breadcrumb.Item icon={<IconHome />}>首页</Breadcrumb.Item>
            <Breadcrumb.Item icon={<IconMonitorStroked />}>工作台</Breadcrumb.Item>
            {openTitle && <Breadcrumb.Item>{openTitle?.text}</Breadcrumb.Item>}
          </Breadcrumb>
          <div style={{ width: '100%', height: '100%' }}>{children}</div>
        </div>
      )}
    </>
  );
};

export default ContentSider;
