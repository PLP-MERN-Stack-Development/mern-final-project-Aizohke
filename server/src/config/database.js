import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Create indexes
    await createIndexes();

  } catch (error) {
    logger.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    const db = mongoose.connection.db;
    
    // Create geospatial index for clinics
    await db.collection('clinics').createIndex({ location: '2dsphere' });
    
    // Create text index for clinic search
    await db.collection('clinics').createIndex({ 
      name: 'text', 
      address: 'text' 
    });

    logger.info('✅ Database indexes created');
  } catch (error) {
    logger.error(`❌ Index creation error: ${error.message}`);
  }
};

export default connectDB;
