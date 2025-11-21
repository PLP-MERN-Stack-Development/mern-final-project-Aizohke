import mongoose from 'mongoose';

const vaccinationSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
    index: true
  },
  vaccineName: {
    type: String,
    required: true,
    trim: true
  },
  vaccineType: {
    type: String,
    enum: ['BCG', 'Hepatitis B', 'Polio', 'DTaP', 'Hib', 'PCV', 'Rotavirus', 
           'Measles', 'Mumps', 'Rubella', 'Varicella', 'HPV', 'Influenza', 'Other'],
    default: 'Other'
  },
  doseNumber: {
    type: Number,
    min: 1
  },
  totalDoses: {
    type: Number,
    min: 1
  },
  vaccineDate: {
    type: Date,
    required: true
  },
  nextDoseDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'missed', 'cancelled'],
    default: 'scheduled',
    index: true
  },
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic'
  },
  administeredBy: {
    type: String,
    trim: true
  },
  batchNumber: {
    type: String,
    trim: true
  },
  manufacturer: {
    type: String,
    trim: true
  },
  siteOfAdministration: {
    type: String,
    enum: ['Left Arm', 'Right Arm', 'Left Thigh', 'Right Thigh', 'Oral', 'Other']
  },
  sideEffects: {
    reported: { type: Boolean, default: false },
    description: String,
    severity: {
      type: String,
      enum: ['None', 'Mild', 'Moderate', 'Severe']
    }
  },
  notes: {
    type: String,
    trim: true
  },
  documentUrl: {
    url: String,
    publicId: String
  }
}, {
  timestamps: true
});

// Index for querying upcoming vaccinations
vaccinationSchema.index({ nextDoseDate: 1, status: 1 });

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);
export default Vaccination;
