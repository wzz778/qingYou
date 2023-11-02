import EditorCard from '@/components/EditorCard';
import { settingConfig } from '../config';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/user';
import { updateUserInfo } from '@/api/modules/user';
import { ToastWaring } from '@/utils/common';

const UserNameSettingCard = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExternallyDisabled, setIsExternallyDisabled] = useState(false);
  const config = settingConfig.nickname;

  const { user, setUser } = useUserStore();

  const initialValue = user?.nickname || '';

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value === initialValue) {
      setIsExternallyDisabled(true);
    } else {
      setIsExternallyDisabled(false);
    }
  };

  const handleSave = () => {
    if (!user) return;
    const filteredStr = inputValue.replace(/\s/g, '');
    if (filteredStr.length > 10 || filteredStr.length < 2) {
      ToastWaring('请输入符合2~10位字符的用户昵称！');
      return;
    }
    setLoading(true);
    updateUserInfo({ id: user?.id, nickname: inputValue, password: '' })
      .then((res) => {
        if (res.code == 200) {
          const newUser: User = {
            ...user,
            nickname: inputValue
          };
          setUser(newUser);
          setIsExternallyDisabled(true);
        }
      })
      .catch((err) => err)
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <EditorCard
      title={config.title}
      type="input"
      tips={config.tips}
      placeholder={'请输入你的名字'}
      initialValue={initialValue}
      value={inputValue}
      onInputChange={handleInputChange}
      onSave={handleSave}
      loading={loading}
      isExternallyDisabled={isExternallyDisabled}
    />
  );
};
export default UserNameSettingCard;
