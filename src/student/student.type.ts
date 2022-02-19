import { ObjectID } from 'typeorm';
import { LessonType } from './../lesson/lesson.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export class StudentType {
  @Field(() => ID)
  id: ObjectID;
  @Field()
  firstName: string;
  @Field()
  lastName: string;

  @Field((type) => [LessonType])
  lessons: LessonType[];
}
