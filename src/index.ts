import express, { Application, Request, Response } from "express";
import "dotenv/config";
import routes from "./routes";
import mongoose from "mongoose";

const app: Application = express();
const bodyParser = require("body-parser");

let port = process.env.PORT;

app.use(express.json());
app.use(routes);
app.use(bodyParser.json());

mongoose.connect(`${process.env.MONGOURL}`, {}, () => {
  console.log("DATABASE Connected");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
