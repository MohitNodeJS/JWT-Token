import validationHelper from "../helpers/validationHelper.js";
import ResponseHelper from "../helpers/responseHelper.js";
import MESSAGES from "../helpers/commonMessage.js";
class JoiMainMiddleware{
     JoiMiddleware  (req,res,next) {
        // to get method from request------------tolowercase
        let route = req.route.path;
        let method = req.method.toLowerCase()
        // to get route from request
    
        let schema = validationHelper(route,method);
        const{error}=schema.validate(req.body,{abortEarly:false});
        if(error){    
          let errors = error.details.map((curr)=>{
            let o ={};
            Object.assign(o,{message:curr.message.replace(/[\,"]/g,' '),path:curr.path.toString()});
            return o;
          })
            let payload={
                message:MESSAGES.PAYLOAD_ERROR,
                payload:errors
            }
           return ResponseHelper.error(res,payload);
        }
        next();   
    }
   
}

export default new JoiMainMiddleware;