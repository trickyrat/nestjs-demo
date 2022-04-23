import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagedSortedAndFilteredResultRequestDto } from 'src/common/dto/PagedSortedAndFilteredResultRequest.dto';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>) {
  }

  create(createAuthorDto: CreateAuthorDto) {
    let author = new Author();
    author.name = createAuthorDto.name;
    this.authorRepository.save(author);
  }

  async findAll(query: PagedSortedAndFilteredResultRequestDto): Promise<[Author[], number]> {
    let qb = this.authorRepository.createQueryBuilder("author");
    if (query.filter) {
      qb = qb.where("author.name like :name", { name: query.filter + "%" });
    }
    return qb.orderBy(query.sorting, query.order === "asc" ? "ASC" : "DESC")
      .getManyAndCount();
  }

  async findOne(id: number): Promise<Author> {
    return await this.authorRepository.findOne({ id: id });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    let author = await this.authorRepository.findOne(id)
    author.name = updateAuthorDto.name;
    await this.authorRepository.save(author)
  }

  async remove(id: number): Promise<void> {
    let authorToDelete = await this.authorRepository.findOne(id);
    await this.authorRepository.remove(authorToDelete);
  }
}
