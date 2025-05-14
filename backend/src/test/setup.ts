import { PrismaClient } from '@prisma/client';
import { beforeEach, afterAll } from '@jest/globals';

// Ensure we're in test environment
if (process.env.NODE_ENV !== 'test') {
  throw new Error('Tests must be run in test environment! Set NODE_ENV=test');
}

const prisma = new PrismaClient();

// Helper function to clean the database
export async function cleanDatabase() {
  // Delete in correct order based on foreign key relationships
  await prisma.attempt.deleteMany();
  await prisma.dataPoint.deleteMany();
  await prisma.question.deleteMany();
  await prisma.student.deleteMany();
}

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await cleanDatabase();
  await prisma.$disconnect();
}); 