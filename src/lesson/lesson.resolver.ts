import { Student } from './../student/student.entity';
import { ObjectID } from 'typeorm';
import { AssignStudentLessonInput } from './assign-course-lesson.input';
import { StudentType } from './../student/student.type';
import { CreateLessonInput } from './lesson.input';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query((returns) => [LessonType])
  async allLessons(): Promise<Lesson[]> {
    return await this.lessonService.allLessons();
  }

  @Query((returns) => LessonType)
  async lesson(@Args('id', { type: () => ID }) id: ObjectID): Promise<Lesson> {
    return await this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return await this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  async assignCourseToLesson(
    @Args('assignStudentLessonInput')
    assignStudentLessonInput: AssignStudentLessonInput,
  ): Promise<Lesson> {
    return await this.lessonService.assignCourseToLesson(
      assignStudentLessonInput,
    );
  }

  @ResolveField('students', (returns) => [StudentType])
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    const { id } = lesson;
    return await this.lessonService.getStudentsForLesson(id);
  }
}
