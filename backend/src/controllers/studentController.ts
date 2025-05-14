import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;

    const student = await prisma.student.create({
      data: { name },
    });

    res.status(201).json(student);
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'A student with this name already exists' });
      return;
    }

    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
