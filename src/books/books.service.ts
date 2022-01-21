import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>) {

  }

  async create(createBookDto: CreateBookDto) {
    let book = new Book();
    book.title = createBookDto.title;
    book.publishDate = createBookDto.publishDate;
    let author = await this.authorRepository.findOne(createBookDto.authorId);
    book.author = author;
    book = await this.bookRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne(id);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    let book = await this.bookRepository.findOne(id);
    book.title = updateBookDto.title;
    book.publishDate = updateBookDto.publishDate;
    let author = await this.authorRepository.findOne(updateBookDto.authorId);
    book.author = author;
    book = await this.bookRepository.save(book);
  }

  async remove(id: number) {
    let bookToDelete = await this.bookRepository.findOne(id);
    await this.bookRepository.remove(bookToDelete);
  }
}
