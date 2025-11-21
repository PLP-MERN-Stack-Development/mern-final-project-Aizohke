import cron from 'node-cron';
import Vaccination from '../models/Vaccination.js';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import Child from '../models/Child.js';
import Notification from '../models/Notification.js';
import { sendVaccinationReminder } from './emailService.js';
import { sendVaccinationReminderSMS } from './smsService.js';
import logger from './logger.js';

export const startReminderScheduler = () => {
  // Run every day at 9 AM
  cron.schedule('0 9 * * *', async () => {
    logger.info('Running reminder scheduler...');

    try {
      // Find vaccinations due in the next 3 days
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

      const upcomingVaccinations = await Vaccination.find({
        status: 'scheduled',
        vaccineDate: {
          $gte: new Date(),
          $lte: threeDaysFromNow
        }
      }).populate('childId');

      for (const vaccination of upcomingVaccinations) {
        const child = vaccination.childId;
        if (!child) continue;

        const user = await User.findById(child.parentId);
        if (!user) continue;

        // Create notification
        await Notification.create({
          userId: user._id,
          type: 'vaccination_reminder',
          title: 'Upcoming Vaccination',
          message: `${child.name} has ${vaccination.vaccineName} scheduled`,
          data: { vaccinationId: vaccination._id },
          priority: 'high'
        });

        // Send email if enabled
        if (user.preferences.notifications.email) {
          try {
            await sendVaccinationReminder(user, child, vaccination);
          } catch (error) {
            logger.error('Email reminder error:', error);
          }
        }

        // Send SMS if enabled
        if (user.preferences.notifications.sms && user.phone) {
          try {
            await sendVaccinationReminderSMS(
              user.phone,
              child.name,
              vaccination.vaccineName,
              new Date(vaccination.vaccineDate).toLocaleDateString()
            );
          } catch (error) {
            logger.error('SMS reminder error:', error);
          }
        }

        logger.info(`Reminder sent for vaccination: ${vaccination._id}`);
      }

      // Also check appointments
      const upcomingAppointments = await Appointment.find({
        status: 'confirmed',
        appointmentDate: {
          $gte: new Date(),
          $lte: threeDaysFromNow
        },
        'reminder.sent': false
      }).populate('childId parentId');

      for (const appointment of upcomingAppointments) {
        if (!appointment.parentId || !appointment.childId) continue;
        
        await Notification.create({
          userId: appointment.parentId._id,
          type: 'appointment_reminder',
          title: 'Upcoming Appointment',
          message: `Appointment for ${appointment.childId.name}`,
          data: { appointmentId: appointment._id },
          priority: 'high'
        });

        appointment.reminder.sent = true;
        appointment.reminder.sentAt = new Date();
        await appointment.save();

        logger.info(`Reminder sent for appointment: ${appointment._id}`);
      }

    } catch (error) {
      logger.error('Reminder Scheduler Error:', error);
    }
  });

  logger.info('✅ Reminder scheduler started');
};
