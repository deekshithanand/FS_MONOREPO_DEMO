import { Schema, model } from "mongoose";
const PostSchema = new Schema({
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
}, { timestamps: true });
export default model("Post", PostSchema);
//# sourceMappingURL=post.js.map