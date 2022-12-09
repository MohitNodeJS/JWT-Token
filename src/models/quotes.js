import mongoose from "mongoose";
import { Schema } from "mongoose";
//import _user from "./user.js";
import { nanoid } from "nanoid";

const quotesSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    title: {
      type: String,
      required: false,
    },
    by: {
      type: String,
      required: false,
    },

    userId: {
      type: String,
      ref: "users",
    },
  },
  { timestamps: true } //timestamps : save the current time of the document created
);

let Quotes = mongoose.model("quotes", quotesSchema);
export default Quotes;
