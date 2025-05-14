import { body } from 'express-validator';

export const validateSubmitAttempt = [
    body('answer')
    .isString().withMessage('Answer must be a string')
    .trim()
    .notEmpty().withMessage('Answer is required'),
    body('questionId')
    .isInt().withMessage('Question ID must be an integer')
    .notEmpty().withMessage('Question ID is required'),
    body('studentId')
    .isInt().withMessage('Student ID must be an integer')
    .notEmpty().withMessage('Student ID is required')
];

