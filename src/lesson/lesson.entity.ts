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
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  name: string;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  @Column({ default: [] })
  students: ObjectID[];
}
