import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema =new Schema({
   firstName:{
        type: String,
        required:false
    },
    lastName:{
        type: String,
        required:false
    },
    email:{
        type: String,
        required:false
    },
    password:{
        type: String,
        required:false
    }
})
let _user =mongoose.model("user",userSchema)
export default _user;