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
    private lessonService: LessonService,
  ) {}

  async getStudent(id: number): Promise<Student> {
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
    });
    return await student.save();
  }

  async getLessonsForStudent(studentId): Promise<Lesson[]> {
    return await this.lessonService.getLessonsForStudent(studentId);
  }

  async getStudentsForLesson(lessonId: number): Promise<Student[]> {
    const query = this.studentRepository.createQueryBuilder('student');
    query.leftJoinAndSelect('student.lessons', 'lesson');
    query.where('lesson.id = :id', { id: lessonId });
    query.select('student');
    const result = await query.getMany();
    return result;
  }
}
