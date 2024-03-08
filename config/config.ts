export default {
  port: process.env.PORT || 3000,
  mongo: {
    uri: process.env.MONGO_URL || "mongodb://localhost:27017/post-clean-code",
  },
};
