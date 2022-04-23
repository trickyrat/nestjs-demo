import { LoginUserDto } from "./login-user.dto";

export interface SignUpUserDto extends LoginUserDto {
  role: string[],
  nickname: string,
}