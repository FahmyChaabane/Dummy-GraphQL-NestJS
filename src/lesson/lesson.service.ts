import { AssignStudentLessonInput } from './assign-course-lesson.input';
import { Student } from './../student/student.entity';
import { StudentService } from './../student/student.service';
import { CreateLessonInput } from './lesson.input';
import { Lesson } from './lesson.entity';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    private studentService: StudentService,
  ) {}

  async allLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async getLesson(id: number): Promise<Lesson> {
    return await this.lessonRepository.findOne(id);
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, studentIds } = createLessonInput;
    const students = studentIds.map(
      async (id) => await this.studentService.getStudent(id),
    );
    const lesson = this.lessonRepository.create({
      name,
      startDate,
      endDate,
      students: await Promise.all(students),
    });
    return await lesson.save(); // Ariel did: this.lessonRepository.save(lesson)
  }

  async getStudentsForLesson(lessonId): Promise<Student[]> {
    return await this.studentService.getStudentsForLesson(lessonId);
  }

  async getLessonsForStudent(studentId: number): Promise<Lesson[]> {
    const query = this.lessonRepository.createQueryBuilder('lesson');
    query.leftJoinAndSelect('lesson.students', 'student');
    query.where('student.id = :id', { id: studentId });
    query.select('lesson');
    const result = await query.getMany();
    return result;
  }

  async assignCourseToLesson(
    assignStudentLessonInput: AssignStudentLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentId } = assignStudentLessonInput;
    const lesson = await this.lessonRepository.findOne(lessonId, {
      relations: ['students'],
    });
    const student = await this.studentService.getStudent(studentId);

    lesson.students = [...lesson.students, student];
    return await lesson.save();
  }
}
