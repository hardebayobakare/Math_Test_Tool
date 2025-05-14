import { Router } from 'express';
import { getQuestion, checkAnswer } from '../controllers/questionController';

const router = Router();

router.get('/', getQuestion);
router.post('/check', checkAnswer);

export default router;
