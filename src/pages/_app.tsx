import 'normalize.css';
import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import nprogress from 'nprogress';
import Seo from '@/components/Seo';
import AdminLayout from '@/components/Layout/AdminLayout/Layout';
import WorkSplaceLayout from '@/components/Layout/WorkSplaceLayout';
import FrontLayout from '@/components/Layout/FrontLayout/Layout';
import LoginLayout from '@/components/Layout/LoginLayout/Layout';
import useFetchUserInfo from '@/hooks/useFetchUserInfo';
import 'nprogress/nprogress.css';
import '@/styles/globals.scss';

Router.events.on('routeChangeStart', nprogress.start);
Router.events.on('routeChangeError', nprogress.done);
Router.events.on('routeChangeComplete', nprogress.done);
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');
  const isWorkSplaceRoute = router.pathname.startsWith('/workspace');
  const isLoginRoute = router.pathname.startsWith('/login');
  let LayoutComponent;
  useFetchUserInfo();
  if (isAdminRoute) {
    LayoutComponent = AdminLayout;
  } else if (isWorkSplaceRoute) {
    LayoutComponent = WorkSplaceLayout;
  } else if (isLoginRoute) {
    LayoutComponent = LoginLayout;
  } else {
    LayoutComponent = FrontLayout;
  }
  return (
    <LayoutComponent>
      <Seo />
      <Component {...pageProps} />
    </LayoutComponent>
  );
}
