import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  title: string

  @Column()
  authorId: number
}
