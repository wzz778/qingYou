import EditorCard from '@/components/EditorCard';
import { settingConfig } from '../../config';
import { useEffect, useState } from 'react';
import { updateTeam } from '@/api/modules/team';
import useTeamStore from '@/store/team';
import useUserStore from '@/store/user';
import { ToastError, getTeamInfo } from '@/utils/common';

const TeamNameCard = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExternallyDisabled, setIsExternallyDisabled] = useState(false);
  const { team, setTeam, teamName, teamId, thisTeam, setTeamName } = useTeamStore();
  const { user } = useUserStore();

  const config = settingConfig.username;
  if (!team || !user || !thisTeam) {
    return;
  }
  const initialValue = teamName || '';

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value === initialValue) {
      setIsExternallyDisabled(true);
    } else {
      setIsExternallyDisabled(false);
    }
  };

  const handleSave = () => {
    setLoading(true);
    updateTeam({ id: teamId, teamName: inputValue })
      .then((res) => {
        if (res.code == 200) {
          setIsExternallyDisabled(true);
          setTeamName(inputValue);
        } else {
          ToastError('请求失败');
          throw new Error('请求失败');
        }
      })
      .then(() => {
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
      placeholder="请输入团队名"
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
export default TeamNameCard;
