import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  getAllNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification
} from '../controllers/notifications.controller.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllNotifications);

router.put('/read-all', markAllNotificationsAsRead);

router.put('/:id/read', markNotificationAsRead);

router.delete('/:id', deleteNotification);

export default router;
