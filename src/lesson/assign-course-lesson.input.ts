import { ObjectID } from 'typeorm';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AssignStudentLessonInput {
  @Field(() => ID)
  lessonId: ObjectID;
  @Field(() => ID)
  studentId: ObjectID;
}
