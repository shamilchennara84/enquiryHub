import { Request, Response } from "express";
import { Errorlogger } from "../../utils/winston";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response) => {
  Errorlogger.error(err.message, err);

  let statusCode = 500;
  let message = "Internal server error";

  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({ error: message });
};
