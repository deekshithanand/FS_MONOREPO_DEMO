import { Document, Schema, model } from "mongoose";

export interface IPost extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  location?: string;
  description?: string;
  picturePath?: string;
  userPicturePath: string;
  likes: Map<string, boolean>;
  comments: Array<string>;
}
const PostSchema = new Schema<IPost>(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: String,
      of: Boolean,
      default: {},
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<IPost>("Post", PostSchema);
