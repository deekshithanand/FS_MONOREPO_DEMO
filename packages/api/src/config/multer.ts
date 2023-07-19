import multer from "multer";
import { staticDir } from "./staticDir.js";

/* FILE STORAGE CONFIGS */
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, staticDir); // Specify the destination folder where files should be stored
  },
  filename: (req, file, callBack) => {
    const fileName = `${Date.now()}-${file.originalname}`; // Generate a unique filename
    callBack(null, fileName);
  },
});
const upload = multer({ storage });
export default upload;
