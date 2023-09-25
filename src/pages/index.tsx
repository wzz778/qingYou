import { useDispatch, useSelector } from 'react-redux';
import { IAppDispatch, IAppState, wrapper } from '@/store/index';
import { GetServerSideProps } from 'next';
import { getHomeInfoData } from '@/api/user';
import { useCallback, useEffect, useState } from 'react';
import { fetchHomeInfoAction } from '@/store/C-demo/requestDemo';
import { Button } from 'antd';
interface listRoot {
  id: number;
  typeName: string;
}
export default function Home() {
  const dispatch: IAppDispatch = useDispatch();
  const [pagination, setpagination] = useState({ pageNum: 1, pageSize: 5 });
  const [demoList, setDemoList] = useState<listRoot[]>([]);
  const getUserCb = useCallback(() => getHomeInfoData(), [pagination]);
  useEffect(() => {
    getUserCb()
      .then((res) => {
        setDemoList(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getUserCb]);
  return (
    <div style={{ minHeight: '400px', background: '#DADAE5' }}>
      <Button>add1</Button>
      <ul>
        {demoList.map((item) => {
          return <li key={item.id}>{item.typeName}</li>;
        })}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(function (store) {
  return async (context) => {
    await store.dispatch(fetchHomeInfoAction(1));
    return {
      props: {}
    };
  };
});
