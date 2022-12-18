import express from "express";
import routes from "./main/database/config/routes";
import cors from "cors";
import { DatabaseConnection, RedisConnection } from "./main/database";
import { runServer } from "./main/server";

Promise.all([DatabaseConnection.connect(), RedisConnection.connect()])
  .then(runServer)
  .catch((error: any) => {
    console.log("Erro ao iniciar o servidor.");
    console.log(error);
  });

require("dotenv").config();
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

routes(app);

app.listen(process.env.PORT || 3333, () => console.log("Api iniciada"));
