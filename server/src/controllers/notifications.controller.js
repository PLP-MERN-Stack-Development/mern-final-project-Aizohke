import Notification from '../models/Notification.js';
import logger from '../utils/logger.js';

export const getAllNotifications = async (req, res) => {
  try {
    const { unread } = req.query;
    
    const filter = { userId: req.user._id };
    if (unread === 'true') filter.isRead = false;

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      userId: req.user._id,
      isRead: false
    });

    res.status(200).json({
      status: 'success',
      results: notifications.length,
      unreadCount,
      data: { notifications }
    });

  } catch (error) {
    logger.error('Get Notifications Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        status: 'error',
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { notification }
    });

  } catch (error) {
    logger.error('Mark Notification Read Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.status(200).json({
      status: 'success',
      message: 'All notifications marked as read'
    });

  } catch (error) {
    logger.error('Mark All Read Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!notification) {
      return res.status(404).json({
        status: 'error',
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Notification deleted'
    });

  } catch (error) {
    logger.error('Delete Notification Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};