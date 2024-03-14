import express from "express";
import {} from "../utils/typesense/typesenseClient";
import userRoutes from "../src/routes/userRoutes";
import apiLogger from "../src/middlewares/loggerMiddleware";
import { errorHandler } from "../src/middlewares/errorHandler";
import { typesenseChangeStreamMiddleware } from "../src/middlewares/typesenseChangeStreamMiddleware";
import { initializeTypesense } from "../src/middlewares/typesenseSetupMiddleware";
import cron from "node-cron";
import { manageGoogleSheet } from "../utils/googleSheets/googleSheetUpdater";
// import typesenseRouter from "src/routes/typeSenseRouter";

export const createServer = () => {
  try {
    const app = express();
    app.use(apiLogger);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(initializeTypesense); // create typesense collection if it is not already exist
    app.use(typesenseChangeStreamMiddleware);

    cron.schedule("* * * * *", async () => {
      try {
        console.log("Google Sheet updated successfully.");
        await manageGoogleSheet();
      } catch (error) {
        console.error("An error occurred while updating the Google Sheet:", error);
      }
    });

    app.use("/api/users", userRoutes);
    // app.use("/api/typesense", typesenseRouter);

    // app.use("/enquiries", enquiryRoutes);
    app.use(errorHandler);
    return app;
  } catch (error) {
    const err: Error = error as Error;
    console.log(err.message);
  }
};
