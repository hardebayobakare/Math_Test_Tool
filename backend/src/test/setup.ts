import { PrismaClient } from '@prisma/client';
import { beforeEach, afterAll } from '@jest/globals';
import { join } from 'path';

// Ensure we're in test environment
if (process.env.NODE_ENV !== 'test') {
  throw new Error('Tests must be run in test environment! Set NODE_ENV=test');
}

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.attempt.deleteMany();
  await prisma.dataPoint.deleteMany();
  await prisma.question.deleteMany();
  await prisma.student.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
}); 