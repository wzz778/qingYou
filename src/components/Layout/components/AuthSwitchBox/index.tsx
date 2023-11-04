import None from '@/components/dataAcquisition/None';
import useTeamStore from '@/store/team';
import useUserStore from '@/store/user';
import { ToastSuccess, clearUserToken, execConfirm } from '@/utils/common';
import {
  IconBranch,
  IconCopyAdd,
  IconGallery,
  IconUser,
  IconUserCircle,
  IconUserGroup
} from '@douyinfe/semi-icons';
import { Button, Dropdown, DropdownDivider, Spin, Tag } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './index.module.scss';
const AuthSwitchBox = () => {
  const { push } = useRouter();
  const { user } = useUserStore();
  const { team, teamId, teamName, setTeamId, setTeamName, setThisTeam } = useTeamStore();
  if (!team) return;
  const isEmpty = team.length == 0;
  const changeTeam = async (id: string, name: string, team?: Team) => {
    setTeamId(id);
    setTeamName(name);
    if (team) {
      setThisTeam(team);
    }
    if (id == '0') {
      localStorage.removeItem('qyTeamId');
    } else {
      localStorage.setItem('qyTeamId', id);
    }
    localStorage.setItem('qyTeamName', name);

    push('/workspace');
  };
  return (
    <>
      <Dropdown
        position="bottomLeft"
        style={{ width: '220px' }}
        render={
          <Dropdown.Menu>
            <Dropdown.Title>个人版</Dropdown.Title>
            <Dropdown.Item
              type="primary"
              className={teamId == '0' ? styles.getSelected : ''}
              icon={<IconUserCircle />}
              onClick={() =>
                execConfirm(
                  () => changeTeam('0', user?.nickname || ''),
                  undefined,
                  `你确定切换到个人账号？`
                )
              }
            >
              {user?.nickname}
            </Dropdown.Item>
            <DropdownDivider />
            <Dropdown.Title>团队版</Dropdown.Title>
            {isEmpty ? (
              <Dropdown.Item icon={<IconGallery />} type="tertiary">
                无数据
              </Dropdown.Item>
            ) : (
              <>
                {team.map((item) => (
                  <div key={item.id}>
                    <Dropdown.Item
                      icon={<IconBranch />}
                      type="secondary"
                      className={teamId == item.id ? styles.getSelected : ''}
                      onClick={() =>
                        execConfirm(
                          () => changeTeam(item.id, item.teamName, item),
                          undefined,
                          `你确定切换到   ${item.teamName}   账号？`
                        )
                      }
                    >
                      {item.teamName}
                    </Dropdown.Item>
                  </div>
                ))}
              </>
            )}
            <Dropdown.Item
              icon={<IconCopyAdd />}
              type="primary"
              onClick={() => push('/workspace/teams')}
            >
              创建团队
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <Button
          theme="borderless"
          style={{
            color: 'var(--semi-color-text-2)',
            marginRight: '40px'
          }}
        >
          {teamId == '0' ? (
            <>
              <Tag size="large" color="light-green" prefixIcon={<IconUser />}>
                个人版
              </Tag>
              <span style={{ padding: '0 10px', color: '#009A4B' }}>{user?.nickname}</span>
            </>
          ) : (
            <>
              <Tag size="large" color="light-blue" prefixIcon={<IconUserGroup />}>
                团队版
              </Tag>
              <span style={{ padding: '0 10px', color: '#004C8E' }}>{teamName}</span>
              的空间
            </>
          )}
        </Button>
      </Dropdown>
    </>
  );
};
export default AuthSwitchBox;
