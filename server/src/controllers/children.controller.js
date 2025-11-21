import Child from '../models/Child.js';
import Vaccination from '../models/Vaccination.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';
import logger from '../utils/logger.js';

export const getAllChildren = async (req, res) => {
  try {
    const children = await Child.find({ 
      parentId: req.user._id,
      isActive: true 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: children.length,
      data: { children }
    });

  } catch (error) {
    logger.error('Get All Children Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getChildById = async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parentId: req.user._id,
      isActive: true
    });

    if (!child) {
      return res.status(404).json({
        status: 'error',
        message: 'Child not found'
      });
    }

    // Get vaccination records
    const vaccinations = await Vaccination.find({ 
      childId: child._id 
    }).sort({ vaccineDate: -1 });

    res.status(200).json({
      status: 'success',
      data: { child, vaccinations }
    });

  } catch (error) {
    logger.error('Get Child By ID Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const createChild = async (req, res) => {
  try {
    const childData = {
      ...req.body,
      parentId: req.user._id
    };

    // Handle photo upload if provided
    if (req.file) {
      const uploadResult = await uploadImage(req.file, 'vaxtrack/children');
      childData.photo = uploadResult;
    }

    const child = await Child.create(childData);

    res.status(201).json({
      status: 'success',
      data: { child }
    });

  } catch (error) {
    logger.error('Create Child Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateChild = async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parentId: req.user._id
    });

    if (!child) {
      return res.status(404).json({
        status: 'error',
        message: 'Child not found'
      });
    }

    // Handle photo update
    if (req.file) {
      // Delete old photo if exists
      if (child.photo?.publicId) {
        await deleteImage(child.photo.publicId);
      }
      
      const uploadResult = await uploadImage(req.file, 'vaxtrack/children');
      req.body.photo = uploadResult;
    }

    Object.assign(child, req.body);
    await child.save();

    res.status(200).json({
      status: 'success',
      data: { child }
    });

  } catch (error) {
    logger.error('Update Child Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const deleteChild = async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parentId: req.user._id
    });

    if (!child) {
      return res.status(404).json({
        status: 'error',
        message: 'Child not found'
      });
    }

    child.isActive = false;
    await child.save();

    res.status(200).json({
      status: 'success',
      message: 'Child deleted successfully'
    });

  } catch (error) {
    logger.error('Delete Child Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
