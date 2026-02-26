import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './students/entities/student.entity';
import { AuthModule } from './auth/auth.module';
import { User} from './users/entities/user.entity'
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'nestuser',
  password: process.env.DB_PASS || 'rahul@07',
  database: process.env.DB_NAME || 'nestjs_practice',
  entities: [Student,User, Job],
  synchronize: true,
  connectorPackage: 'mysql2',
  }),
 TypeOrmModule.forFeature([Student, User]),
  AuthModule,
  JobsModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
