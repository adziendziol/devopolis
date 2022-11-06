import express, { Application, Request, Response } from "express";
import "dotenv/config";
import routes from "./routes";
import mongoose from "mongoose";

const app: Application = express();

let port = process.env.PORT;

app.use(express.json());
app.use(routes);

mongoose.connect(`${process.env.MONGOURL}`, {
}, () => {
  console.log("DATABASE Connected");
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
