import 'normalize.css';
import 'antd/dist/reset.css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/C-user/layout';
import Router, { useRouter } from 'next/router';
import { wrapper } from '../store';
import { Provider } from 'react-redux';

import AdminLayout from '@/components/Layout/AdminLayout/Layout';
import WorkSplaceLayout from '@/components/Layout/WorkSplaceLayout/Layout';
import FrontLayout from '@/components/Layout/FrontLayout/Layout';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  // console.log(router.pathname);
  const isAdminRoute = router.pathname.startsWith('/admin');
  const isWorkSplaceRoute = router.pathname.startsWith('/workspace');

  const LayoutComponent = isAdminRoute
    ? AdminLayout
    : isWorkSplaceRoute
    ? WorkSplaceLayout
    : FrontLayout;
  return (
    <div>
      <Provider store={store}>
        <LayoutComponent>
          <Component {...props.pageProps} />
        </LayoutComponent>
      </Provider>
    </div>
  );
}
