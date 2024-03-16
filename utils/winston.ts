import config from "../config/config";
import winston from "winston";

// Logger for general logging
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // Log to a file named combined.log
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (config.nodeEnv !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

// Logger for error logging
export const ErrorLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console(),
  ],
});
