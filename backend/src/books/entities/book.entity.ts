import { Author } from 'src/authors/entities/author.entity';
import { IAuditable } from 'src/common/interface/IAuditable';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export class Book implements IAuditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  title: string;

  @Column()
  publishDate: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'createdTime' })
  createdTime: string;

  @Column()
  createdBy: string;

  @UpdateDateColumn({ name: 'lastModifiedTime', nullable: true })
  lastModifiedTime: string;

  @Column({ nullable: true })
  lastModifiedBy: string;

  @ManyToOne(() => Author, (author) => author.books, { cascade: true })
  author: Author;
}
