import express from 'express';
import { body } from 'express-validator';
import {
  getAllVaccinations,
  getUpcomingVaccinations,
  createVaccination,
  updateVaccination,
  deleteVaccination,
  getVaccinationSchedule
} from '../controllers/vaccinations.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllVaccinations);
router.get('/upcoming', getUpcomingVaccinations);
router.get('/schedule', getVaccinationSchedule);

router.post('/',
  [
    body('childId').notEmpty().withMessage('Child ID is required'),
    body('vaccineName').notEmpty().withMessage('Vaccine name is required'),
    body('vaccineDate').isISO8601().withMessage('Valid vaccine date is required'),
    body('status').optional().isIn(['scheduled', 'completed', 'missed', 'cancelled'])
  ],
  validate,
  createVaccination
);

router.route('/:id')
  .put(updateVaccination)
  .delete(deleteVaccination);

export default router;
