import { Lesson } from './../lesson/lesson.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ default: [] })
  lessons: ObjectID[];
}
