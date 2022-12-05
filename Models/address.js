import mongoose from "mongoose";
import { Schema } from "mongoose";
const addressSchema = new Schema(
    {
        houseNo: {
            type: String,
            required: false,
          },
          city: {
            type: String,
            required: false,
          },
          state: {
            type: String,
            required: false,
          },
          pincode : {
            type: String,
            required: false,
          },
          country:{
            type: String,
            required: false,
        },
    },
    { timestamps: true }  //timestamps : save the current time of the document created
  );
  let address = mongoose.model("addressSch", addressSchema);
  export default address;