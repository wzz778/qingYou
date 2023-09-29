import NavBar from './NavBar';
import styles from './index.module.scss';
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
