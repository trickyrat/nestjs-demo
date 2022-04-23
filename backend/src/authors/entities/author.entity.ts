import { Book } from "src/books/entities/book.entity";
import { IAuditable } from "src/common/interface/IAuditable";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author implements IAuditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createDate: string;

  @Column()
  createdBy: string;

  @Column()
  lastModifyDate: string;

  @Column()
  lastModifiedBy: string;

  @OneToMany(type => Book, b => b.author)
  books: Book[];

}
