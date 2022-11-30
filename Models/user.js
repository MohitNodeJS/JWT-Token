import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

//soft delete
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');


const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

//soft delete
userSchema.plugin(softDeletePlugin);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(12);
    const passwordhash = await bcrypt.hash(this.password, salt);
    this.password = passwordhash;
    next();
  } catch {
    next();
  }
});

let _user = mongoose.model("user", userSchema);
//let _user = mongoose.model("user", userSchema,softDeletePlugin);
export default _user;
