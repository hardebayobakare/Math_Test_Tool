import { Router } from 'express';
import { getQuestion, submitAttempt } from '../controllers/questionController';
import { validateSubmitAttempt } from '../validations/questionValidation';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';

const router = Router();

router.get('/', getQuestion);
router.post('/check', validateSubmitAttempt, handleValidationErrors, submitAttempt);

export default router;
