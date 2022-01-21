import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListAllEntities } from 'src/listAllEntities.model';
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

  findAll(query: ListAllEntities): Promise<Author[]> {
    return this.authorRepository
      .createQueryBuilder("author")
      .where("author.name")
      .orderBy(query.sorting)
      .skip(query.skipCount)
      .take(query.maxResultCount)
      .getMany();
  }

  findOne(id: number) {
    return this.authorRepository.findOne(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    let author = await this.authorRepository.findOne(id)
    author.name = updateAuthorDto.name;
    await this.authorRepository.save(author)
  }

  async remove(id: number) {
    let authorToDelete = await this.authorRepository.findOne(id);
    await this.authorRepository.remove(authorToDelete);
  }
}
