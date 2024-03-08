import { createServer } from "./frameworks/webserver/express";
import { mongoDBConnect } from "./frameworks/database/mongoDB/connection";
import config from "./config/config";

const PORT = config.port

const app = createServer();

mongoDBConnect()
  .then(() => {
    if (app) {
      app.listen(PORT, () => console.log(`Listening to Port ${PORT} `));
    } else {
      throw Error("App is undefined");
    }
  })
  .catch((error) => console.log("Error while connecting to database:", error));
