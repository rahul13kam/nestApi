import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateStudentDto } from './students/dto/create-student.dto';

@Controller('students')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  
  getStudents(): any {
    return this.appService.getStudents();
  }
 @Post('bulk')
createManyStudents(@Body() students: CreateStudentDto[]): any {
  return this.appService.createManyStudents(students);
}
}
