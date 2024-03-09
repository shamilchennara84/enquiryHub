import express from "express";

import {} from "utils/services/typesenseClient";
import userRoutes from "../src/routes/userRoutes";
import apiLogger from "../src/middlewares/loggerMiddleware"

export const createServer = () => {
  try {
    const app = express();
    app.use(apiLogger);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // await createUserProfilesCollection();
    // await createEnquiriesCollection();

    app.use("/api/users", userRoutes);
    // app.use("/profiles", profileRoutes);
    // app.use("/enquiries", enquiryRoutes);

    return app;
  } catch (error) {
    const err: Error = error as Error;
    console.log(err.message);
  }
};
