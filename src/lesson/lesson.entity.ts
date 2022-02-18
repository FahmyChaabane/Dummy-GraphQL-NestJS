import { Student } from './../student/student.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  @ManyToMany(() => Student, (student) => student.lessons)
  @JoinTable()
  students: Student[];
}
