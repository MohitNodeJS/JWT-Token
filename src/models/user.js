import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { addressSchema } from "./address.js";
import { nanoid } from "nanoid";

//soft delete
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    address: addressSchema,
  },
  { timestamps: true } //timestamps : save the current time of the document created
);

//soft delete
userSchema.plugin(softDeletePlugin);

//save case password bcrypt
userSchema.pre("save", async function (next) {
  try {
    //const salt = await bcrypt.genSalt(12);
    const passwordhash = await bcrypt.hash(this.password, 10); //10 :salt value
    this.password = passwordhash;
    next();
  } catch {
    next();
  }
});

//update case password bcrypt
userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.password) {
      const passwordhash = await bcrypt.hash(this._update.password, 10);
      this._update.password = passwordhash;
    }
    next();
  } catch {
    return next(error);
  }
});

let userModel = mongoose.model("user", userSchema);
export default userModel;
