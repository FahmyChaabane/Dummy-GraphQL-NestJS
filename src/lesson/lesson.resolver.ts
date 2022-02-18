import { AssignStudentLessonInput } from './assign-course-lesson.input';
import { StudentService } from './../student/student.service';
import { StudentType } from './../student/student.type';
import { CreateLessonInput } from './lesson.input';
import { ObjectID } from 'typeorm';
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
  async lesson(@Args('id', { type: () => ID }) id: number): Promise<Lesson> {
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
  async students(@Parent() lesson: Lesson) {
    const { id } = lesson;
    return await this.lessonService.getStudentsForLesson(id);
  }
}
