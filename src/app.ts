import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose, { ConnectOptions } from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: express.Application = express();
/* APP MIDDLEWARE CONFIGS */
app.use(morgan("dev"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const staticDir = path.join(__dirname, "public/static");
app.use("/static", express.static(staticDir));

/* FILE STORAGE CONFIGS */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, staticDir); // Specify the destination folder where files should be stored
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`; // Generate a unique filename
    cb(null, fileName);
  },
});
const upload = multer({ storage });

/* MONGOOSE CONFIGS */
dotenv.config();
const mongoURI = process.env.MONGODB_URI;

const mongoOptions: ConnectOptions = {
  authSource: "admin",
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PWD,
  dbName: process.env.MONGO_DATA_BASE,
};
startServer().catch((error) => console.log("Server startup failed: " + error));

async function startServer() {
  await mongoose.connect(mongoURI, mongoOptions);
  app.listen(PORT, () => console.log("App started on Port " + PORT));
}
