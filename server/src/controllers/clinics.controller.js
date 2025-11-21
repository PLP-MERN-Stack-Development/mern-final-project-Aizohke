import Clinic from '../models/Clinic.js';
import logger from '../utils/logger.js';

export const getAllClinics = async (req, res) => {
  try {
    const { search, service } = req.query;
    
    const filter = { isActive: true };
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    if (service) {
      filter.services = service;
    }

    const clinics = await Clinic.find(filter)
      .select('-reviews')
      .sort({ 'rating.average': -1 });

    res.status(200).json({
      status: 'success',
      results: clinics.length,
      data: { clinics }
    });

  } catch (error) {
    logger.error('Get All Clinics Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getNearbyClinics = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({
        status: 'error',
        message: 'Longitude and latitude are required'
      });
    }

    const clinics = await Clinic.find({
      isActive: true,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).select('-reviews').limit(20);

    // Calculate distance for each clinic
    const clinicsWithDistance = clinics.map(clinic => ({
      ...clinic.toObject(),
      distance: clinic.calculateDistance(parseFloat(longitude), parseFloat(latitude))
    }));

    res.status(200).json({
      status: 'success',
      results: clinicsWithDistance.length,
      data: { clinics: clinicsWithDistance }
    });

  } catch (error) {
    logger.error('Get Nearby Clinics Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findOne({
      _id: req.params.id,
      isActive: true
    }).populate('reviews.userId', 'firstName lastName');

    if (!clinic) {
      return res.status(404).json({
        status: 'error',
        message: 'Clinic not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { clinic }
    });

  } catch (error) {
    logger.error('Get Clinic By ID Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const addClinicReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const clinic = await Clinic.findById(req.params.id);

    if (!clinic) {
      return res.status(404).json({
        status: 'error',
        message: 'Clinic not found'
      });
    }

    // Check if user already reviewed
    const existingReview = clinic.reviews.find(
      r => r.userId.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already reviewed this clinic'
      });
    }

    clinic.reviews.push({
      userId: req.user._id,
      rating,
      comment
    });

    // Update average rating
    const totalRating = clinic.reviews.reduce((sum, r) => sum + r.rating, 0);
    clinic.rating.average = totalRating / clinic.reviews.length;
    clinic.rating.count = clinic.reviews.length;

    await clinic.save();

    res.status(201).json({
      status: 'success',
      data: { clinic }
    });

  } catch (error) {
    logger.error('Add Clinic Review Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
