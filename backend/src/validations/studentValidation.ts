import { body } from 'express-validator';

export const validateCreateStudent = [
    body('name')
    .isString().withMessage('Name must be a string')
    .trim()
    .notEmpty().withMessage('Name is required')
];
