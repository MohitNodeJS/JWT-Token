import { Router } from "express";
import joi from "joi";

const validationHelper = (route, method) => {
  let obj = {};
  switch (method) {
    case "get":
      obj = {
        "/profile": userSchemaLogin,
      };
      return obj[route];
      break;

    case "put":
      obj = {
        "/profile":updateuserSchema,
      };
      return obj[route];
      break;

      // case "del":
      // obj = {
      //   "/delete":updateuserSchema,
      // };
      // return obj[route];
      // break;
    case "post":
      obj = {
        "/register": userSchema,
        "/login": userSchemaLogin,
      };
      return obj[route];
    default:
  }
};

export default validationHelper;

const userSchema = joi.object({
  firstName: joi.string().min(3).max(15).required(),
  lastName: joi.string().min(3).max(15).required(),
  email: joi.string().email().min(5).max(50).required(),
  password: joi.string().min(5).max(15).required().optional(),
});

 const updateuserSchema =joi.object({
    firstName:joi.string().min(3).max(15).required(),
    lastName:joi.string().min(3).max(15).required(),
    email:joi.string().email().min(5).max(50).required(),

 });
const userSchemaLogin = joi.object({
  email: joi.string().email().min(3).max(50).required(),
  password: joi.string().min(5).max(15),
});
