import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { staticDir } from "./staticDir.js";
const app = express();
/* APP MIDDLEWARE CONFIGS */
app.use(morgan("dev"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/static", express.static(staticDir));
export default app;
//# sourceMappingURL=appConfig.js.map