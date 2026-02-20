import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './students/entities/student.entity';
import { CreateStudentDto } from './students/dto/create-student.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

createManyStudents(students: CreateStudentDto[]): Promise<Student[]> {
  const newStudents = this.studentRepository.create(students);
  return this.studentRepository.save(newStudents);
}
}