export interface MenuItem {
  itemKey: string;
  text: string;
  icon?: React.ReactNode;
  path?: string;
  items?: MenuItem[];
  component?: React.ComponentType<any>;
}

export interface MenuCItem {
  text: string;
  icon?: React.ReactNode;
  path: string;
}

const PROJECT_CONFIG: MenuItem[] = [
  {
    itemKey: '1-2',
    text: 'workspace.project.workshop',
    path: '/workspace/project/workshop'
  },
  {
    itemKey: '1-3',
    text: 'workspace.project.feekback',
    path: '/workspace/project/feekback'
  },
  {
    itemKey: '1-4',
    text: 'workspace.project.setting',
    path: '/workspace/project/setting'
  }
];

const DOC_CONFIG: MenuItem[] = [
  {
    itemKey: '2-1',
    text: 'workspace.doc.data',
    path: '/workspace/doc/data'
  },
  {
    itemKey: '2-2',
    text: 'workspace.doc.import',
    path: '/workspace/doc/import'
  },
  {
    itemKey: '2-3',
    text: 'workspace.doc.workshop',
    path: '/workspace/doc/workshop'
  }
];

const Work_CONFIG: MenuCItem[] = [
  {
    text: '邮箱发送',
    path: '/workspace/program'
  },
  {
    text: '邮箱绑定',
    path: '/workspace/mails'
  },
  {
    text: '定时邮箱',
    path: '/workspace/program-list'
  },
  {
    text: '发送日志',
    path: '/workspace/program-log'
  },
  {
    text: '团队管理',
    path: '/workspace/teams'
  },
  {
    text: '账号管理',
    path: '/workspace/account'
  },
  {
    text: '邮箱模板',
    path: '/workspace/mail-template'
  },
  {
    text: '团队成员',
    path: '/workspace/teams/users'
  },
  {
    text: '团队信息',
    path: '/workspace/teams/information'
  },
  {
    text: '大模型问答',
    path: '/workspace/ai-chat'
  }
];
export { PROJECT_CONFIG, DOC_CONFIG, Work_CONFIG };
