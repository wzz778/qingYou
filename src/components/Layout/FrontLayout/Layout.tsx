import { Footer } from './Footer';
import NavBar from './NavBar';
import { footerData } from './footerData';
import styles from './index.module.scss';
import { ThemeContextProvider } from '@/store/theme';
export default function FrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <div className={styles.layout}>
        <NavBar />
        <main className={styles.main}>{children}</main>
        <Footer {...footerData} />
      </div>
    </ThemeContextProvider>
  );
}
