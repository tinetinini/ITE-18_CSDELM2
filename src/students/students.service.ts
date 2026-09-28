import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../generated/prisma/prisma.service';

@Injectable()
export class StudentsService {
    private readonly logger = new Logger(StudentsService.name);
    constructor (private prisma: PrismaService){}
    async getStudents(){
        const students = await this.prisma.student.findMany({
            include: {program: true},
        })
        this.logger.log(`Retrieved ${students.length} students from the database.`);
        return students;  
    }

    async getRemarks(studentId: number) {
        const student = await this.prisma.student.findUnique({
            where: {
            id: studentId,
            },
        });

        if (!student) {
            throw new NotFoundException(
                `Student record does not exist.`,
            );
        }

        const remarks = await this.prisma.remark.findMany({
            where: {
                studentId: studentId,
            },
            orderBy: {
                createdAt: 'asc',
            },
            });

            if (remarks.length === 0) {
            return {
                message: 'Student has no remarks.',
                data: [],
            };
        }

        return remarks;
    }

    async getLatestRemark(studentId: number) {
        const student = await this.prisma.student.findUnique({
            where: {
            id: studentId,
            },
        });

        if (!student) {
            throw new NotFoundException(
                `Student with Id ${studentId} not found`,
            );
        }

        return this.prisma.remark.findFirst({
            where: {
            studentId: studentId,
            },
            orderBy: {
            createdAt: 'desc',
            },
        });
    }
}


