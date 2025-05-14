import { Request, Response } from 'express';
import pool from '../db';

const getQuestion = async (req: Request, res: Response) => {
  const dataPoints = [
    { x: 2, y: 4 },
    { x: 3, y: 5 },
    { x: 5, y: 7 },
    { x: 7, y: 10 },
    { x: 9, y: 15 },
  ];
  const correctAnswer = 'y=1.5x+0.3';
  res.json(dataPoints);
};

const checkAnswer = async (req: Request, res: Response) => {
  const { answer, coordinates } = req.body;
  const correctAnswer = 'y=1.5x+0.3';
  const isCorrect = answer.trim() === correctAnswer;

  res.json({ correct: isCorrect });
};

export { getQuestion, checkAnswer };
