import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { faker } from '@faker-js/faker';

const adapter = new PrismaMariaDb({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'advisory_monitoring', 
});

const prisma = new PrismaClient({adapter})

async function main() {
    const programNames = [
        'BS Information Technology',
        'BS Computer Science',
        'BS Information Systems',
    ];
    const programs = await Promise.all(
        programNames.map((name)=>prisma.program.create ({data: {name}})),
    );

    const studentsData = Array.from({length: 10}).map(()=>({
        name: faker.person.fullName(),
        programId: faker.helpers.arrayElement(programs).id
    }));


    await prisma.student.createMany({data: studentsData});
    console.log('Seeded 3 programs and 10 students');

    const students = await prisma.student.findMany();

    const remarksData = students.flatMap((student) =>
        Array.from({ length: 3 }).map(() => ({
            studentId: student.id,
            content: faker.helpers.arrayElement([
            'Advised to enroll in NSTP.',
            ]),
            personInCharge: 'Prof. Ana Reyes',
        })),
    );

    await prisma.remark.createMany({
        data: remarksData,
    });
}   

main()
    .catch((e)=>console.error(e))
    .finally(async()=> await prisma.$disconnect());