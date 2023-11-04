import EditorCard from '@/components/EditorCard';
import { settingConfig } from '../../config';
import { useEffect, useState } from 'react';
import { updateTeam } from '@/api/modules/team';
import useTeamStore from '@/store/team';
import useUserStore from '@/store/user';
import { ToastError, ToastWaring, getTeamInfo, handleLength } from '@/utils/common';

const TeamDescriptionCard = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExternallyDisabled, setIsExternallyDisabled] = useState(false);
  const { team, setTeam, teamId, thisTeam, setThisTeam } = useTeamStore();
  const { user } = useUserStore();

  const config = settingConfig.teamdes;
  if (!team || !user || !thisTeam) {
    return;
  }
  const initialValue = thisTeam.teamNotes || '';

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value === initialValue) {
      setIsExternallyDisabled(true);
    } else {
      setIsExternallyDisabled(false);
    }
  };

  const handleSave = () => {
    if (!handleLength(inputValue, 2, 50)) {
      ToastWaring('请输入符合2~50位字符的用户昵称！');
    }
    setLoading(true);
    updateTeam({ id: teamId, teamNotes: inputValue })
      .then((res) => {
        if (res.code == 200) {
          setIsExternallyDisabled(true);
        } else {
          ToastError('请求失败');
          throw new Error('请求失败');
        }
      })
      .then(() => {
        setThisTeam({ ...thisTeam, teamNotes: inputValue });
        return getTeamInfo(user.id);
      })
      .then((teams) => {
        setTeam(teams);
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
      placeholder="请输入团队描述"
      initialValue={initialValue}
      value={inputValue}
      onInputChange={handleInputChange}
      onSave={handleSave}
      loading={loading}
      isExternallyDisabled={isExternallyDisabled}
      onlyDisplay={thisTeam.teamManager + '' != user.id}
    />
  );
};
export default TeamDescriptionCard;
