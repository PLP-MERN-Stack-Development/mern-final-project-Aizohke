import Appointment from '../models/Appointment.js';
import Child from '../models/Child.js';
import Notification from '../models/Notification.js';
import logger from '../utils/logger.js';

export const getAllAppointments = async (req, res) => {
  try {
    const { status, upcoming } = req.query;
    
    const filter = { parentId: req.user._id };
    if (status) filter.status = status;
    if (upcoming) filter.appointmentDate = { $gte: new Date() };

    const appointments = await Appointment.find(filter)
      .populate('childId', 'name dateOfBirth')
      .populate('clinicId', 'name address contact')
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: { appointments }
    });

  } catch (error) {
    logger.error('Get Appointments Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const createAppointment = async (req, res) => {
  try {
    // Verify child belongs to user
    const child = await Child.findOne({
      _id: req.body.childId,
      parentId: req.user._id
    });

    if (!child) {
      return res.status(404).json({
        status: 'error',
        message: 'Child not found'
      });
    }

    const appointment = await Appointment.create({
      ...req.body,
      parentId: req.user._id
    });

    // Create notification
    await Notification.create({
      userId: req.user._id,
      type: 'appointment_confirmed',
      title: 'Appointment Booked',
      message: `Appointment scheduled for ${child.name}`,
      data: { appointmentId: appointment._id },
      priority: 'medium'
    });

    res.status(201).json({
      status: 'success',
      data: { appointment }
    });

  } catch (error) {
    logger.error('Create Appointment Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      parentId: req.user._id
    });

    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found'
      });
    }

    Object.assign(appointment, req.body);
    await appointment.save();

    res.status(200).json({
      status: 'success',
      data: { appointment }
    });

  } catch (error) {
    logger.error('Update Appointment Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, parentId: req.user._id },
      { status: 'cancelled', cancellationReason: req.body.reason },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Appointment cancelled',
      data: { appointment }
    });

  } catch (error) {
    logger.error('Cancel Appointment Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
