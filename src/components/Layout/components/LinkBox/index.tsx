import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { IconGithubLogo, IconGlobeStroke, IconHelpCircle } from '@douyinfe/semi-icons';
const LinkBox = () => {
  const { push } = useRouter();

  // push('/workspace');

  return (
    <>
      <Tooltip content={'去GitHub看看怎么个事~'}>
        <Button
          theme="borderless"
          icon={<IconGithubLogo size="large" />}
          style={{
            color: 'black',
            marginRight: '12px'
          }}
          onClick={() => push('https://github.com/wzz778/qingYou')}
        />
      </Tooltip>
      <Tooltip content={'欢迎来掘金做客(*｀∀´*)ノ!'}>
        <Button
          theme="borderless"
          icon={<IconGlobeStroke size="large" />}
          style={{
            color: '#3381DA',
            marginRight: '12px'
          }}
          onClick={() => push('https://juejin.cn/user/3004330270263432')}
        />
      </Tooltip>
    </>
  );
};
export default LinkBox;
