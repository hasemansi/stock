import express from "express";
import { loginUser, logout, refreshAccessToken, registerUser } from '../controllers/UserController.js';
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/refresh", refreshAccessToken)

export default router;