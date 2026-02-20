import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './students/dto/create-student.dto';

@Injectable()
export class AppService {

  private students = [
    { id: 1, name: 'Rahul', age: 22, course: 'B.Tech' },
    { id: 2, name: 'Amit', age: 23, course: 'BCA' },
    { id: 3, name: 'Priya', age: 21, course: 'MCA' },
    { id: 4, name: 'Neha', age: 24, course: 'MBA' },
    { id: 5, name: 'Rohit', age: 22, course: 'BBA' },
    { id: 6, name: 'Sanya', age: 23, course: 'B.Sc' },
    { id: 7, name: 'Karan', age: 21, course: 'M.Sc' },
    { id: 8, name: 'Anjali', age: 24, course: 'PhD' },
    { id: 9, name: 'Vikram', age: 22, course: 'B.Tech' },
    { id: 10, name: 'Sneha', age: 23, course: 'BCA' },
    { id: 11, name: 'Arjun', age: 21, course: 'MCA' },
    { id: 12, name: 'Pooja', age: 24, course: 'MBA' },
    { id: 13, name: 'Ravi', age: 22, course: 'BBA' },
    { id: 14, name: 'Sonal', age: 23, course: 'B.Sc' },
    { id: 15, name: 'Manish', age: 21, course: 'M.Sc' },
    { id: 16, name: 'Divya', age: 24, course: 'PhD' },
    { id: 17, name: 'Aakash', age: 22, course: 'B.Tech' },
    { id: 18, name: 'Riya', age: 23, course: 'BCA' },
    { id: 19, name: 'Suresh', age: 21, course: 'MCA' },
    { id: 20, name: 'Anita', age: 24, course: 'MBA' },
  ];
  
getStudents(): any {
  return [
         { id: 1, name: 'Rahul', age: 22, course: 'B.Tech' },
      { id: 2, name: 'Amit', age: 23, course: 'BCA' },
      { id: 3, name: 'Priya', age: 21, course: 'MCA' },
      { id: 4, name: 'Neha', age: 24, course: 'MBA' },
      { id: 5, name: 'Rohit', age: 22, course: 'BBA' },
      { id: 6, name: 'Sanya', age: 23, course: 'B.Sc' },
      { id: 7, name: 'Karan', age: 21, course: 'M.Sc' },
      { id: 8, name: 'Anjali', age: 24, course: 'PhD' },
      { id: 9, name: 'Vikram', age: 22, course: 'B.Tech' },
      { id: 10, name: 'Sneha', age: 23, course: 'BCA' },
      { id: 11, name: 'Arjun', age: 21, course: 'MCA' },
      { id: 12, name: 'Pooja', age: 24, course: 'MBA' },
      { id: 13, name: 'Ravi', age: 22, course: 'BBA' },
      { id: 14, name: 'Sonal', age: 23, course: 'B.Sc' },
      { id: 15, name: 'Manish', age: 21, course: 'M.Sc' },
      { id: 16, name: 'Divya', age: 24, course: 'PhD' },
      { id: 17, name: 'Aakash', age: 22, course: 'B.Tech' },
      { id: 18, name: 'Riya', age: 23, course: 'BCA' },
      { id: 19, name: 'Suresh', age: 21, course: 'MCA' },
      { id: 20, name: 'Anita', age: 24, course: 'MBA' },
  ];
}

  createStudent(createStudentDto: CreateStudentDto): any {
    const newStudent = {
      id: this.students.length + 1, // Simple ID increment logic
      ...createStudentDto,
    };
    this.students.push(newStudent);
    return newStudent;
  }
}
