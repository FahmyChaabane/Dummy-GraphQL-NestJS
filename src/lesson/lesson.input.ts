import { ObjectID } from 'typeorm';
import { Field, InputType, ID } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @MinLength(2)
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(() => [ID], { defaultValue: [] })
  studentIds: number[];
}
