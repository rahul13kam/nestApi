
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
     constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  create(createJobDto: CreateJobDto) {
    const job = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(job);
  }
    findAll() {
    return this.jobRepository.find();
  }
    findOne(id: number) {
    return this.jobRepository.findOneBy({ id });
  }
    async update(id: number, updateJobDto: UpdateJobDto) {
    const job = await this.findOne(id);
    if (!job) throw new NotFoundException('Job not found');

    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }
    async remove(id: number) {
    const job = await this.findOne(id);
    if (!job) throw new NotFoundException('Job not found');

    return this.jobRepository.remove(job);
  }
}
