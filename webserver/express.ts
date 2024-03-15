import express from "express";
// import {} from "../utils/typesense/typesenseClient";
import userRoutes from "../src/routes/userRoutes";
import adminRoutes from "../src/routes/adminRoutes";
import apiLogger from "../src/middlewares/loggerMiddleware";
// import { typesenseChangeStreamMiddleware } from "../src/middlewares/typesenseChangeStreamMiddleware";
// import { initializeTypesense } from "../src/middlewares/typesenseSetupMiddleware";
import cron from "node-cron";
import { manageGoogleSheet } from "../utils/googleSheets/googleSheetUpdater";
import { markEnquiriesAsExpired } from "../utils/EnquiryExpires/enquiryExpiry";
// import typesenseRouter from "src/routes/typeSenseRouter";

export const createServer = () => {
  try {
    const app = express();
    app.use(apiLogger);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // app.use(initializeTypesense); // create typesense collection if it is not already exist
    // app.use(typesenseChangeStreamMiddleware);

    cron.schedule("* * * * *", async () => {
      try {
        console.log("Google Sheet updated successfully.");
        await manageGoogleSheet();
      } catch (error) {
        console.error("An error occurred while updating the Google Sheet:", error);
      }
    });

    cron.schedule("* * * * *", async () => {
      try {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));

        await markEnquiriesAsExpired(sevenDaysAgo);

        console.log("Enquiries marked as expired successfully.");
      } catch (error) {
        console.error("An error occurred while marking enquiries as expired:", error);
      }
    });

    app.use("/api/admin", adminRoutes);
    app.use("/api/user", userRoutes);
    // app.use("/api/typesense", typesenseRouter);

    // app.use("/enquiries", enquiryRoutes);
    return app;
  } catch (error) {
    const err: Error = error as Error;
    console.log(err.message);
  }
};
