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
    @Inject(forwardRef(() => StudentService))
    private studentService: StudentService,
  ) {}

  async allLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async getLesson(id: ObjectID): Promise<Lesson> {
    return await this.lessonRepository.findOne(id);
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      name,
      startDate,
      endDate,
      students,
    });
    const result = await lesson.save(); // Ariel did: this.lessonRepository.save(lesson)
    students.forEach(async (studentId) => {
      const student = await this.studentService.getStudent(studentId);
      const lessonId = result.id;
      student.lessons = [...student.lessons, lessonId];
      await student.save();
    });
    return result;
  }

  async getStudentsForLesson(lessonId: ObjectID): Promise<Student[]> {
    return await this.studentService.getStudentsForLesson(lessonId);
  }

  async getLessonsForStudent(studentId: ObjectID): Promise<Lesson[]> {
    const student = await this.studentService.getStudent(studentId);
    const lessons = student.lessons.map(
      async (lessonId) => await this.getLesson(lessonId),
    );
    return await Promise.all(lessons);
  }

  async assignCourseToLesson(
    assignStudentLessonInput: AssignStudentLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentId } = assignStudentLessonInput;

    const lesson = await this.lessonRepository.findOne(lessonId);
    lesson.students = [...lesson.students, studentId];

    const student = await this.studentService.getStudent(studentId);
    student.lessons = [...student.lessons, lessonId];

    await student.save();
    return await lesson.save();
  }
}
