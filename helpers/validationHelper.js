import { Router } from "express";
import joi from "joi";

const validationHelper = (route,method) =>{
    let obj = {}
        switch(method) {
            case 'get': 
                obj = {
                    '/user/:id' : userSchema,
                    '/users' : userSchema
                 }
                 
                 return obj[route];
                break;
            case 'post' :
                obj = {
                    '/user' : userSchema,
                    '/getallusers' : userSchema
                 }
                 return obj[route]
                break;
            default:

        }
}

export default validationHelper;

const userSchema = joi.object({
    firstName:joi.string().min(5).max(10).required(),
    lastName:joi.string().min(5).max(10).required(),
    email:joi.string().email().min(5).max(20).required(),
    password:joi.string().min(5).max(15).required(),
 });





    

