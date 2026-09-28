import { Controller, Get, Param } from '@nestjs/common';
import { StudentsService } from './students.service'; 

@Controller('students')
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService,
    ){}

    @Get()
    getStudent(){
        return this.studentsService.getStudents();
    }

    @Get(':id/remarks/latest')
    getLatestRemark(@Param('id') id: string) {
        return this.studentsService.getLatestRemark(Number(id));
    }

    @Get(':id/remarks')
    getRemarks(@Param('id') id: string) {
        return this.studentsService.getRemarks(Number(id));
    }
}
