import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Role } from '../enums/role.enum';
@Entity()
export class Users extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ length: 500 })
  password: string;

//mysql cant use array type
  @Column({ length: 500 })
  roles: string;
}
