import mongoose from "mongoose";
import { Schema } from "mongoose";
import _user from "./user";
const quotesSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    by:{
      type: String,
      required: false,
    },
 
    userId:{type:Schema.Types.ObjectId,ref: 'users'}
    //address:addressSchema,
  },
  { timestamps: true } //timestamps : save the current time of the document created
);

let Quotes = mongoose.model("quotes", quotesSchema);
export default Quotes;
