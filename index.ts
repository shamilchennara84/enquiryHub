import { createServer } from "./webserver/express";
import { mongoDBConnect } from "./src/database/connection";
import config from "./config/config";

// Extract the port number from the configuration
const PORT = config.port;

// Create the Express server instance
const app = createServer();

// Connect to MongoDB
mongoDBConnect()
  .then(() => {
    if (app) {
      app.listen(PORT, () => console.log(`Listening to Port ${PORT} `));
    } else {
      throw Error("App is undefined");
    }
  })
  .catch((error) => console.log("Error while connecting to database:", error));
