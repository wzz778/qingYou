import 'normalize.css';
import 'reset-css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';

import AdminLayout from '@/components/Layout/AdminLayout/Layout';
import WorkSplaceLayout from '@/components/Layout/WorkSplaceLayout';
import FrontLayout from '@/components/Layout/FrontLayout/Layout';
import LoginLayout from '@/components/Layout/LoginLayout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // console.log(router.pathname);
  const isAdminRoute = router.pathname.startsWith('/admin');
  const isWorkSplaceRoute = router.pathname.startsWith('/workspace');
  const isLoginRoute = router.pathname.startsWith('/login');
  let LayoutComponent;

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
      <Component {...pageProps} />
    </LayoutComponent>
  );
}
