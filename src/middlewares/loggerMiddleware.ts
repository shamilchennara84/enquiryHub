import { Request, Response, NextFunction } from "express";
import logger from "../../utils/winston";

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
