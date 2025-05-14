import { body } from 'express-validator';

export const validateSubmitAttempt = [
    body('answer')
    .isString().withMessage('Answer must be a string')
    .trim()
    .notEmpty().withMessage('Answer is required'),
    body('questionId')
    .isInt().withMessage('Question ID must be an integer')
    .notEmpty().withMessage('Question ID is required'),
    body('student')
    .isString().withMessage('Student ID must be a string')
    .notEmpty().withMessage('Student ID is required')
];

