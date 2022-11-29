// import multer from "multer";
// import { Schema } from "mongoose";
import userServices from "../Services/userServices.js";
import JoiMiddleware from "../middleware/joiMiddleware.js";

const Route=(app)=>{
    app.get('/user/:id', JoiMiddleware, userServices.adduser);
    app.get('/users', JoiMiddleware, userServices.adduser);
    app.post('/user', JoiMiddleware, userServices.adduser);
    app.put('/user', JoiMiddleware, userServices.adduser);
}


export default Route;