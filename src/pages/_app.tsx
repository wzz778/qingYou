import 'normalize.css';
import 'reset-css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';

import AdminLayout from '@/components/Layout/AdminLayout/Layout';
import WorkSplaceLayout from '@/components/Layout/WorkSplaceLayout';
import FrontLayout from '@/components/Layout/FrontLayout/Layout';
import LoginLayout from '@/components/Layout/LoginLayout/Layout';
import useFetchUserInfo from '@/hooks/useFetchUserInfo';
import useMount from '@/hooks/useMount';
import useUserStore from '@/store/user';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');
  const isWorkSplaceRoute = router.pathname.startsWith('/workspace');
  const isLoginRoute = router.pathname.startsWith('/login');
  let LayoutComponent;
  //useFetchUserInfo();
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
