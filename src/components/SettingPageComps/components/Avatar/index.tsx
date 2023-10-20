import EditorCard from '@/components/EditorCard';
import { settingConfig } from '../../config';
import useUserStore from '@/store/user';
import { updateUserInfo } from '@/api/modules/user';
import UploadImg from '@/components/Upload';

import styles from './index.module.scss';

const AvatarettingCard = () => {
  const { user, setUser } = useUserStore();

  const config = settingConfig.img;
  const defaultAvatar = user?.img || '';

  const successHandle = (url: string) => {
    return new Promise((resolve, reject) => {
      if (!user) return;
      updateUserInfo({ id: user?.id, img: url, password: '' })
        .then((res) => {
          console.log(res);
          const newUser: User = {
            ...user,
            img: url
          };
          setUser(newUser);
          resolve(res.data);
        })
        .catch(reject);
    });
  };
  return (
    <EditorCard
      title={config.title}
      type="customDefinition"
      description={config.description}
      tips={config.tips}
    >
      <div className={styles.avatarContainer}>
        {config.description}
        <UploadImg
          imageUrl={defaultAvatar}
          username={user?.nickname || ''}
          successHandle={successHandle}
        />
      </div>
    </EditorCard>
  );
};
export default AvatarettingCard;
