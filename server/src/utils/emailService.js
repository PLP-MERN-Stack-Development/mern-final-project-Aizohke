import nodemailer from 'nodemailer';
import logger from './logger.js';

let transporter;

try {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
} catch (error) {
  logger.error('Failed to create Nodemailer transporter:', error);
}

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!transporter) {
    logger.error('Email transporter is not initialized.');
    return;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return info;

  } catch (error) {
    logger.error('Email Send Error:', error);
    throw error;
  }
};

export const sendVaccinationReminder = async (user, child, vaccination) => {
  const subject = `Vaccination Reminder for ${child.name}`;
  const html = `
    <h2>Vaccination Reminder</h2>
    <p>Hi ${user.firstName},</p>
    <p>This is a reminder that ${child.name} has an upcoming vaccination:</p>
    <ul>
      <li><strong>Vaccine:</strong> ${vaccination.vaccineName}</li>
      <li><strong>Date:</strong> ${new Date(vaccination.vaccineDate).toLocaleDateString()}</li>
    </ul>
    <p>Please ensure to bring the vaccination card and any relevant medical documents.</p>
    <p>Best regards,<br>VaxTrack Team</p>
  `;

  return sendEmail({ to: user.email, subject, html });
};

export const sendAppointmentConfirmation = async (user, child, appointment, clinic) => {
  const subject = `Appointment Confirmed for ${child.name}`;
  const html = `
    <h2>Appointment Confirmation</h2>
    <p>Hi ${user.firstName},</p>
    <p>Your appointment has been confirmed:</p>
    <ul>
      <li><strong>Child:</strong> ${child.name}</li>
      <li><strong>Clinic:</strong> ${clinic.name}</li>
      <li><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</li>
      <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
    </ul>
    <p>Please arrive 10 minutes early.</p>
    <p>Best regards,<br>VaxTrack Team</p>
  `;

  return sendEmail({ to: user.email, subject, html });
};
