import express from "express";
import authMiddleware from "../middlewares/auth.middlewares.js";
import { getUserDetails } from "../controllers/userDetailsController.js";

const router = express.Router();

// Get financial report for a user
router.get("/", authMiddleware, getUserDetails);

export default router;
