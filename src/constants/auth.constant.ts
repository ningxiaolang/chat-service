export const PUBLIC_KEY = '__publicKey__';

export const AuthStrategy = {
  JWT: 'jwt',
  LOCAL: 'local',
  GOOGLE: 'qq',
  FACEBOOK: 'wx',
  GITHUB: 'github',
} as const;

export const AuthType = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const AuthRoles = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export type Role = (typeof AuthRoles)[keyof typeof AuthRoles];
