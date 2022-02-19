import { LessonType } from './../lesson/lesson.type';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  async allStudents(): Promise<Student[]> {
    return await this.studentService.allStudents();
  }

  @Query((returns) => StudentType)
  async student(@Args('id', { type: () => Int }) id: number): Promise<Student> {
    return await this.studentService.getStudent(id);
  }

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return await this.studentService.createStudent(createStudentInput);
  }

  @ResolveField('lessons', (returns) => [LessonType])
  async lessons(@Parent() student: Student) {
    const { id } = student;
    return await this.studentService.getLessonsForStudent(id);
  }
}
