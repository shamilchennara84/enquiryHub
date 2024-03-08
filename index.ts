import { createServer } from "./frameworks/webserver/express";
import { mongoDBConnect } from "./frameworks/database/mongoDB/connection";

const PORT = process.env.PORT || 3000;

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
