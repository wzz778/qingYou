import { Nav, Button, Typography } from '@douyinfe/semi-ui';
import Image from 'next/image';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { Themes } from '@/constants/enum';
import { useContext } from 'react';
import { ThemeContext } from '@/store/theme';
// import useUserStore from '@/store/user';
// import AuthRightBox from '../../components/AuthRightBox';

export default function NavBar() {
  const { push } = useRouter();
  // const { user, clearUser } = useUserStore();
  const { setTheme } = useContext(ThemeContext);
  const UnAuthRightBox = () => {
    const { Text } = Typography;

    return (
      <div className={styles.unAuth}>
        <Text type="primary" link onClick={() => push('/login')}>
          登录
        </Text>
        <Button type="primary" theme="solid" onClick={() => push('/login/register')}>
          注册
        </Button>
      </div>
    );
  };

  // const renderRightBox = () => {
  //   return <div>{!!user ? <AuthRightBox /> : UnAuthRightBox()}</div>;
  // };

  const renderHorizontal = () => {
    return (
      <div className={styles.navBar}>
        <a href="http://127.0.0.1:3000/">
          <div className={styles.logoIcon}></div>
        </a>
        4234
        <div className={styles.themeArea}>
          <div
            className={styles.themeIcon}
            onClick={(): void => {
              if (localStorage.getItem('theme') === Themes.light) {
                setTheme(Themes.dark);
              } else {
                setTheme(Themes.light);
              }
            }}
          ></div>
        </div>
      </div>
    );
  };
  return <div>{renderHorizontal()}</div>;
}
