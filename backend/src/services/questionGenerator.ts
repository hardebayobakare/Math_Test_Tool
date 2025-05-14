import { PrismaClient } from '@prisma/client';
import { randomInt } from 'crypto';

const prisma = new PrismaClient();

interface Coordinate {
  x: number;
  y: number;
}

/**
 * Generates 5 random coordinates within specified ranges
 * @returns Array of 5 coordinates
 */
export function generateDataPoints(): Coordinate[] {
  const dataPoints: Coordinate[] = [];
  
  const usedX = new Set<number>();
  
  while (dataPoints.length < 5) {
    const x = randomInt(-10, 11);
    
    if (!usedX.has(x)) {
      usedX.add(x);
      const y = randomInt(-10, 11);
      dataPoints.push({ x, y });
    }
  }
  
  return dataPoints.sort((a, b) => a.x - b.x);
}

/**
 * Calculates the line of best fit (y = mx + b) using least squares method
 * @param coordinates Array of coordinates
 * @returns Object containing slope (m) and y-intercept (b)
 */
export function calculateLineOfBestFit(coordinates: Coordinate[]): { slope: number; yIntercept: number } {
  const n = coordinates.length;
  
  const meanX = coordinates.reduce((sum, coord) => sum + coord.x, 0) / n;
  const meanY = coordinates.reduce((sum, coord) => sum + coord.y, 0) / n;
  
  const numerator = coordinates.reduce((sum, coord) => 
    sum + (coord.x - meanX) * (coord.y - meanY), 0);
  const denominator = coordinates.reduce((sum, coord) => 
    sum + Math.pow(coord.x - meanX, 2), 0);
  
  const slope = numerator / denominator;
  
  const yIntercept = meanY - slope * meanX;
  
  return {
    slope: Number(slope.toFixed(2)),
    yIntercept: Number(yIntercept.toFixed(2))
  };
}

/**
 * Creates a new question in the database with random coordinates
 * @returns Created question object
 */
export async function createLineOfBestFitQuestion() {
  const coordinates = generateDataPoints();
  const { slope, yIntercept } = calculateLineOfBestFit(coordinates);
  
  const equation = `y=${slope}x${yIntercept >= 0 ? '+' : ''}${yIntercept}`;
  
  const question = await prisma.$transaction(async (tx) => {
    const newQuestion = await tx.question.create({
      data: {
        equation,
        dataPoints: {
          create: coordinates.map(coord => ({
            x: coord.x,
            y: coord.y
          }))
        }
      },
      include: {
        dataPoints: true
      }
    });
    
    return newQuestion;
  });
  
  return question;
} 