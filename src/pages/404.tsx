import { memo } from 'react';
// import classNames from "classnames";
import Image from 'next/image';
import fail404Img from 'public/images/404.svg';
import Header from '@/components/Layout/FrontLayout/NavBar';
//type
import type { FC } from 'react';
interface IProps {
  datas?: any[];
}

const FailPage: FC<IProps> = (props) => {
  return (
    <>
      <Header />
      <div style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1>您所访问的页面不存在 . . .</h1>
        <Image src={fail404Img} alt={'404'} width={500} height={500} priority></Image>
      </div>
    </>
  );
};

export default memo(FailPage);
FailPage.displayName = 'FailPage';
