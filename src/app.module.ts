import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './students/entities/student.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'nestuser',
  password: process.env.DB_PASS || 'rahul@07',
  database: process.env.DB_NAME || 'nestjs_practice',
  entities: [Student],
  synchronize: true,
  ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : false,
  extra: process.env.DB_HOST ? { ssl: { rejectUnauthorized: false } } : {},
  }),
  TypeOrmModule.forFeature([Student])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
