import express from "express";
import {
  getFriends,
  getUser,
  patchFriends,
  removeFriends,
} from "../controllers/users.js";
// import login from "../controllers/login.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/friends", getFriends);
router.delete("/:id", removeFriends);
router.patch("/:id", patchFriends);

export default router;
