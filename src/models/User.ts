import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  description: string;
  image: string;
  links: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  links: {
    type: String,
    default: "[]",
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
