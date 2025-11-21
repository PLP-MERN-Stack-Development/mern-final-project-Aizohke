import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true
  },
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true,
    index: true
  },
  appointmentDate: {
    type: Date,
    required: true,
    index: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['Vaccination', 'Checkup', 'Consultation', 'Follow-up', 'Emergency', 'Other'],
    default: 'Vaccination'
  },
  vaccinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaccination'
  },
  notes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending',
    index: true
  },
  cancellationReason: {
    type: String,
    trim: true
  },
  reminder: {
    sent: { type: Boolean, default: false },
    sentAt: Date
  }
}, {
  timestamps: true
});

// Index for querying upcoming appointments
appointmentSchema.index({ appointmentDate: 1, status: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
