import { IAuditable } from "src/common/interface/IAuditable";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity("user")
export class User implements IAuditable {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  nickname: string;

  @Column({ nullable: true, })
  createDate: string;

  @Column({
    nullable: true,
  })
  createdBy: string;

  @Column({ nullable: true })
  lastModifyDate: string;

  @Column({ nullable: true })
  lastModifiedBy: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}