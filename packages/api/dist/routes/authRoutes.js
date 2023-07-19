import express from "express";
import upload from "../config/multer.js";
import { register } from "../controllers/auth.js";
import login from "../controllers/login.js";
const router = express.Router();
router.post("/login", login);
router.post("/register", upload.single("picture"), register);
export default router;
//# sourceMappingURL=authRoutes.js.map