import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthorsService } from './authors/authors.service';
import { BooksService } from './books/books.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private usersService: UsersService,
    private authorService: AuthorsService,
    private bookService: BooksService) {}

  onApplicationBootstrap() {
    this.usersService.seedData();

    this.authorService.seedData();

    this.bookService.seedData();
  }
}
