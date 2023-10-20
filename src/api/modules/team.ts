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

export const deleteTeam = (id: any) => {
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
