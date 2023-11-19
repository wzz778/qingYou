import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { Button, Tooltip, Typography } from '@douyinfe/semi-ui';
import { IconGithubLogo, IconGlobeStroke, IconHelpCircle } from '@douyinfe/semi-icons';
const LinkBox = () => {
  const { push } = useRouter();
  const { Text } = Typography;
  // push('/workspace');
  return (
    <>
      <Tooltip content={'去查看帮助文档 🐱‍🏍'}>
        <Text link={{ href: 'https://zezhengyyds.gitee.io/qingYouDocs/', target: '_blank' }}>
          <Button
            theme="borderless"
            icon={<IconHelpCircle size="large" />}
            style={{
              color: '#626466',
              margin: '0 2px'
            }}
          />
        </Text>
      </Tooltip>
      <Tooltip content={'去GitHub看看怎么个事 ~ 🐱‍👤'}>
        <Text link={{ href: 'https://github.com/wzz778/qingYou', target: '_blank' }}>
          <Button
            theme="borderless"
            icon={<IconGithubLogo size="large" />}
            style={{
              color: 'black',
              margin: '0 2x'
            }}
          />
        </Text>
      </Tooltip>
      <Tooltip content={'欢迎来我的掘金做客(*｀∀´*)ノ! 🛸'}>
        <Text link={{ href: 'https://juejin.cn/user/3004330270263432', target: '_blank' }}>
          <Button
            theme="borderless"
            icon={<IconGlobeStroke size="large" />}
            style={{
              color: '#3381DA',
              margin: '0 2px'
            }}
          />
        </Text>
      </Tooltip>
    </>
  );
};
export default LinkBox;
