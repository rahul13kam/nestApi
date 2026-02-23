import { Controller, Get, Post, Body ,Param,Delete} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateStudentDto } from './students/dto/create-student.dto';

@Controller('students')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
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

@Delete(':id')
deleteStudent(@Param('id') id: number): any {
  return this.appService.deleteStudent(id);
}
}
