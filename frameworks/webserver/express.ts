import express from "express";
import { } from "frameworks/services/typesenseClient";


export const createServer = () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // await createUserProfilesCollection();
    // await createEnquiriesCollection();

    //  app.use("/api/user", userRouter);

    return app;
  } catch (error) {
    const err: Error = error as Error;
    console.log(err.message);
  }
};
