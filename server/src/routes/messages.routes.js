import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.js';
import {
  getConversation,
  getAllConversations,
  sendMessage,
  markMessageAsRead
} from '../controllers/messages.controller.js';

const router = express.Router();

router.use(protect);

router.get('/conversation/:userId', getConversation);

router.get('/conversations', getAllConversations);

router.post('/',
  [
    body('receiverId').notEmpty().withMessage('Receiver ID is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  validate,
  sendMessage
);

router.put('/:id/read', markMessageAsRead);

export default router;
