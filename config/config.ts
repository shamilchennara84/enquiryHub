import "dotenv/config";

export default {
  port: process.env.PORT || 3000,
  mongo: {
    uri: process.env.MONGO_URL || "mongodb://localhost:27017/enquiryHub",
  },
  typesenseReadOnlyApiKey: process.env.TYPESENSE_READ_ONLY_API_KEY,
  typesenseAdminApiKey: process.env.TYPESENSE_ADMIN_API_KEY,
  typesenseHost: process.env.TYPESENSE_HOST,
};
