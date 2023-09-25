import { memo, ReactNode } from 'react';
//type
import type { FC } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import styles from './index.module.scss';
interface IProps {
  children?: ReactNode;
  // datas?: any[];
}

const Layout: FC<IProps> = (props) => {
  const { children } = props;
  return (
    <div className="Layout">
      <Navbar></Navbar>
      <div style={{ margin: '60px auto 0px', maxWidth: '1100px' }}> {children}</div>

      <Footer></Footer>
    </div>
  );
};

export default memo(Layout);
Layout.displayName = 'Layout';
