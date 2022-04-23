export interface JwtPayload {
  username: string,
  nickname: string,
  roles: string[],
  permissions: string[],
}