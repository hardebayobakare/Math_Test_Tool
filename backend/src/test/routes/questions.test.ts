import request from 'supertest';
import { app } from '../../index';
import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { cleanDatabase } from '../setup';

const prisma = new PrismaClient();

describe('Questions API', () => {
  beforeAll(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  describe('GET /api/questions', () => {
    it('should return a new question with data points', async () => {
      const response = await request(app).get('/api/questions');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('dataPoints');
      expect(response.body).toHaveProperty('equation');
      expect(Array.isArray(response.body.dataPoints)).toBe(true);
      expect(response.body.dataPoints.length).toBe(5); // Each question should have 5 data points
    });

    it('should return data points with correct structure', async () => {
      const response = await request(app).get('/api/questions');
      const dataPoints = response.body.dataPoints;
      
      expect(Array.isArray(dataPoints)).toBe(true);
      expect(dataPoints.length).toBeGreaterThan(0);
      
      const dataPoint = dataPoints[0];
      expect(dataPoint).toHaveProperty('x');
      expect(dataPoint).toHaveProperty('y');
      expect(typeof dataPoint.x).toBe('number');
      expect(typeof dataPoint.y).toBe('number');
    });
  });

  describe('POST /api/questions/check', () => {
    let questionId: number;
    let correctEquation: string;

    beforeEach(async () => {
      // Create a test question before each test
      const response = await request(app).get('/api/questions');
      questionId = response.body.id;
      correctEquation = response.body.equation;
    });

    it('should return 404 if question not found', async () => {
      const response = await request(app)
        .post('/api/questions/check')
        .send({
          questionId: 99999, // Non-existent question ID
          student: 'Test Student',
          answer: 'y=1x+1'
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Question not found');
    });

    it('should validate a correct answer', async () => {
      const response = await request(app)
        .post('/api/questions/check')
        .send({
          questionId,
          student: 'Test Student',
          answer: correctEquation
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('isCorrect', true);
      expect(response.body).toHaveProperty('attemptNumber');
    });

    it('should validate an incorrect answer', async () => {
      const response = await request(app)
        .post('/api/questions/check')
        .send({
          questionId,
          student: 'Test Student',
          answer: 'y=999x+999' // Wrong answer
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('isCorrect', false);
      expect(response.body).toHaveProperty('attemptNumber');
    });

    it('should return 400 if required fields are missing', async () => {
      const response1 = await request(app)
        .post('/api/questions/check')
        .send({
          questionId,
          answer: 'y=1x+1'
        });
      expect(response1.status).toBe(400);

      // Missing answer field
      const response2 = await request(app)
        .post('/api/questions/check')
        .send({
          questionId,
          student: 'Test Student'
        });
      expect(response2.status).toBe(400);

      // Missing questionId field
      const response3 = await request(app)
        .post('/api/questions/check')
        .send({
          student: 'Test Student',
          answer: 'y=1x+1'
        });
      expect(response3.status).toBe(400);
    });

    it('should create a new student if they don\'t exist', async () => {
      const studentName = 'New Test Student';
      const response = await request(app)
        .post('/api/questions/check')
        .send({
          questionId,
          student: studentName,
          answer: correctEquation
        });

      expect(response.status).toBe(200);
      
      // Verify student was created
      const student = await prisma.student.findUnique({
        where: { name: studentName }
      });
      expect(student).not.toBeNull();
      expect(student?.name).toBe(studentName);
    });

    it('should track attempt numbers correctly', async () => {
      const studentName = 'Attempt Test Student';
      
      // Make three attempts
      for (let i = 1; i <= 3; i++) {
        const response = await request(app)
          .post('/api/questions/check')
          .send({
            questionId,
            student: studentName,
            answer: 'y=999x+999' // Wrong answer
          });

        expect(response.status).toBe(200);
        expect(response.body.attemptNumber).toBe(i);
      }
    });
  });
}); 