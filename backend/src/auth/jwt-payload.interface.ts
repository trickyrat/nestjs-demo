export interface JwtPayload {
  account: string,
  name: string,
  roles: string[],
  permissions: string[],
}