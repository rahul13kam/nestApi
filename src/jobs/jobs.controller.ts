import { Controller, Get, Post, Body, Patch, Param, Delete , Put} from '@nestjs/common';
import { CreateJobDto} from  './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsService } from './jobs.service';


@Controller('jobs')
export class JobsController {
   constructor(private readonly jobsService: JobsService) {}
   
      // POST /jobs (Recruiter)
    @Post()
    create(@Body() createJobDto: CreateJobDto) {
        return this.jobsService.create(createJobDto);
    }

        // GET /jobs (Anyone)
    @Get()
    findAll() {
        return this.jobsService.findAll();
    }

        // GET /jobs/:id (Anyone)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobsService.findOne(+id);
    }

      // PUT /jobs/:id (Recruiter)
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateJobDto: UpdateJobDto,
    ) {
        return this.jobsService.update(+id, updateJobDto);
    }

        // DELETE /jobs/:id (Recruiter)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.jobsService.remove(+id);
    }
}
