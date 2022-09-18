import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('users')
@ApiTags("Users")
export class UserController {
  constructor() {

  }

}