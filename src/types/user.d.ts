declare enum ProfileGenderEnum {
  male = 'male',
  female = 'female',
  other = 'other'
}

declare enum UserAccountTypeEnum {
  email = 'email',
  github = 'github'
}

declare interface User {
  id: string;
  username: string;
  password: string;
  nickname: string;
  enabled: number;
  img: any;
  status: string;
}

declare interface Profile {
  id: string;
  gender: ProfileGenderEnum;
  img?: string | null;
  // photo?: string | null;
  description?: string | null;
  githubLogin?: string | null;
  githubName?: string | null;
  userId?: string | null;
  lastLoginAt: Date;
  refreshToken?: string | null;
  refreshTokenExpiresAt?: bigint | null;
}

declare interface Log {
  id: string;
  createdAt: Date;
  path: string;
  data: string;
  result: number;
  userId?: string | null;
}

declare interface Role {
  id: number;
  name: string;
  roles: UsersRole[];
}

declare interface UsersRole {
  userId: string;
  roleId: number;
}

declare enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

declare enum AccountType {
  EMAIL = 'email',
  GITHUB = 'github'
}
