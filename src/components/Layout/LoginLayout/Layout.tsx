import NavBar from './../FrontLayout/NavBar';
import styles from './index.module.scss';
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.loginBox}>{children}</div>
      </main>
    </div>
  );
}
