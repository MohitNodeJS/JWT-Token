import ResponseHelper from "../helpers/responseHelper.js";
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const authValidaton =(req,res,next)=>{
    const header =req.headers.authorization;
    const token = header.replace("Bearer ","")
    try{
        const decoded= jwt.verify(token, process.env.MY_TOKEN)
        req.user=decoded
    }
    catch(err){
        let payload={
            message:err.message,
            payload:{}
        }
       return ResponseHelper.error(res,payload,401);
    }
    next();   
}
export default authValidaton;