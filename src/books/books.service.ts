import { HttpCode, Injectable } from "@nestjs/common";
import { BookDto } from "./dto/book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@Injectable()
export class BookService {
  books: BookDto[]


  constructor() {
    this.books = [
      new BookDto("1", "book1"),
      new BookDto("2", "book2"),
      new BookDto("3", "book3"),
      new BookDto("4", "book4"),
    ]
  }

  findAll(): BookDto[] {
    return this.books;
  }

  findOne(id: string): BookDto {
    let res = this.books.find(x => x.id === id)
    return res
  }

  async create(newBook: BookDto) {
    this.books.push(newBook)
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    let index = this.books.findIndex(x => x.id === id)
    if (index !== -1) {
      this.books[index].title = updateBookDto.title
    }
  }

  delete(id: string) {
    this.books.splice(this.books.findIndex(x => x.id === id), 1)
  }
}