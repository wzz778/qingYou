import 'normalize.css';
import 'antd/dist/reset.css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/C-user/layout';
import { wrapper } from '../store';
import { Provider } from 'react-redux';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <div>
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </div>
  );
}
