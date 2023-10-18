declare interface similaritySearchResponseItem {
  pageContent: string;
  metadata: {
    content: string;
    metadata: string;
    namespace: string;
    source: string;
    _distance: number;
  };
}

declare interface Template {
  id: string;
  userId: number;
  emailTitle: string;
  emailContent: string;
  personOrTeam: number;
  teamId: any;
  createTime: string;
  updateTime: string;
  createUser: any;
  updateUser: any;
}
