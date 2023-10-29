import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { Button } from '@douyinfe/semi-ui';
import { IconBell, IconHelpCircle } from '@douyinfe/semi-icons';
const LinkBox = () => {
  const { push } = useRouter();

  // push('/workspace');

  return (
    <>
      <Button
        theme="borderless"
        icon={<IconBell size="large" />}
        style={{
          color: 'var(--semi-color-text-2)',
          marginRight: '12px'
        }}
      />
      <Button
        theme="borderless"
        icon={<IconHelpCircle size="large" />}
        style={{
          color: 'var(--semi-color-text-2)',
          marginRight: '12px'
        }}
      />
    </>
  );
};
export default LinkBox;
