import { IconGallery, IconIdCard, IconMail, IconMailStroked1 } from '@douyinfe/semi-icons';

export interface MenuItem {
  itemKey: string;
  text: string;
  icon?: React.ReactNode;
  path?: string;
  items?: MenuItem[];
  component?: React.ComponentType<any>;
}
const MENU_CONFIG: MenuItem[] = [
  {
    itemKey: '1',
    text: '邮箱发送',
    icon: <IconMailStroked1 />,
    path: '/workspace/program'
  },
  {
    itemKey: '11',
    text: '邮箱绑定',
    icon: <IconMail />,
    path: '/workspace/mails'
  },
  {
    text: '流程',
    icon: <IconGallery />,
    itemKey: '2',
    items: [
      {
        itemKey: '21',
        text: '我的流程',
        path: '/workspace/program-list'
      },
      {
        itemKey: '22',
        text: '流程日志',
        path: '/workspace/program-log'
      }
    ]
  },
  {
    text: '账号',
    icon: <IconIdCard />,
    itemKey: '3',
    items: [
      {
        itemKey: '31',
        text: '团队管理',
        path: '/workspace/teams'
      },
      {
        itemKey: '32',
        text: '账号管理',
        path: '/workspace/account'
      }
    ]
  }
];

export default MENU_CONFIG;
