import User from '../models/User.js';
import logger from '../utils/logger.js';

// @desc    Sync user from Clerk to our DB (Create or Update)
// @route   POST /api/v1/auth/sync
export const syncUser = async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName, photoUrl } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ message: 'Clerk ID and Email are required' });
    }

    // Find user by their unique Clerk ID
    let user = await User.findOne({ clerkId });

    const userData = {
      clerkId,
      email,
      firstName: firstName || 'New',
      lastName: lastName || 'User',
      profilePhoto: { url: photoUrl }
    };

    if (!user) {
      // User doesn't exist in our DB, so create them
      user = await User.create(userData);
      logger.info(`New user synced from Clerk: ${email}`);
    } else {
      // User exists, update their info
      user = await User.findOneAndUpdate({ clerkId }, userData, { new: true });
      logger.info(`User updated from Clerk: ${email}`);
    }
    
    // Send back our local user record
    res.status(200).json({
      status: 'success',
      data: { user }
    });

  } catch (error) {
    logger.error('Sync User Error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
export const getCurrentUser = async (req, res) => {
  // req.user is already populated by our new 'protect' middleware
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  });
};

// @desc    Update user profile
// @route   PUT /api/v1/auth/profile
export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, address, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone, address, preferences },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: { user }
    });

  } catch (error) {
    logger.error('Update Profile Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete (deactivate) user account
// @route   DELETE /api/v1/auth/account
export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false });
    res.status(200).json({
      status: 'success',
      message: 'Account deactivated successfully'
    });
  } catch (error) {
    logger.error('Delete Account Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};