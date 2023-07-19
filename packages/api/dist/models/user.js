import { Schema, model } from "mongoose";
const UserSchema = new Schema({
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
    location: String,
    viewedProfile: Number,
    impressions: Number,
    friends: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
export default model("User", UserSchema);
//# sourceMappingURL=user.js.map