import useUserStore from '@/store/user';
import useMount from './useMount';
import { useRouter } from 'next/router';
import { ToastError } from '@/utils/common';
const usePageIntercept = (page: string) => {
  const { user } = useUserStore();
  const { push } = useRouter();
  const pushLoginFn = () => {
    ToastError('网络错误！');
    push('/login');
  };
  useMount(() => {
    if (!user) {
      pushLoginFn();
    } else {
      if (page == 'a' && user.status == '0') {
        pushLoginFn();
      }
    }
  });
};

export default usePageIntercept;
