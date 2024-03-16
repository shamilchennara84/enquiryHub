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

    // Middleware setup
    app.use(apiLogger);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // app.use(initializeTypesense); // create typesense collection if it is not already exist
    // app.use(typesenseChangeStreamMiddleware);

    // Cron job to update Google Sheet runs every 1 hr
    cron.schedule("0 * * * *", async () => {
      try {
        console.log("Google Sheet updated successfully.");
        await manageGoogleSheet();
      } catch (error) {
        console.error("An error occurred while updating the Google Sheet:", error);
      }
    });
    
    // Cron job to mark expired enquiries run at everyday at 12 AM
    cron.schedule("0 0 * * *", async () => {
      try {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));

        await markEnquiriesAsExpired(sevenDaysAgo);

        console.log("Enquiries marked as expired successfully.");
      } catch (error) {
        console.error("An error occurred while marking enquiries as expired:", error);
      }
    });

    // Route setup
    app.use("/api/admin", adminRoutes);
    app.use("/api/user", userRoutes);
    // app.use("/api/typesense", typesenseRouter);

    return app;
  } catch (error) {
    // Log any errors during server creation
    const err: Error = error as Error;
    console.log(err.message);
  }
};
