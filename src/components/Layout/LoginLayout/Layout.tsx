import { ThemeContextProvider } from '@/store/theme';
import NavBar from './../FrontLayout/NavBar';
import styles from './index.module.scss';
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <div className={styles.layout}>
        <NavBar />
        <main className={styles.main}>
          <div className={styles.loginBox}>{children}</div>
        </main>
      </div>
    </ThemeContextProvider>
  );
}
