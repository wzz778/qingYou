declare interface Team {
  id: string;
  teamName: string;
  teamManager: number;
  teamNotes: string;
  createTime: string;
  updateTime: any;
  createUser: any;
  updateUser: any;
}

declare type Teams = Team[];

declare interface Member {
  id: string;
  username: string;
  password: string;
  nickname: string;
  enabled: string;
  img: string;
  status: string;
}

declare type Members = Member[];
