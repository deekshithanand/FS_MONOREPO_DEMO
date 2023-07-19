import bcrypt from "bcrypt";
import User from "../models/user.js";
async function register(req, res) {
    try {
        const { firstName, lastName, email, password, picturePath, friends, location, } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        });
        await newUser.save();
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.log("Error during save user:" + error);
        return res.status(500).json({ error: error.message });
    }
}
export { register };
//# sourceMappingURL=auth.js.map