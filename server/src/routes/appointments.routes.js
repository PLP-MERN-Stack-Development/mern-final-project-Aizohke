import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.js';
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  cancelAppointment
} from '../controllers/appointments.controller.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllAppointments);

router.post('/',
  [
    body('childId').notEmpty().withMessage('Child ID is required'),
    body('clinicId').notEmpty().withMessage('Clinic ID is required'),
    body('appointmentDate').isISO8601().withMessage('Valid date is required'),
    body('appointmentTime').notEmpty().withMessage('Time is required')
  ],
  validate,
  createAppointment
);

router.put('/:id', updateAppointment);

router.delete('/:id', cancelAppointment);

export default router;
