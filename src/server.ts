import express from "express";
import "dotenv/config";
import connectionToMongoDb from "./dbAccess/mongoDBConnection";
import { connectionToPostgres } from "./dbAccess/postgresConnection";
import router from "./router/router";
import cors from "cors";
import morganLogger from "./logger/morgan";

const app = express();
const PORT = process.env.PORT;

app.use(morganLogger);
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectionToMongoDb()
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));
  connectionToPostgres()
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));
});