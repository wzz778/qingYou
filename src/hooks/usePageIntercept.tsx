import useUserStore from '@/store/user';
const usePageIntercept = (page: string) => {
  const { user } = useUserStore();
  console.log(user);

  if (!user) {
    console.log('!user');

    return false;
  } else {
    if (user.status == '1') {
      return true;
    } else {
      if (page == 'a') {
        return false;
      }
    }
  }
};

export default usePageIntercept;
