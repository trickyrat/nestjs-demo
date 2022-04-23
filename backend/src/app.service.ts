import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  constructor(private usersService: UsersService) { }

  onApplicationBootstrap() {
    this.usersService.seedData();
  }
}
