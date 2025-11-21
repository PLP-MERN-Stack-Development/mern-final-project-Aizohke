import Vaccination from '../models/Vaccination.js';
import Child from '../models/Child.js';
import Notification from '../models/Notification.js';
import logger from '../utils/logger.js';

export const getAllVaccinations = async (req, res) => {
  try {
    const { childId, status } = req.query;
    
    // Verify child belongs to user
    const children = await Child.find({ 
      parentId: req.user._id,
      isActive: true 
    }).select('_id');
    
    const childIds = children.map(c => c._id);

    const filter = { childId: { $in: childIds } };
    if (childId) filter.childId = childId;
    if (status) filter.status = status;

    const vaccinations = await Vaccination.find(filter)
      .populate('childId', 'name dateOfBirth')
      .populate('clinicId', 'name address contact')
      .sort({ vaccineDate: -1 });

    res.status(200).json({
      status: 'success',
      results: vaccinations.length,
      data: { vaccinations }
    });

  } catch (error) {
    logger.error('Get All Vaccinations Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getUpcomingVaccinations = async (req, res) => {
  try {
    const children = await Child.find({ 
      parentId: req.user._id,
      isActive: true 
    }).select('_id');
    
    const childIds = children.map(c => c._id);

    const vaccinations = await Vaccination.find({
      childId: { $in: childIds },
      status: 'scheduled',
      vaccineDate: { $gte: new Date() }
    })
      .populate('childId', 'name dateOfBirth')
      .sort({ vaccineDate: 1 })
      .limit(10);

    res.status(200).json({
      status: 'success',
      results: vaccinations.length,
      data: { vaccinations }
    });

  } catch (error) {
    logger.error('Get Upcoming Vaccinations Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const createVaccination = async (req, res) => {
  try {
    // Verify child belongs to user
    const child = await Child.findOne({
      _id: req.body.childId,
      parentId: req.user._id,
      isActive: true
    });

    if (!child) {
      return res.status(404).json({
        status: 'error',
        message: 'Child not found'
      });
    }

    const vaccination = await Vaccination.create(req.body);

    // Create notification
    await Notification.create({
      userId: req.user._id,
      type: 'vaccination_reminder',
      title: 'Vaccination Scheduled',
      message: `${vaccination.vaccineName} scheduled for ${child.name}`,
      data: { vaccinationId: vaccination._id },
      priority: 'medium'
    });

    res.status(201).json({
      status: 'success',
      data: { vaccination }
    });

  } catch (error) {
    logger.error('Create Vaccination Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateVaccination = async (req, res) => {
  try {
    const vaccination = await Vaccination.findById(req.params.id)
      .populate('childId');

    if (!vaccination) {
      return res.status(404).json({
        status: 'error',
        message: 'Vaccination record not found'
      });
    }

    // Verify child belongs to user
    if (vaccination.childId.parentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized'
      });
    }

    Object.assign(vaccination, req.body);
    await vaccination.save();

    res.status(200).json({
      status: 'success',
      data: { vaccination }
    });

  } catch (error) {
    logger.error('Update Vaccination Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const deleteVaccination = async (req, res) => {
  try {
    const vaccination = await Vaccination.findById(req.params.id)
      .populate('childId');

    if (!vaccination) {
      return res.status(404).json({
        status: 'error',
        message: 'Vaccination record not found'
      });
    }

    // Verify child belongs to user
    if (vaccination.childId.parentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized'
      });
    }

    await vaccination.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Vaccination record deleted'
    });

  } catch (error) {
    logger.error('Delete Vaccination Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getVaccinationSchedule = async (req, res) => {
  try {
    // Standard WHO/CDC vaccination schedule
    const schedule = [
      {
        age: 'Birth',
        ageInMonths: 0,
        vaccines: [
          { name: 'BCG', fullName: 'Bacillus Calmette-Guérin' },
          { name: 'Hepatitis B', fullName: 'Hepatitis B (1st dose)' },
          { name: 'OPV 0', fullName: 'Oral Polio Vaccine (Birth dose)' }
        ]
      },
      {
        age: '6 Weeks',
        ageInMonths: 1.5,
        vaccines: [
          { name: 'DTaP 1', fullName: 'Diphtheria, Tetanus, Pertussis (1st dose)' },
          { name: 'IPV 1', fullName: 'Inactivated Polio Vaccine (1st dose)' },
          { name: 'Hib 1', fullName: 'Haemophilus influenzae type b (1st dose)' },
          { name: 'PCV 1', fullName: 'Pneumococcal Conjugate (1st dose)' },
          { name: 'Rotavirus 1', fullName: 'Rotavirus (1st dose)' }
        ]
      },
      {
        age: '10 Weeks',
        ageInMonths: 2.5,
        vaccines: [
          { name: 'DTaP 2', fullName: 'Diphtheria, Tetanus, Pertussis (2nd dose)' },
          { name: 'IPV 2', fullName: 'Inactivated Polio Vaccine (2nd dose)' },
          { name: 'Hib 2', fullName: 'Haemophilus influenzae type b (2nd dose)' },
          { name: 'PCV 2', fullName: 'Pneumococcal Conjugate (2nd dose)' },
          { name: 'Rotavirus 2', fullName: 'Rotavirus (2nd dose)' }
        ]
      },
      {
        age: '14 Weeks',
        ageInMonths: 3.5,
        vaccines: [
          { name: 'DTaP 3', fullName: 'Diphtheria, Tetanus, Pertussis (3rd dose)' },
          { name: 'IPV 3', fullName: 'Inactivated Polio Vaccine (3rd dose)' },
          { name: 'Hib 3', fullName: 'Haemophilus influenzae type b (3rd dose)' },
          { name: 'PCV 3', fullName: 'Pneumococcal Conjugate (3rd dose)' },
          { name: 'Rotavirus 3', fullName: 'Rotavirus (3rd dose)' }
        ]
      },
      {
        age: '6 Months',
        ageInMonths: 6,
        vaccines: [
          { name: 'Hepatitis B 2', fullName: 'Hepatitis B (2nd dose)' },
          { name: 'Influenza', fullName: 'Seasonal Flu Vaccine' }
        ]
      },
      {
        age: '9 Months',
        ageInMonths: 9,
        vaccines: [
          { name: 'Measles 1', fullName: 'Measles (1st dose)' },
          { name: 'Yellow Fever', fullName: 'Yellow Fever' }
        ]
      },
      {
        age: '12 Months',
        ageInMonths: 12,
        vaccines: [
          { name: 'Hepatitis A 1', fullName: 'Hepatitis A (1st dose)' },
          { name: 'Varicella', fullName: 'Chickenpox' }
        ]
      },
      {
        age: '15 Months',
        ageInMonths: 15,
        vaccines: [
          { name: 'MMR', fullName: 'Measles, Mumps, Rubella' },
          { name: 'PCV Booster', fullName: 'Pneumococcal Conjugate Booster' }
        ]
      },
      {
        age: '18 Months',
        ageInMonths: 18,
        vaccines: [
          { name: 'DTaP Booster', fullName: 'Diphtheria, Tetanus, Pertussis Booster' },
          { name: 'IPV Booster', fullName: 'Polio Booster' },
          { name: 'Hepatitis A 2', fullName: 'Hepatitis A (2nd dose)' }
        ]
      },
      {
        age: '4-6 Years',
        ageInMonths: 48,
        vaccines: [
          { name: 'DTaP Booster', fullName: 'Diphtheria, Tetanus, Pertussis Booster' },
          { name: 'IPV Booster', fullName: 'Polio Booster' },
          { name: 'MMR Booster', fullName: 'Measles, Mumps, Rubella Booster' }
        ]
      }
    ];

    res.status(200).json({
      status: 'success',
      data: { schedule }
    });

  } catch (error) {
    logger.error('Get Vaccination Schedule Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
