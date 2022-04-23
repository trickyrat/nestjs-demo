import { IAuditable } from "src/common/interface/IAuditable";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role")
export class Role implements IAuditable {

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
}