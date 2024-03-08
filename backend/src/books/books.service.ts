import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsService } from 'src/authors/authors.service';
import { DataSource, Repository } from 'typeorm';
import { BookQuery } from './queries/book.query';
import { CreateBookCommand } from './commands/create-book.command';
import { UpdateBookCommand } from './commands/update-book.command';
import { Book } from './entities/book.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    private dataSource: DataSource,
    private authorService: AuthorsService,
  ) {}

  async createMany(createBookDtos: CreateBookCommand[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const author = await this.authorService.findOne(createBookDtos[0].authorId);
    try {
      createBookDtos.forEach(async (x) => {
        const bookToInsert = new Book();
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

  async create(createBookDto: CreateBookCommand) {
    let bookToInsert = plainToClass(Book, createBookDto);
    //bookToInsert.title = createBookDto.title;
    //bookToInsert.publishDate = createBookDto.publishDate;
    const author = await this.authorService.findOne(createBookDto.authorId);
    bookToInsert.author = author;
    bookToInsert = await this.bookRepository.save(bookToInsert);
  }

  findAll(input: BookQuery): Promise<[Book[], number]> {
    let qb = this.bookRepository
      .createQueryBuilder('book')
      .innerJoin('book.author', 'author');
    if (input.filter) {
      qb = qb.andWhere('book.title like :title', { title: input.filter + '%' });
    }
    if (input.startDate && input.endDate) {
      qb = qb.andWhere('book.publishDate BETWEEN :start AND :end', {
        start: input.startDate,
        end: input.endDate,
      });
    }
    return qb
      .orderBy(input.sorting, input.order === 'asc' ? 'ASC' : 'DESC')
      .skip(input.skipCount)
      .take(input.maxResultCount)
      .getManyAndCount();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateBookDto: UpdateBookCommand) {
    let book = await this.bookRepository.findOne({ where: { id: id } });
    book = Object.assign(book, updateBookDto);
    // book.title = updateBookDto.title;
    // book.publishDate = updateBookDto.publishDate;
    const author = await this.authorService.findOne(updateBookDto.authorId);
    book.author = author;
    book = await this.bookRepository.save(book);
  }

  async remove(id: number) {
    const bookToDelete = await this.bookRepository.findOne({
      where: { id: id },
    });
    await this.bookRepository.remove(bookToDelete);
  }
}
