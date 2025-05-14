import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createLineOfBestFitQuestion } from '../services/questionGenerator';

const prisma = new PrismaClient();

/**
 * Controller to get or generate a new line of best fit question
 */
export const getQuestion = async (req: Request, res: Response) => {
  try {
    const question = await createLineOfBestFitQuestion();
    
    res.json({
      id: question.id,
      dataPoints: question.dataPoints,
      equation: question.equation
    });
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).json({ error: 'Failed to generate question' });
  }
};

/**
 * Controller to submit an attempt for a question
 */
export const submitAttempt = async (req: Request, res: Response): Promise<void> => {
  try {
    const { questionId, studentId, answer } = req.body;

    const question = await prisma.question.findUnique({
      where: { id: questionId }
    });

    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }

    const previousAttempts = await prisma.attempt.count({
      where: {
        questionId,
        studentId
      }
    });

    const normalizedAnswer = answer.replace(/\s+/g, '').toLowerCase();
    const normalizedCorrect = question.equation.replace(/\s+/g, '').toLowerCase();
    const isCorrect = normalizedAnswer === normalizedCorrect;

    const attempt = await prisma.attempt.create({
      data: {
        questionId,
        studentId,
        answer,
        isCorrect,
        attemptNumber: previousAttempts + 1
      }
    });

    res.status(200).json({
      isCorrect,
      attemptNumber: attempt.attemptNumber,
    });

  } catch (error) {
    console.error('Error submitting attempt:', error);
    res.status(500).json({ error: 'Failed to submit attempt' });
  }
};


