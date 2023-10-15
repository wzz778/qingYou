import usePageIntercept from '@/hooks/usePageIntercept';
import Footer from './Footer';
import NavBar from './NavBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // usePageIntercept('a');
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
