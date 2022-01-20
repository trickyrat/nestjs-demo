import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { Author } from "./entities/author.entity";
import { Book } from "./entities/book.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule { }