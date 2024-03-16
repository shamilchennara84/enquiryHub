import "dotenv/config";

export default {
  port: process.env.PORT || 3000,
  mongo: {
    uri: process.env.MONGO_URL || "mongodb://localhost:27017/enquiryHub",
  },
  mongoDBName:process.env.DATABASE_NAME,
  typesenseReadOnlyApiKey: process.env.TYPESENSE_READ_ONLY_API_KEY,
  typesenseAdminApiKey: process.env.TYPESENSE_ADMIN_API_KEY,
  typesenseHost: process.env.TYPESENSE_HOST,
  nodeEnv: process.env.NODE_ENV,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  googleSheetId: process.env.GOOGLE_SHEET_ID,
  gmailId: process.env.GMAIL_ID,
  gmailPass: process.env.GMAIL_PASS,
};