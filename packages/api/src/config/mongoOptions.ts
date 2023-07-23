import { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
/* MONGOOSE CONFIGS */
dotenv.config();
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/";
const PORT = process.env.PORT || 3001;
/* Default value provided for the app to work with docker-compose */
const mongoOptions: ConnectOptions = {
  authSource: "admin",
  user: process.env.MONGO_USER || "user",
  pass: process.env.MONGO_PWD || "password",
  dbName: process.env.MONGO_DATA_BASE,
  connectTimeoutMS: 10000,
};

export { mongoURI, mongoOptions, PORT };
