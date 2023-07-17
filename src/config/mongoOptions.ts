import { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
/* MONGOOSE CONFIGS */
dotenv.config();
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const mongoOptions: ConnectOptions = {
  authSource: "admin",
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PWD,
  dbName: process.env.MONGO_DATA_BASE,
  connectTimeoutMS: 10000,
};

export { mongoURI, mongoOptions, PORT };
