import { Request, Response, NextFunction } from "express";
import {logger} from "../../utils/winston";

/**
 * Middleware function for API logging.
 * Logs HTTP requests with method, URL, response status code, and duration.
 * @param req Express Request object
 * @param res Express Response object
 * @param next Express NextFunction
 */

const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${method} ${url} ${res.statusCode} - ${duration}ms`);
  });

  next();
};
export default apiLogger;
