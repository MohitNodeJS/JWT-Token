import express from "express";
const app = express();
import bodyparser from "express";

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Route from "./Router/route.js";

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log(process.env.CONNECTED);
  })
  .catch((err) => {
    console.log(process.env.NOT_CONNECTED, err);
  });

Route(app);

app.listen(process.env.PORT);
//app.listen(3100)
//

