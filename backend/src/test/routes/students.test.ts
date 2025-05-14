import request from 'supertest';
import { app } from '../../index';
import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals';

const prisma = new PrismaClient();

describe('Students API', () => {
  beforeAll(async () => {
    // Clear the database before tests
    await prisma.student.deleteMany();
    await prisma.attempt.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clear data before each test
    await prisma.student.deleteMany();
    await prisma.attempt.deleteMany();
  });

  describe('POST /api/students', () => {
    it('should create a new student with valid data', async () => {
      const response = await request(app)
        .post('/api/students')
        .send({ name: 'John Doe' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('John Doe');

      // Verify student was created in database
      const student = await prisma.student.findUnique({
        where: { id: response.body.id }
      });
      expect(student).toBeTruthy();
      expect(student?.name).toBe('John Doe');
    });

    it('should return 409 if student name already exists', async () => {
      // Create first student
      await request(app)
        .post('/api/students')
        .send({ name: 'John Doe' });

      // Try to create second student with same name
      const response = await request(app)
        .post('/api/students')
        .send({ name: 'John Doe' });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/api/students')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });
}); 