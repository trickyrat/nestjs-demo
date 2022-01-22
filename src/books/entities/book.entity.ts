import { Author } from "src/authors/entities/author.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
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

  @ManyToOne(type => Author, author => author.books, { cascade: true })
  author: Author;
}
