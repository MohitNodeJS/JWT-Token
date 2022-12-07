//import { Router } from "express";
import joi from "joi";
//import address from "../Models/address";
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
        "/profile": userSchemaUpd,
      };
      return obj[route];
      break;

    case "post":
      obj = {
        "/register": userSchema,
        "/login": userSchemaLogin,
        "/quotesRegister":quotesSchema
      };
      return obj[route];
    default:
  }
};

export default validationHelper;

//put , Register
const userSchema = joi.object({
  firstName: joi.string().min(3).max(15).required(),
  lastName: joi.string().min(3).max(15).required().optional(),
  email: joi.string().email().min(5).max(50).required(),
  password: joi.string().min(5).max(15).required(),

  //address
  address: joi.object({
    houseNo: joi.string().max(15).optional(),
    city: joi.string().max(15).optional(),
    state: joi.string().max(15).optional(),
    pincode: joi.string().max(15).optional(),
    country: joi.string().max(15).optional(),
  }),
});



//login schema
const userSchemaLogin = joi.object({
  email: joi.string().email().min(3).max(50).required(),
  password: joi.string().min(5).max(15).required(),
});

const userSchemaUpd = joi.object({
  firstName: joi.string().min(3).max(15).required().optional(),
  lastName: joi.string().min(3).max(15).required().optional(),
  email: joi.string().email().min(5).max(50).required().optional(),
  password: joi.string().min(5).max(15).required().optional(),
  address: joi.object({
    houseNo: joi.string().max(15).optional(),
    city: joi.string().max(15).optional(),
    state: joi.string().max(15).optional(),
    pincode: joi.string().max(15).optional(),
    country: joi.string().max(15).optional(),
  }),
});
const quotesSchema=joi.object({
  title: joi.string().min(3).max(15).optional(),
  by:joi.string().min(3).max(15).optional(),
})


