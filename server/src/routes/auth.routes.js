import express from 'express';
import { body } from 'express-validator';
import {
  syncUser,
  getCurrentUser,
  updateUserProfile,
  deleteAccount
} from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// This is the new endpoint our frontend will call ONCE after login
// to create/update the user in our local database.
router.post('/sync',
  [
    body('clerkId').notEmpty(),
    body('email').isEmail(),
  ],
  validate,
  syncUser
);

router.get('/me', protect, getCurrentUser);

router.put('/profile',
  protect,
  [
    body('firstName').optional().notEmpty(),
    body('lastName').optional().notEmpty(),
    body('email').optional().isEmail()
  ],
  validate,
  updateUserProfile
);

router.delete('/account', protect, deleteAccount);

export default router;
