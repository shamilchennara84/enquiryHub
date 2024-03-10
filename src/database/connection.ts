import mongoose from "mongoose";
import config from "../../config/config";
export const mongoDBConnect = async () => {
  try {
    const MONGO_URL = config.mongo.uri;
    if (MONGO_URL) {
      const dbConnection = await mongoose.connect(MONGO_URL);
      console.log(`MongoDB connected: ${dbConnection.connection.host}`);
    }
  } catch (connectionError) {
    const err: Error = connectionError as Error;
    console.log(`Error is ${err.message}`);
    process.exit(1);
  }
};
