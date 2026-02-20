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
    @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto): any {
    return this.appService.createStudent(createStudentDto);
  }
}
