import { Button, Typography } from '@douyinfe/semi-ui';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
export default function NavBar() {
  const { push } = useRouter();
  const UnAuthRightBox = () => {
    return (
      <div className={styles.unAuth}>
        <Button onClick={() => push('/login')} theme={'solid'}>
          登录
        </Button>
        <Button onClick={() => push('/login/register')}>注册</Button>
      </div>
    );
  };

  const renderHorizontal = () => {
    return (
      <div className={styles.navBar}>
        <div className={styles.navCon}>
          <a href="http://127.0.0.1:3000/">
            <div className={styles.logoIcon}></div>
          </a>
          <div className={styles.themeArea}>{UnAuthRightBox()}</div>
        </div>
      </div>
    );
  };
  return <>{renderHorizontal()}</>;
}
