import { ThemeContextProvider } from '@/store/theme';
import NavBar from './../FrontLayout/NavBar';
import styles from './index.module.scss';
import Image from 'next/image';
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <div className={styles.layout}>
        <NavBar />
        <main className={styles.main}>
          <div className={styles.mainLoginSvg}>
            <Image
              src={'/qingYouBorder.svg'}
              priority
              alt={'qingYouBorder'}
              width={120}
              height={45}
              style={{ position: 'absolute', top: 30, left: 30, zIndex: 8 }}
            ></Image>
            <img src={'/images/login.svg'} alt={'login.svg'} className={styles.mainSvg}></img>
          </div>
          <div className={styles.mainLoginContent}>
            <div className={styles.loginBox}>{children}</div>
          </div>
        </main>
      </div>
    </ThemeContextProvider>
  );
}
