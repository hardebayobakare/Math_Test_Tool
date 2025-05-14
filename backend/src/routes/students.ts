import express from 'express';
import { createStudent } from '../controllers/studentController';
import { validateCreateStudent } from '../validations/studentValidation';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';

const router = express.Router();

router.post('/', validateCreateStudent, handleValidationErrors, createStudent);

export default router; 