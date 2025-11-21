
import express from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import {
  getAllChildren,
  getChildById,
  createChild,
  updateChild,
  deleteChild
} from '../controllers/children.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // You might want to use multer-storage-cloudinary

router.use(protect);

router.route('/')
  .get(getAllChildren)
  .post(
    upload.single('photo'),
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
      body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Valid gender is required')
    ],
    validate,
    createChild
  );

router.route('/:id')
  .get(getChildById)
  .put(upload.single('photo'), updateChild)
  .delete(deleteChild);

export default router;
