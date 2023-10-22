import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';

export class SignUpUserDto extends LoginUserDto {
  @ApiProperty()
  roles: string[];
  @ApiProperty()
  nickname: string;
}
