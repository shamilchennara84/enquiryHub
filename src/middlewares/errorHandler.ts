import { Request, Response } from "express";
import { ErrorLogger } from "../../utils/winston";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response) => {
  ErrorLogger.error(err.message, err);

  let statusCode = 500;
  let message = "Internal server error";

  if (err.statusCode) {
    statusCode = err.statusCode;
    console.log(statusCode);
  }

  if (err.message) {
    message = err.message;
  }

 
  if (!res.headersSent) {
    res.status(statusCode).json({ error: message });
  } else {
 
    ErrorLogger.error("Headers already sent, cannot send error response");
  }
};
