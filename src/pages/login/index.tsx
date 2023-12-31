import styles from './index.module.scss';
import { Button } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import Image from 'next/image';
// import { githubClientId } from '@/api/github';
import cName from 'classnames';
import { useEffect } from 'react';
export default function Login() {
  const { push } = useRouter();
  //const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}`;

  // const githubAuth = () => {
  //   window.location.href = githubAuthUrl;
  // };
  useEffect(() => {
    // getHomeInfoData().then((res) => {
    //   console.log(res);
    // });
  });
  return (
    <main className={styles.loginScreen}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.title}>
            <Image
              src={'/qingYouLogo.svg'}
              priority
              alt="qingYouLogo"
              width={150}
              height={60}
            ></Image>
          </h1>
        </div>
        <div className={styles.loginPath}>
          <Button
            theme={'solid'}
            className={styles.loginPathButton}
            onClick={() => push('/login/email')}
          >
            邮箱登录
          </Button>
          {/* <Button
            type='primary'
            theme='solid'
            block
            className={styles.loginPathButton}
            onClick={githubAuth}
          >
            Github 授权
          </Button> */}
        </div>
        <div className={styles.forgetContainer}>
          <Button
            // theme="borderless"
            // type="tertiary"
            // block
            type="primary"
            block
            className={styles.loginPathButton}
            onClick={() => push('/login/register')}
          >
            注册
          </Button>
          {/* //TODO: 忘记密码 */}
          {/* <Button theme="borderless" type="tertiary" block className={styles.loginPathButton}>
            忘记密码
          </Button> */}
        </div>
      </div>
    </main>
  );
}
