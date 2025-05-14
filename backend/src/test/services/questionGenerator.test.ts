import { PrismaClient, Question } from '@prisma/client';
import { createLineOfBestFitQuestion, generateDataPoints, calculateLineOfBestFit } from '../../services/questionGenerator';

const prisma = new PrismaClient();

describe('Question Generator Service', () => {
  beforeAll(async () => {
    await prisma.question.deleteMany();
    await prisma.dataPoint.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.question.deleteMany();
    await prisma.dataPoint.deleteMany();
  });

  describe('generateDataPoints', () => {
    it('should generate 5 unique coordinates', () => {
      const coordinates = generateDataPoints();
      
      expect(coordinates).toHaveLength(5);
      
      // Check if coordinates are unique
      const uniqueXValues = new Set(coordinates.map(c => c.x));
      expect(uniqueXValues.size).toBe(5);
      
      // Check if coordinates are within range
      coordinates.forEach(coord => {
        expect(coord.x).toBeGreaterThanOrEqual(-10);
        expect(coord.x).toBeLessThanOrEqual(10);
        expect(coord.y).toBeGreaterThanOrEqual(-10);
        expect(coord.y).toBeLessThanOrEqual(10);
      });
      
      // Check if coordinates are sorted by x
      const sortedX = [...coordinates].sort((a, b) => a.x - b.x);
      expect(coordinates).toEqual(sortedX);
    });
  });

  describe('calculateLineOfBestFit', () => {
    it('should calculate correct line of best fit', () => {
      const coordinates = [
        { x: 2, y: 4 },
        { x: 3, y: 5 },
        { x: 5, y: 7 },
        { x: 7, y: 10 },
        { x: 9, y: 15 }
      ];
      
      const result = calculateLineOfBestFit(coordinates);
      
      expect(result).toHaveProperty('slope');
      expect(result).toHaveProperty('yIntercept');
      expect(result.slope).toBe(1.5);
      expect(result.yIntercept).toBe(0.3);
    });
  });

  describe('createLineOfBestFitQuestion', () => {
    it('should create a question with data points', async () => {
      const question = await createLineOfBestFitQuestion();
      
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('equation');
      
      // Verify data points were created
      const dataPoints = await prisma.dataPoint.findMany({
        where: { questionId: question.id }
      });
      
      expect(dataPoints).toHaveLength(5);
      dataPoints.forEach(point => {
        expect(point).toHaveProperty('x');
        expect(point).toHaveProperty('y');
        expect(point.questionId).toBe(question.id);
      });
    });
  });
}); 