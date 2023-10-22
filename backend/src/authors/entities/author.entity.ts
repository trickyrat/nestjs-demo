import { Book } from 'src/books/entities/book.entity';
import { IAuditable } from 'src/common/interface/IAuditable';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('authors')
export class Author implements IAuditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'createdTime' })
  createdTime: string;

  @Column()
  createdBy: string;

  @UpdateDateColumn({ name: 'lastModifiedTime', nullable: true })
  lastModifiedTime: string;

  @Column({ nullable: true })
  lastModifiedBy: string;

  @OneToMany(() => Book, (b) => b.author)
  books: Book[];
}
