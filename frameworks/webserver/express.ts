import express from "express";


export const createServer = () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //  app.use("/api/user", userRouter);

    return app;
  } catch (error) {
    const err: Error = error as Error;
    console.log(err.message);
  }
};
