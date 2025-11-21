import Message from '../models/Message.js';
import logger from '../utils/logger.js';

export const getConversation = async (req, res) => {
  try {
    const conversationId = Message.generateConversationId(
      req.user._id,
      req.params.userId
    );

    const messages = await Message.find({
      conversationId,
      isDeleted: false
    })
      .populate('senderId', 'firstName lastName profilePhoto')
      .populate('receiverId', 'firstName lastName profilePhoto')
      .sort({ createdAt: 1 });

    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: { messages }
    });

  } catch (error) {
    logger.error('Get Conversation Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getAllConversations = async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: req.user._id },
            { receiverId: req.user._id }
          ],
          isDeleted: false
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$receiverId', req.user._id] },
                    { $eq: ['$isRead', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    await Message.populate(messages, [
      { path: 'lastMessage.senderId', select: 'firstName lastName profilePhoto' },
      { path: 'lastMessage.receiverId', select: 'firstName lastName profilePhoto' }
    ]);

    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: { conversations: messages }
    });

  } catch (error) {
    logger.error('Get Conversations Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    const conversationId = Message.generateConversationId(
      req.user._id,
      receiverId
    );

    const newMessage = await Message.create({
      conversationId,
      senderId: req.user._id,
      receiverId,
      message
    });

    await newMessage.populate([
      { path: 'senderId', select: 'firstName lastName profilePhoto' },
      { path: 'receiverId', select: 'firstName lastName profilePhoto' }
    ]);

    // Emit via Socket.IO
    const io = req.app.get('io');
    io.to(receiverId.toString()).emit('new_message', newMessage);

    res.status(201).json({
      status: 'success',
      data: { message: newMessage }
    });

  } catch (error) {
    logger.error('Send Message Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findOneAndUpdate(
      {
        _id: req.params.id,
        receiverId: req.user._id
      },
      {
        isRead: true,
        readAt: new Date()
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Message not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { message }
    });

  } catch (error) {
    logger.error('Mark Read Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
