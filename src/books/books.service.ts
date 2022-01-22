import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsService } from 'src/authors/authors.service';
import { Connection, EntityNotFoundError, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    private connection: Connection,
    private authorService: AuthorsService) {

  }

  async createMany(createBookDtos: CreateBookDto[]) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let author = await this.authorService.findOne(createBookDtos[0].authorId);
    try {
      createBookDtos.forEach(async x => {
        let bookToInsert = new Book();
        bookToInsert.title = x.title;
        bookToInsert.publishDate = x.publishDate;
        bookToInsert.author = author;
        await queryRunner.manager.save(bookToInsert);
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async create(createBookDto: CreateBookDto) {
    let bookToInsert = new Book();
    bookToInsert.title = createBookDto.title;
    bookToInsert.publishDate = createBookDto.publishDate;
    let author = await this.authorService.findOne(createBookDto.authorId);
    bookToInsert.author = author;
    bookToInsert = await this.bookRepository.save(bookToInsert);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ "id": id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    let book = await this.bookRepository.findOne({ "id": id });
    book.title = updateBookDto.title;
    book.publishDate = updateBookDto.publishDate;
    let author = await this.authorService.findOne(updateBookDto.authorId);
    book.author = author;
    book = await this.bookRepository.save(book);
  }

  async remove(id: number) {
    let bookToDelete = await this.bookRepository.findOne(id);
    await this.bookRepository.remove(bookToDelete);
  }
}
