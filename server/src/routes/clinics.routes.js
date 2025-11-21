import express from 'express';
import { body } from 'express-validator';
import {
  getAllClinics,
  getNearbyClinics,
  getClinicById,
  addClinicReview
} from '../controllers/clinics.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllClinics);
router.get('/nearby', getNearbyClinics);
router.get('/:id', getClinicById);

router.post('/:id/review',
  protect,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().trim()
  ],
  validate,
  addClinicReview
);

export default router;
