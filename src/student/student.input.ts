import { MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  @MinLength(2)
  firstName: string;
  @Field()
  @MinLength(2)
  lastName: string;
}
