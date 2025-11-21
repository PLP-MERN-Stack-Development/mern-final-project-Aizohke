import Message from '../models/Message.js';
import logger from '../utils/logger.js';

export const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    // Join user's personal room
    socket.on('join', (userId) => {
      if(userId) {
        socket.join(userId.toString());
        logger.info(`User ${userId} joined their room`);
        socket.userId = userId.toString();
      }
    });

    // Handle typing indicator
    socket.on('typing', ({ receiverId, isTyping }) => {
      if (receiverId && socket.userId) {
        io.to(receiverId.toString()).emit('user_typing', {
          senderId: socket.userId,
          isTyping
        });
      }
    });

    // Handle read receipt
    socket.on('message_read', async ({ messageId, receiverId }) => {
      try {
        await Message.findByIdAndUpdate(messageId, {
          isRead: true,
          readAt: new Date()
        });

        if (receiverId) {
          io.to(receiverId.toString()).emit('message_read_receipt', { messageId });
        }
      } catch (error) {
        logger.error('Message read error:', error);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });
};