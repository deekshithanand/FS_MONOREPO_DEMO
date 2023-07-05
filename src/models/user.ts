import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: Array<string>;
  location: string;
  viewedProfile: number;
  impressions: number;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 500,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: [String],
      default: [],
    },
    location: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);
export default model<IUser>("User", UserSchema);
