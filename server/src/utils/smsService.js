import twilio from 'twilio';
import logger from './logger.js';

let client;

try {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  } else {
    logger.warn('Twilio credentials not found. SMS service will be disabled.');
  }
} catch (error) {
  logger.error('Failed to initialize Twilio client:', error);
}

export const sendSMS = async (to, message) => {
  if (!client) {
    logger.warn('Twilio client not initialized. Skipping SMS.');
    return;
  }

  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });

    logger.info(`SMS sent: ${result.sid}`);
    return result;

  } catch (error) {
    logger.error('SMS Error:', error);
    throw error;
  }
};

export const sendVaccinationReminderSMS = async (phone, childName, vaccineName, date) => {
  const message = `VaxTrack Reminder: ${childName} has ${vaccineName} vaccination scheduled on ${date}. Don't forget!`;
  return sendSMS(phone, message);
};
