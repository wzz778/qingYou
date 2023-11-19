import { Button, Typography, Tooltip } from '@douyinfe/semi-ui';
import Image from 'next/image';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { Themes } from '@/constants/enum';
import { useContext } from 'react';
import { ThemeContext } from '@/store/theme';
import useUserStore from '@/store/user';
import AuthRightBox from '../../components/AuthRightBox';
import LinkBox from '../../components/LinkBox';

export default function NavBar() {
  const { push } = useRouter();
  const { user } = useUserStore();
  const { setTheme } = useContext(ThemeContext);

  const UnAuthRightBox = () => {
    return (
      <div className={styles.unAuth}>
        <Button theme="solid" onClick={() => push('/login')}>
          登录
        </Button>
        <Button onClick={() => push('/login/register')}>注册</Button>
      </div>
    );
  };

  const renderRightBox = () => {
    return <div>{user ? <AuthRightBox /> : UnAuthRightBox()}</div>;
  };

  const renderHorizontal = () => {
    return (
      <div className={styles.navBar}>
        <div className={styles.navCon}>
          <a href="\">
            <div className={styles.logoIcon}></div>
          </a>
          <div className={styles.themeArea}>
            <LinkBox />
            <Tooltip content={'切换显示模式 👀'}>
              <Button
                className={styles.themeIcon}
                style={{
                  marginLeft: 6,
                  marginRight: 20
                }}
                onClick={(): void => {
                  if (localStorage.getItem('theme') === Themes.light) {
                    setTheme(Themes.dark);
                  } else {
                    setTheme(Themes.light);
                  }
                }}
              ></Button>
            </Tooltip>
            {renderRightBox()}
          </div>
        </div>
      </div>
    );
  };
  return <div>{renderHorizontal()}</div>;
}
