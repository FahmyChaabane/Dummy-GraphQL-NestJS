import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AssignStudentLessonInput {
  @Field(() => ID)
  lessonId: number;
  @Field(() => ID)
  studentId: number;
}
