import {
  IconGallery,
  IconIdCard,
  IconMail,
  IconMailStroked1,
  IconUserGroup
} from '@douyinfe/semi-icons';

export interface MenuItem {
  itemKey: string;
  text: string;
  icon?: React.ReactNode;
  path?: string;
  items?: MenuItem[];
  component?: React.ComponentType<any>;
}

const SAME_CONFIG: MenuItem[] = [
  {
    text: '邮箱',
    icon: <IconMail />,
    itemKey: '1',
    items: [
      {
        itemKey: '11',
        text: '邮箱发送',
        path: '/workspace/program'
      },
      {
        itemKey: '12',
        text: '邮箱绑定',
        path: '/workspace/mails'
      },
      {
        itemKey: '13',
        text: '邮箱模板',
        path: '/workspace/mail-template'
      }
    ]
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
  }
];

const MENU_CONFIG: MenuItem[] = [
  ...SAME_CONFIG,
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

const TEAM_CONFIG: MenuItem[] = [
  ...SAME_CONFIG,
  {
    text: '团队',
    icon: <IconUserGroup />,
    itemKey: '3',
    items: [
      {
        itemKey: '31',
        text: '团队人员',
        path: '/workspace/teams/users'
      },
      {
        itemKey: '32',
        text: '团队管理',
        path: '/workspace/teams/information'
      }
    ]
  }
];

export { TEAM_CONFIG, MENU_CONFIG };
