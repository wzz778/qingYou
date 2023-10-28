import { getTeamInfo } from '@/utils/common';
import { log } from 'console';
import { create } from 'zustand';

interface UseTeamStore {
  team: Teams | null;
  teamId: string;
  teamName: string;
  thisTeam: Team | null;
  setTeam: (teamData: Teams | null) => void;
  setTeamId: (teamId: string) => void;
  setTeamName: (teamName: string) => void;
  getTeam: (id: string) => Promise<{
    team: Teams;
    teamId: string;
  }>;
  updateTeams: (id: string) => Promise<{
    team: Teams;
    teamId: string;
  }>;
  clearTeam: () => void;
  setThisTeam: (teamData: Team | null) => void;
}

const useTeamStore = create<UseTeamStore>((set, get) => ({
  team: null,
  teamId: '0',
  teamName: '',
  thisTeam: null,
  setTeam: (teamData) => {
    set({ team: teamData });
  },
  setTeamId: (teamId) => {
    set({ teamId });
  },
  setTeamName: (teamName) => {
    set({ teamName });
  },
  getTeam: (id: string) => {
    return new Promise((resolve, reject) => {
      const team = get().team;
      const teamId = get().teamId;
      if (team) {
        resolve({
          team,
          teamId
        });
      } else {
        getTeamInfo(id).then((data) => {
          get().setTeam(data);
          resolve({
            team: data,
            teamId
          });
        });
      }
    });
  },
  updateTeams: (id: string) => {
    return new Promise((resolve, reject) => {
      const teamId = get().teamId;
      getTeamInfo(id).then((data) => {
        get().setTeam(data);
        resolve({
          team: data,
          teamId
        });
      });
    });
  },
  clearTeam: () => {
    set({ team: null, teamId: '0', teamName: '' });
  },
  setThisTeam: (team: any) => {
    set({ thisTeam: team });
  }
}));

export default useTeamStore;
