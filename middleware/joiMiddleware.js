import Joi from "joi";
import validationHelper from "../helpers/validationHelper.js";
import responseHelper from "../helpers/responseHelper.js";

const JoiMiddleware = (req,res,next)=> {
    // to get method from request------------tolowercase
    let route = req.route.path;
    let method = req.method.toLowerCase()
    // to get route from request

    let schema = validationHelper(route,method);
    //console.log(schema);
   const {error}=schema.validate(req.body,{abortEarly:false});
    if (error) {
        responseHelper.error(res,{ message : 'Validation Error', payload :error.details});
    }
    next(req,res);
}

export default JoiMiddleware;