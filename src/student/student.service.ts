import { LessonService } from './../lesson/lesson.service';
import { Lesson } from './../lesson/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import { Student } from './student.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @Inject(forwardRef(() => LessonService))
    private lessonService: LessonService,
  ) {}

  async getStudent(id: ObjectID): Promise<Student> {
    return await this.studentRepository.findOne(id);
  }

  async allStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      firstName,
      lastName,
      lessons: [],
    });
    return await student.save();
  }

  async getLessonsForStudent(studentId: ObjectID): Promise<Lesson[]> {
    return await this.lessonService.getLessonsForStudent(studentId);
  }

  async getStudentsForLesson(lessonId: ObjectID): Promise<Student[]> {
    const lesson = await this.lessonService.getLesson(lessonId);
    const students = lesson.students.map(
      async (studentId) => await this.getStudent(studentId),
    );

    return await Promise.all(students);
  }
}
