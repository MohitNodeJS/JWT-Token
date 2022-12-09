import express from "express";
const app = express();
import bodyparser from "express";

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

import dotenv from "dotenv";
dotenv.config(); //read .env file

import mongoose from "mongoose";
import Route from "./router/route.js";
console.log(process.env.MONGODB_CONNECTION);
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log(process.env.CONNECTED);
  })
  .catch((err) => {
    console.log(process.env.NOT_CONNECTED, err);
  });

Route(app);

//app.listen(3100);
app.listen(process.env.PORT);
