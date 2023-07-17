import mongoose from "mongoose";
import app from "./config/appConfig.js";
import { PORT, mongoOptions, mongoURI } from "./config/mongoOptions.js";
import upload from "./config/multer.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/verifyToken.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/PostRoutes.js";

/* ROUTE CONFIGURATION */
app.post("/auth/register", upload.single("picture"), register);
app.use("/auth", authRouter);
app.use("/users", verifyToken, userRouter);
app.use("/post", verifyToken, postRouter);

startServer().catch((error) => console.log("Server startup failed: " + error));

async function startServer() {
  await mongoose.connect(mongoURI, mongoOptions);
  app.listen(PORT, () => console.log("App started on Port " + PORT));
}
