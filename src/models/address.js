import { Schema } from "mongoose";
export const addressSchema = new Schema(
  {
    _id: false,
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
    pincode: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  { timestamps: true } //timestamps : save the current time of the document created
);
// let address = mongoose.model("address", addressSchema);
// export default address;