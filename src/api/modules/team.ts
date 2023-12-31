import { Hyrequire } from '../';

//团队crud
export const addTeam = (data: any) => {
  return Hyrequire.post({
    url: '/user/team/addTeam',
    params: data
  });
};

export const updateTeam = (params: any) => {
  return Hyrequire.put({
    url: '/user/team/updateTeam',
    params
  });
};

export const deleteTeam = (id: string) => {
  return Hyrequire.delete({
    url: `/user/team/deleteTeamById/${id}`
  });
};

export const queryTeamPersonal = (params: any) => {
  return Hyrequire.get({
    url: '/user/team/queryTeamPage',
    params
  });
};

export const queryTeamById = (id: string) => {
  return Hyrequire.get({
    url: `/user/team/queryTeamById/${id}`
  });
};

//成员

export const addMember = (data: any) => {
  return Hyrequire.post({
    url: '/user/team/addMember',
    params: data
  });
};

export const queryMemberPage = (params: any) => {
  return Hyrequire.get({
    url: '/user/team/queryMemberPage',
    params
  });
};

export const deleteMemberById = (id: string) => {
  return Hyrequire.delete({
    url: `/user/team/deleteMemberById/${id}`
  });
};
