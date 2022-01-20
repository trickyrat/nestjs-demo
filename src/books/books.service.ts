import { HttpCode, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Observable, of } from "rxjs";
import { Repository } from "typeorm";
import { BookDto } from "./dto/book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./entities/book.entity";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>
  ) {
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: string): Promise<Book> {
    return this.booksRepository.findOne(id)
  }

  async create(newBook: Book): Promise<Book> {
    return this.booksRepository.create(newBook)
  }

  // async update(id: string, updateBookDto: UpdateBookDto) {
  //   let book = await this.booksRepository.findOne(id)
  //   book.title = updateBookDto.title
  //   //this.booksRepository.update(book)
  // }

  async delete(id: string): Promise<void> {
    await this.booksRepository.delete(id)
  }
}