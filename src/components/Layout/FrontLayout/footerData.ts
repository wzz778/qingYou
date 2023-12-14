import weixin from '@/assets/images/weixin.jpg';
export const footerData = {
  title: 'Demo',
  linkList: [
    {
      title: '技术栈',
      list: [
        {
          label: 'next'
        },
        {
          label: 'react'
        },
        {
          label: 'typescript'
        },
        {
          label: 'nodejs'
        }
      ]
    },
    {
      title: '了解更多',
      list: [
        {
          label: 'gitHub',
          link: 'https://github.com/wzz778'
        },
        {
          label: '掘金',
          link: 'https://juejin.cn/user/3004330270263432'
        },
        {
          label: 'csdn',
          link: 'https://blog.csdn.net/Azbtt'
        }
      ]
    },
    {
      title: '联系我',
      list: [{ label: '微信' }, { label: 'QQ' }]
    }
  ],
  qrCode: {
    image: weixin,
    text: '阿泽爱干饭'
  },
  copyRight: 'Copyright © 2023 青邮. 保留所有权利',
  siteNumber: '豫ICP备2023036864',
  publicNumber: '豫ICP备2023036864'
};
