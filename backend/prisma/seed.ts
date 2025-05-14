/// <reference types="node" />
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const questions = [
    {
      equation: 'y=1.5x+0.3',
      dataPoints: [
        { x: 2, y: 3.3 },
        { x: 3, y: 4.8 },
        { x: 5, y: 7.8 },
        { x: 7, y: 10.8 },
        { x: 9, y: 13.8 }
      ]
    },
    {
      equation: 'y=2x+1',
      dataPoints: [
        { x: 1, y: 3 },
        { x: 2, y: 5 },
        { x: 3, y: 7 },
        { x: 4, y: 9 },
        { x: 5, y: 11 }
      ]
    },
    {
      equation: 'y=0.5x+2',
      dataPoints: [
        { x: 2, y: 3 },
        { x: 4, y: 4 },
        { x: 6, y: 5 },
        { x: 8, y: 6 },
        { x: 10, y: 7 }
      ]
    },
    {
      equation: 'y=3x-1',
      dataPoints: [
        { x: 1, y: 2 },
        { x: 2, y: 5 },
        { x: 3, y: 8 },
        { x: 4, y: 11 },
        { x: 5, y: 14 }
      ]
    },
    {
      equation: 'y=x+1',
      dataPoints: [
        { x: 0, y: 1 },
        { x: 2, y: 3 },
        { x: 4, y: 5 },
        { x: 6, y: 7 },
        { x: 8, y: 9 }
      ]
    }
  ];

  console.log('Starting to seed database...');

  for (const question of questions) {
    const createdQuestion = await prisma.question.create({
      data: {
        equation: question.equation,
        dataPoints: {
          create: question.dataPoints
        }
      }
    });
    console.log(`Created question with ID: ${createdQuestion.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 