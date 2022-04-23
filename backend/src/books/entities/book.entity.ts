import { Author } from "src/authors/entities/author.entity";
import { IAuditable } from "src/common/interface/IAuditable";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book implements IAuditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  title: string;

  @Column()
  publishDate: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createDate: string;

  @Column()
  createdBy: string;

  @Column()
  lastModifyDate: string;

  @Column()
  lastModifiedBy: string;

  @ManyToOne(type => Author, author => author.books, { cascade: true })
  author: Author;
}
