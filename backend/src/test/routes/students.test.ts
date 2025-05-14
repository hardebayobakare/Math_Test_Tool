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

  // describe('POST /api/students/submit', () => {
  //   it('should submit a student answer', async () => {
  //     // First create a question
  //     const questionResponse = await request(app)
  //       .post('/api/questions')
  //       .expect(201);

  //     const questionId = questionResponse.body.id;

  //     const submissionData = {
  //       studentName: 'Test Student',
  //       questionId: questionId,
  //       answer: 'y=2x+1'
  //     };

  //     const response = await request(app)
  //       .post('/api/students/submit')
  //       .send(submissionData)
  //       .expect(201);

  //     expect(response.body).toHaveProperty('id');
  //     expect(response.body).toHaveProperty('studentName', submissionData.studentName);
  //     expect(response.body).toHaveProperty('questionId', questionId);
  //     expect(response.body).toHaveProperty('answer', submissionData.answer);
  //     expect(response.body).toHaveProperty('createdAt');
  //   });

  //   it('should return 400 for invalid submission data', async () => {
  //     const invalidData = {
  //       studentName: '', // Empty name
  //       questionId: 999, // Non-existent question
  //       answer: ''      // Empty answer
  //     };

  //     const response = await request(app)
  //       .post('/api/students/submit')
  //       .send(invalidData)
  //       .expect(400);

  //     expect(response.body).toHaveProperty('error');
  //   });
  // });

  // describe('GET /api/students/attempts', () => {
  //   it('should get all attempts', async () => {
  //     // Create a question and submit some answers
  //     const questionResponse = await request(app)
  //       .post('/api/questions')
  //       .expect(201);

  //     const questionId = questionResponse.body.id;

  //     const submission1 = {
  //       studentName: 'Student 1',
  //       questionId: questionId,
  //       answer: 'y=2x+1'
  //     };

  //     const submission2 = {
  //       studentName: 'Student 2',
  //       questionId: questionId,
  //       answer: 'y=3x+2'
  //     };

  //     await request(app)
  //       .post('/api/students/submit')
  //       .send(submission1);

  //     await request(app)
  //       .post('/api/students/submit')
  //       .send(submission2);

  //     const response = await request(app)
  //       .get('/api/students/attempts')
  //       .expect(200);

  //     expect(Array.isArray(response.body)).toBe(true);
  //     expect(response.body).toHaveLength(2);

  //     response.body.forEach((attempt: any) => {
  //       expect(attempt).toHaveProperty('id');
  //       expect(attempt).toHaveProperty('studentId');
  //       expect(attempt).toHaveProperty('questionId');
  //       expect(attempt).toHaveProperty('answer');
  //       expect(attempt).toHaveProperty('isCorrect');
  //       expect(attempt).toHaveProperty('attemptNumber');
  //       expect(attempt).toHaveProperty('createdAt');
  //     });
  //   });

  //   it('should return empty array when no attempts exist', async () => {
  //     const response = await request(app)
  //       .get('/api/students/attempts')
  //       .expect(200);

  //     expect(Array.isArray(response.body)).toBe(true);
  //     expect(response.body).toHaveLength(0);
  //   });
  // });
}); 