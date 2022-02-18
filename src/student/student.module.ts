import { Student } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
import { LessonModule } from './../lesson/lesson.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => LessonModule),
  ],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
