import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { randomInt } from 'crypto';
import { Observable, of } from 'rxjs';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDto } from './dto/book.dto';
import { UpdateBookDto } from './dto/update-book.dto';


@Controller('books')
export class BooksController {

  constructor(private booksService: BooksService) {

  }

  @Get()
  findAll(): Observable<BookDto[]> {
    let books = this.booksService.findAll()
    return
  }

  @Get(":id")
  findOne(@Param("id") id: string): Observable<BookDto> {
    return this.booksService.findOne(id)
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    this.booksService.update(id, updateBookDto)
  }

  @Post()
  async create(@Body() request: CreateBookDto) {
    let newBook: BookDto = { id: randomInt(1024).toString(), title: request.title }
    this.booksService.create(newBook)
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    this.booksService.delete(id)
  }
}
