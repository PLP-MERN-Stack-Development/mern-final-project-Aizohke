import express from 'express';
import { body } from 'express-validator';
import {
  chatWithAI,
  getAIConversationHistory,
  submitAIFeedback
} from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.js';
import { aiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(protect);

router.post('/chat',
  aiLimiter,
  [
    body('message').notEmpty().withMessage('Message is required'),
    body('conversationHistory').optional().isArray()
  ],
  validate,
  chatWithAI
);

router.get('/history', getAIConversationHistory);

router.post('/feedback',
  [
    body('messageId').notEmpty().withMessage('Message ID is required'),
    body('helpful').isBoolean().withMessage('Helpful must be boolean')
  ],
  validate,
  submitAIFeedback
);

export default router;
