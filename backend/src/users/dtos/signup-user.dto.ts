import { ApiProperty } from "@nestjs/swagger";
import { LoginUserDto } from "./login-user.dto";
import { RoleDto } from "./role.dto";

export class SignUpUserDto extends LoginUserDto {
  @ApiProperty()
  roles: string[];
  @ApiProperty()
  nickname: string;
}