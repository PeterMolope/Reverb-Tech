import express from "express";
import { deleteUser, getAllUsers } from "../controllers/user.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllUsers);
router.delete("/:Id", protectRoute, adminRoute, deleteUser);

export default router;
