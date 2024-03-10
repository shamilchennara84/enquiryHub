import express from "express";
import {} from "utils/typesense/typesenseClient";
import userRoutes from "../src/routes/userRoutes";
import apiLogger from "../src/middlewares/loggerMiddleware";
import { errorHandler } from "../src/middlewares/errorHandler";
import { typesenseSetupMiddleware } from "../src/middlewares/typesenseSetupMiddleware";
import { typesenseChangeStreamMiddleware } from "../src/middlewares/typesenseChangeStreamMiddleware";
// import typesenseRouter from "src/routes/typeSenseRouter";

export const createServer = () => {
  try {
    const app = express();
    app.use(apiLogger);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(typesenseSetupMiddleware); // create typesense collection if it is not already exist
    app.use(typesenseChangeStreamMiddleware)

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
