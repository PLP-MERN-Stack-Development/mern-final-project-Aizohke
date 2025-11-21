// server/src/server.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import { setupSocketHandlers } from './socket/socketHandler.js';
import logger from './utils/logger.js';
import { startReminderScheduler } from './utils/reminderScheduler.js';

// --- (STEP 1) IMPORT CLERK MIDDLEWARE ---
import { withAuth, requireAuth } from './middleware/auth.middleware.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import childrenRoutes from './routes/children.routes.js';
import vaccinationsRoutes from './routes/vaccinations.routes.js';
import clinicsRoutes from './routes/clinics.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import notificationsRoutes from './routes/notifications.routes.js';
import aiRoutes from './routes/ai.routes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// --- (STEP 2) ADD CLERK'S `withAuth` MIDDLEWARE ---
// This makes `req.auth` available on all requests.
// It MUST come before your API routes.
app.use(withAuth);

// --- (STEP 3) USE `requireAuth` TO PROTECT ROUTES ---
const apiVersion = process.env.API_VERSION || 'v1';

// Auth routes are public
app.use(`/api/${apiVersion}/auth`, authRoutes);

// These routes require a logged-in user
app.use(`/api/${apiVersion}/children`, requireAuth, childrenRoutes);
app.use(`/api/${apiVersion}/vaccinations`, requireAuth, vaccinationsRoutes);
app.use(`/api/${apiVersion}/appointments`, requireAuth, appointmentsRoutes);
app.use(`/api/${apiVersion}/messages`, requireAuth, messagesRoutes);
app.use(`/api/${apiVersion}/notifications`, requireAuth, notificationsRoutes);
app.use(`/api/${apiVersion}/ai`, requireAuth, aiRoutes);

// Clinics routes can be public (or add `requireAuth` if you want)
app.use(`/api/${apiVersion}/clinics`, clinicsRoutes);


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'VaxTrack API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// Setup Socket.IO handlers
setupSocketHandlers(io);

// Make io accessible to routes
app.set('io', io);

// Start reminder scheduler
startReminderScheduler();

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  logger.info(`📡 Socket.IO server ready`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  httpServer.close(() => process.exit(1));
});

export default app;
