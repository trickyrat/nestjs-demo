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
  ) { }

  async createMany(createBookCommands: CreateBookCommand[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const author = await this.authorService.findOne(createBookCommands[0].authorId);
    try {
      let booksToAdd: Book[] = [];
      createBookCommands.map((x) => {
        const bookToAdd = new Book();
        bookToAdd.title = x.title;
        bookToAdd.publishDate = x.publishDate;
        bookToAdd.price = x.price;
        bookToAdd.description = x.description;
        bookToAdd.isbn = x.isbn;
        bookToAdd.author = author;
        booksToAdd.push(bookToAdd);
      });
      await queryRunner.manager.save(booksToAdd);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async createManyCore(createBookCommands: CreateBookCommand[]) {
    let booksToAdd: Book[] = [];
    await Promise.all(
      createBookCommands.map(async (x) => {
        const author = await this.authorService.findOne(x.authorId);
        const bookToAdd = new Book();
        bookToAdd.title = x.title;
        bookToAdd.publishDate = x.publishDate;
        bookToAdd.price = x.price;
        bookToAdd.description = x.description;
        bookToAdd.isbn = x.isbn;
        bookToAdd.author = author;
        booksToAdd.push(bookToAdd);
      }));
    await this.bookRepository.save(booksToAdd);
  }

  async create(createBookCommand: CreateBookCommand) {
    let bookToInsert = plainToClass(Book, createBookCommand);
    //bookToInsert.title = createBookDto.title;
    //bookToInsert.publishDate = createBookDto.publishDate;
    const author = await this.authorService.findOne(createBookCommand.authorId);
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

  async seedData() {
    console.log("Seeding book data - Start");
    const existingCount = await this.bookRepository.count();
    if (existingCount > 0) {
      console.log("There is book data, Skip seeding");
      return;
    }
    const createBookCommands: CreateBookCommand[] = [
      { title: "A Brief History of Time", isbn: "978-0553380163", description: "A landmark volume in science writing by one of the great minds of our time, Stephen Hawking’s book explores such profound questions as: How did the universe begin—and what made its start possible? Does time always flow forward? Is the universe unending—or are there boundaries? Are there other dimensions in space? What will happen when it all ends?\nTold in language we all can understand, A Brief History of Time plunges into the exotic realms of black holes and quarks, of antimatter and “arrows of time,” of the big bang and a bigger God—where the possibilities are wondrous and unexpected. With exciting images and profound imagination, Stephen Hawking brings us closer to the ultimate secrets at the very heart of creation.", publishDate: "1998-09-01", price: 9.99, authorId: 1 },
      { title: "Python Crash Course, 3rd Edition: A Hands-On, Project-Based Introduction to Programming", isbn: "978-1718502703", description: "ython Crash Course is the world’s bestselling programming book, with over 1,500,000 copies sold to date!\nPython Crash Course is the world’s best-selling guide to the Python programming language. This fast-paced, thorough introduction will have you writing programs, solving problems, and developing functioning applications in no time.\nYou’ll start by learning basic programming concepts, such as variables, lists, classes, and loops, and practice writing clean code with exercises for each topic. You’ll also learn how to make your programs interactive and test your code safely before adding it to a project. You’ll put your new knowledge into practice by creating a Space Invaders–inspired arcade game, building a set of data visualizations with Python’s handy libraries, and deploying a simple application online.", publishDate: "2023-01-10", price: 31.99, authorId: 2 },
      { title: "System Design Interview – An insider's guide", isbn: "979-8664653403", description: "System Design Interview - An Insider's Guide (Volume 1)\nSystem design interviews are the most difficult to tackle of all technical interview questions. This book is Volume 1 of the System Design Interview - An insider’s guide series that provides a reliable strategy and knowledge base for approaching a broad range of system design questions. This book provides a step-by-step framework for how to tackle a system design question. It includes many real-world examples to illustrate the systematic approach, with detailed steps that you can follow.", publishDate: "", price: 37.99, authorId: 3 },
      { title: "JavaScript Crash Course: A Hands-On, Project-Based Introduction to Programming", isbn: "978-1718502260", description: "A fast-paced, thorough programming introduction that will have you writing your own software and web applications in no time.\nLike Python Crash Course, this hands-on guide is a must-have for anyone who wants to learn how to code from the ground up—this time using the popular JavaScript programming language.\nLearn JavaScript—Fast!", publishDate: "2024-03-05", price: 39.58, authorId: 4 },
      { title: "Grokking Algorithms, Second Edition", isbn: "978-1633438538", description: "A friendly, fully-illustrated introduction to the most important computer programming algorithms.\nMaster the most widely used algorithms and be fully prepared when you’re asked about them at your next job interview. With beautifully simple explanations, over 400 fun illustrations, and dozens of relevant examples, you’ll actually enjoy learning about algorithms with this fun and friendly guide!", publishDate: "2024-03-26", price: 47.49, authorId: 5 },
    ];
    await this.createManyCore(createBookCommands);
    console.log("Seeding book data - End");
  }
}
